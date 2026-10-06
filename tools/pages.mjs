// Category pages: one folder per product category, following the WooCommerce URL hierarchy.
//   bathroom/index.html, bathroom/bathtubs/index.html, bathroom/bathtubs/freestanding-bathtubs/index.html ...
// Every category uses templates/category.html:
//   compact header -> sub-category strip -> filterable products (this category + everything below it)
//   -> content area -> FAQ (+ BreadcrumbList / FAQPage structured data).
// Tree: js/data.js (CAT_ROWS). Copy + FAQ: content/categories.json (defaults are generated below).
// Run: npm run build (or node tools/pages.mjs).
import { readFileSync, writeFileSync, mkdirSync, rmSync, openSync, readSync, closeSync } from 'node:fs';
import vm from 'node:vm';

const SITE = 'https://www.blissbathandkitchen.com/';   // production origin for structured data
const root = new URL('../', import.meta.url);
const read = (f) => readFileSync(new URL(f, root), 'utf8');

// --- load the catalogue (js/data.js is a browser script) ---
const sandbox = { localStorage: { getItem: () => null, setItem() {}, removeItem() {} }, document: { addEventListener() {}, dispatchEvent() {} }, CustomEvent: function () {}, console };
sandbox.window = sandbox;
vm.runInNewContext(read('js/data.js'), sandbox);
const B = sandbox.BLISS;
const VARIANTS = JSON.parse(read('js/main.js').match(/const IMG_VARIANTS = (\{.*?\});/s)[1]);
const CONTENT = JSON.parse(read('content/categories.json'));

// --- helpers ---
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function webpSize(name) {                       // width/height from the WebP header (VP8, VP8L, VP8X)
  const fd = openSync(new URL(`img/${name}.webp`, root), 'r'); const b = Buffer.alloc(30); readSync(fd, b, 0, 30, 0); closeSync(fd);
  const t = b.toString('ascii', 12, 16);
  if (t === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (t === 'VP8L') { const v = b.readUInt32LE(21); return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)]; }
  return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
}
function img(name, { sizes = '100vw', alt = '', lazy = true, priority = false } = {}) {
  const [w, h] = webpSize(name);
  const v = VARIANTS[name];
  const set = v ? ` srcset="${v.slice(1).map((x) => `img/${name}-${x}.webp ${x}w`).join(', ')}, img/${name}.webp ${v[0]}w" sizes="${sizes}"` : '';
  return `<img src="img/${name}.webp"${set} width="${w}" height="${h}" alt="${esc(alt)}"${lazy ? ' loading="lazy" decoding="async"' : ''}${priority ? ' fetchpriority="high"' : ''}>`;
}
const isRoomPhoto = (n) => !/^(pc-|nn-|pd-c|pd-dim|tub-filler)/.test(n);
const headImgOf = (c) => [...B.catTrail(c.slug)].reverse().map((x) => x.img).find(isRoomPhoto) || 'hero-1';
const introOf = (c) => c.intro || `Shop ${c.name.toLowerCase()} from the world’s leading brands, selected for design, quality and lasting performance.`;
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

function crumbs(c) {
  const trail = B.catTrail(c.slug);
  return '<a href="index.html">Home</a>' + trail.map((x, i) => `<span class="sep">›</span>${i === trail.length - 1 ? `<span class="cur" aria-current="page">${esc(x.name)}</span>` : `<a href="${B.catUrl(x.slug)}">${esc(x.name)}</a>`}`).join('');
}

// sub-category strip: a parent lists its children; a final category lists its siblings (current one marked)
function subnav(c) {
  const kids = B.catChildren(c.slug);
  const list = kids.length ? kids : (c.parent ? B.catChildren(c.parent) : []);
  if (list.length < 2 && !kids.length) return '';
  const parent = !kids.length && c.parent ? B.catBySlug[c.parent] : null;
  const item = (x, on) => `<a class="cs-item${on ? ' on' : ''}" href="${B.catUrl(x.slug)}"${on ? ' aria-current="page"' : ''}><span class="cs-img${isRoomPhoto(x.img) ? ' photo' : ''}">${img(x.img, { sizes: '96px', lazy: false })}</span><span class="cs-name">${esc(x.name)}</span></a>`;
  const all = parent ? `<a class="cs-item cs-all" href="${B.catUrl(parent.slug)}"><span class="cs-img"><i data-icon="grid"></i></span><span class="cs-name">All ${esc(parent.name)}</span></a>` : '';
  return `<nav class="cat-subnav" aria-label="${esc(kids.length ? `${c.name} categories` : `More in ${parent?.name || ''}`)}">${all}${list.map((x) => item(x, x.slug === c.slug)).join('')}</nav>`;
}

