// Critical CSS: inlines the rules needed for the first screen of every page (phone + desktop)
// and loads the full stylesheet without blocking rendering.
//   1. npm run build            (updates css/bliss.min.css)
//   2. serve the folder         (e.g. python -m http.server 5173)
//   3. npm run critical [-- http://localhost:5173]
// Uses the locally installed Chrome (set CHROME_PATH to override).
import { readFileSync, writeFileSync, readdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import puppeteer from 'puppeteer-core';
import { transform } from 'esbuild';

const base = (process.argv[2] || 'http://localhost:5173').replace(/\/$/, '');
const root = new URL('../', import.meta.url);
const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const pages = readdirSync(root).filter((f) => f.endsWith('.html') && !f.startsWith('_'));
const VIEWPORTS = [{ width: 412, height: 915, isMobile: true, deviceScaleFactor: 1 }, { width: 1366, height: 900, deviceScaleFactor: 1 }];
const START = '<!-- critical:start -->', END = '<!-- critical:end -->';
const LINK = '<link rel="stylesheet" href="css/bliss.min.css">';
const ASYNC = '<link rel="preload" href="css/bliss.min.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" href="css/bliss.min.css"></noscript>';

// Runs in the page: returns the CSS text of every rule that styles something in the first screen.
function extract(fold) {
  const sheet = [...document.styleSheets].find((s) => (s.href || '').includes('bliss.min.css'));
  const strip = (sel) => sel.replace(/::?(before|after|placeholder|marker|selection|first-letter|first-line|-webkit-[\w-]+|-moz-[\w-]+)\b(\([^)]*\))?/g, '')
    .replace(/:(hover|focus|focus-visible|focus-within|active|visited|checked|disabled|invalid|valid|target|placeholder-shown|empty)\b/g, '')
    .replace(/:not\(\s*\)/g, '').trim() || '*';
  const aboveFold = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return true;            // hidden UI (menus, drawers) — keep its hiding rules
    const pos = getComputedStyle(el).position;
    return pos === 'fixed' || r.top < fold;
  };
  const used = (selectorText) => selectorText.split(',').some((part) => {
    try { return [...document.querySelectorAll(strip(part))].some(aboveFold); } catch { return false; }
  });
  const walk = (rules) => {
    let out = '';
    for (const r of rules) {
      if (r instanceof CSSStyleRule) {
        // always keep positioning contexts so absolutely positioned children can't escape to the top of the page
        if (r.selectorText.startsWith(':root') || /^(html|body|\*)/.test(r.selectorText) || /^(relative|sticky)$/.test(r.style.position) || used(r.selectorText)) out += r.cssText;
      }
      else if (r instanceof CSSMediaRule) { const inner = walk(r.cssRules); if (inner) out += `@media ${r.conditionText}{${inner}}`; }
      else if (r instanceof CSSSupportsRule) { const inner = walk(r.cssRules); if (inner) out += `@supports ${r.conditionText}{${inner}}`; }
      else if (r instanceof CSSFontFaceRule || r instanceof CSSKeyframesRule) out += r.cssText;
    }
    return out;
  };
  return walk(sheet.cssRules);
}

const profile = mkdtempSync(join(tmpdir(), 'bliss-critical-'));   // a fresh profile avoids clashing with an open Chrome
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, userDataDir: profile, args: ['--disable-gpu'] });
try {
  for (const name of pages) {
    const parts = [];
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport(vp);
      // load the full stylesheet the normal way so its rules can be inspected
      await page.setRequestInterception(true);
      page.on('request', (req) => req.continue());
      await page.goto(`${base}/${name}?critical=1`, { waitUntil: 'networkidle2', timeout: 60000 });
      await page.evaluate(() => document.querySelectorAll('link[rel="preload"][as="style"]').forEach((l) => { l.rel = 'stylesheet'; }));
      await page.waitForFunction(() => [...document.styleSheets].some((s) => (s.href || '').includes('bliss.min.css')), { timeout: 15000 });
      await new Promise((r) => setTimeout(r, 300));
      parts.push(await page.evaluate(extract, vp.height));
      await page.close();
    }
    // merge both viewports (esbuild drops duplicate rules) and fix font URLs for an inline <style> in the page root
    const { code } = await transform(parts.join('\n'), { loader: 'css', minify: true });
    const merged = code.trim().replace(/url\((["']?)\.\.\//g, 'url($1');
    const file = new URL(name, root);
    let html = readFileSync(file, 'utf8');
    const block = `${START}<style>${merged}</style>${END}`;
    html = html.includes(START) ? html.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block) : html.replace(LINK, `${block}\n${LINK}`);
    if (html.includes(LINK)) html = html.replace(LINK, ASYNC);
    writeFileSync(file, html);
    console.log(`${name.padEnd(22)} critical ${(Buffer.byteLength(merged) / 1024).toFixed(1)} KB`);
  }
} finally {
  await browser.close();
  rmSync(profile, { recursive: true, force: true });
}