// copy + FAQ: written content when available, otherwise sensible defaults
function contentOf(c) {
  const own = CONTENT[c.slug];
  if (own) return own;
  const parent = c.parent ? B.catBySlug[c.parent].name.toLowerCase() : 'home';
  const n = c.name.toLowerCase();
  return {
    title: `Shop ${c.name} at Bliss Bath and Kitchen`,
    paragraphs: [introOf(c),
      `Compare styles, sizes and finishes, filter by price and brand, or ask our specialists to help you choose the right ${n} for your ${parent} project. Many pieces can be seen in person at our Markham showroom.`],
    points: [['Curated brands', 'Selected for design, engineering and after-sales support.'], ['Expert advice', 'Specialists who can help with sizing, finishes and compatibility.'], ['Delivered across Canada & USA', 'Free standard shipping on eligible orders.']],
    faq: [
      [`How do I choose the right ${n}?`, `Start with the size and installation requirements of your space, then choose a style and finish that coordinates with the rest of the room. Our specialists are happy to review your plans and recommend options.`],
      [`Do you ship ${n} across Canada and the USA?`, 'Yes. Eligible orders ship free across Canada and the USA. Large items ship by freight with a scheduled delivery appointment.'],
      [`Can I see ${n} in person?`, 'Many products are on display at our showroom at 5 Shields Court, Unit 104, Markham, Ontario. Book an appointment for dedicated time with a specialist.'],
      ['Do you offer trade or project pricing?', 'Yes. Designers, builders and contractors can apply to our Trade Program for preferred pricing, quotations and dedicated support.'],
      ['What is your return policy?', 'Eligible unused items in original packaging can be returned within 14 days of delivery. Special-order and made-to-order items are final sale.'],
    ],
  };
}
function contentHtml(c, data) {
  const kids = B.catChildren(c.slug);
  const links = kids.length ? kids : (c.parent ? B.catChildren(c.parent).filter((x) => x.slug !== c.slug) : []);
  return `<div class="cc-grid">
        <div class="cc-main">
          <span class="eyebrow">Buying guide</span>
          <h2>${esc(data.title)}</h2>
          ${data.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n          ')}
          <div class="cc-points">${data.points.map(([h, p]) => `<div><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
        </div>
        <aside class="cc-side">
          ${links.length ? `<h3>${kids.length ? `Shop ${esc(c.name)}` : `More in ${esc(B.catBySlug[c.parent].name)}`}</h3>
          <ul>${links.map((x) => `<li><a href="${B.catUrl(x.slug)}">${esc(x.name)}</a></li>`).join('')}</ul>` : ''}
          <div class="cc-help"><b>Need help choosing?</b><p>Talk to a specialist about sizing, finishes and availability.</p><a class="btn sm" href="contact.html?topic=design">Ask a Specialist</a><a class="cc-phone" href="tel:18553661001">1-855-366-1001</a></div>
        </aside>
      </div>`;
}
function faqHtml(faq) {
  const half = Math.ceil(faq.length / 2);
  const col = (items) => `<div class="faq-col">${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`;
  return col(faq.slice(0, half)) + col(faq.slice(half));
}
function schema(c, data) {
  const trail = B.catTrail(c.slug);
  const graph = [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE }, ...trail.map((x, i) => ({ '@type': 'ListItem', position: i + 2, name: x.name, item: SITE + B.catUrl(x.slug) }))] },
    { '@type': 'CollectionPage', name: c.name, url: SITE + B.catUrl(c.slug), description: introOf(c) },
    { '@type': 'FAQPage', mainEntity: data.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

// --- generate ---
const TPL = read('templates/category.html');
for (const top of B.categories.filter((c) => !c.parent)) rmSync(new URL(`${top.slug}/`, root), { recursive: true, force: true });

let count = 0;
for (const c of B.categories) {
  const url = B.catUrl(c.slug);
  const depth = url.split('/').filter(Boolean).length;
  const data = contentOf(c);
  const tokens = {
    BASE: '../'.repeat(depth), SLUG: c.slug, TOP: B.catTrail(c.slug)[0].slug, KIND: B.catChildren(c.slug).length ? 'parent' : 'leaf',
    NAME: esc(c.name), INTRO: esc(introOf(c)), DESC: esc(introOf(c)), CRUMBS: crumbs(c),
    HERO_IMG: img(headImgOf(c), { sizes: '(max-width: 980px) 0px, 360px', lazy: false }),
    SUBNAV: subnav(c), CONTENT: contentHtml(c, data), FAQ: faqHtml(data.faq), SCHEMA: schema(c, data),
  };
  const html = TPL.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in tokens ? tokens[k] : m));
  const dir = new URL(url, root);
  mkdirSync(dir, { recursive: true });
  writeFileSync(new URL('index.html', dir), html);
  count++;
}
console.log(`category pages: ${count} (${Object.keys(CONTENT).length - 1} with written content, the rest with default copy)`);
