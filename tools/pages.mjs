// Category pages: one folder per product category, following the WooCommerce URL hierarchy.
//   bathroom/index.html, bathroom/bathtubs/index.html, bathroom/bathtubs/freestanding-bathtubs/index.html ...
// Categories with children use templates/category.html (landing); the rest use templates/listing.html.
// The tree lives in js/data.js (CAT_ROWS). Run: npm run build (or node tools/pages.mjs).
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, openSync, readSync, closeSync } from 'node:fs';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const read = (f) => readFileSync(new URL(f, root), 'utf8');

// --- load the catalogue (js/data.js is a browser script) ---
const sandbox = { localStorage: { getItem: () => null, setItem() {}, removeItem() {} }, document: { addEventListener() {}, dispatchEvent() {} }, CustomEvent: function () {}, console };
sandbox.window = sandbox;
vm.runInNewContext(read('js/data.js'), sandbox);
const B = sandbox.BLISS;
const VARIANTS = JSON.parse(read('js/main.js').match(/const IMG_VARIANTS = (\{.*?\});/s)[1]);

// --- helpers ---
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function webpSize(name) {                       // width/height from the WebP header (VP8, VP8L, VP8X)
  const fd = openSync(new URL(`img/${name}.webp`, root), 'r'); const b = Buffer.alloc(30); readSync(fd, b, 0, 30, 0); closeSync(fd);
  const t = b.toString('ascii', 12, 16);
  if (t === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (t === 'VP8L') { const v = b.readUInt32LE(21); return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)]; }
  return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
}
function img(name, { sizes = '100vw', alt = '', lazy = true, priority = false, cls = '' } = {}) {
  const [w, h] = webpSize(name);
  const v = VARIANTS[name];
  const set = v ? ` srcset="${v.slice(1).map((x) => `img/${name}-${x}.webp ${x}w`).join(', ')}, img/${name}.webp ${v[0]}w" sizes="${sizes}"` : '';
  return `<img${cls ? ` class="${cls}"` : ''} src="img/${name}.webp"${set} width="${w}" height="${h}" alt="${esc(alt)}"${lazy ? ' loading="lazy" decoding="async"' : ''}${priority ? ' fetchpriority="high"' : ''}>`;
}
const isRoomPhoto = (n) => !/^(pc-|nn-|pd-c|pd-dim|tub-filler)/.test(n);
const heroImgOf = (c) => [...B.catTrail(c.slug)].reverse().map((x) => x.img).find(isRoomPhoto) || 'hero-1';
const INSPIRE = { bathroom: 'look-retreat', kitchen: 'look-kitchen', appliances: 'look-kitchen', lighting: 'hero-2', furniture: 'cat-home', outdoor: 'look-kitchen' };
const GUIDE = { bathroom: 'why-tub', kitchen: 'cat-kitchen', appliances: 'blog-range', lighting: 'mega-lighting', furniture: 'cat-home', outdoor: 'look-kitchen' };
const introOf = (c) => c.intro || `Shop ${c.name.toLowerCase()} from the world’s leading brands, selected for design, quality and lasting performance.`;

function crumbs(c) {
  const trail = B.catTrail(c.slug);
  return '<a href="index.html">Home</a>' + trail.map((x, i) => `<span class="sep">›</span>${i === trail.length - 1 ? `<span class="cur">${esc(x.name)}</span>` : `<a href="${B.catUrl(x.slug)}">${esc(x.name)}</a>`}`).join('');
}
function tile(c) {
  const kids = B.catChildren(c.slug).length, n = B.catProducts(c.slug).length;
  const meta = kids ? `${kids} categories` : n ? `${n} product${n === 1 ? '' : 's'}` : 'Shop now';
  return `<a class="sub-tile" href="${B.catUrl(c.slug)}"><span class="st-img${isRoomPhoto(c.img) ? ' photo' : ''}">${img(c.img, { sizes: '(max-width: 680px) 46vw, (max-width: 1180px) 30vw, 22vw', alt: c.name })}</span><span class="st-name">${esc(c.name)}</span><span class="st-meta">${meta} <i data-icon="arrow" class="sm"></i></span></a>`;
}
function related(c) {
  const sibs = B.catChildren(c.parent).filter((x) => x.slug !== c.slug);
  if (!c.parent || !sibs.length) return '';
  const p = B.catBySlug[c.parent];
  return `  <!-- Related categories -->
  <section class="section tight cat-related">
    <div class="wrap">
      <div class="row-head"><div><h2>More in ${esc(p.name)}</h2><p>Explore related categories.</p></div><a class="link-arrow" href="${B.catUrl(p.slug)}">All ${esc(p.name)} <i data-icon="arrow" class="sm"></i></a></div>
      <div class="sub-grid sm">${sibs.slice(0, 8).map(tile).join('')}</div>
    </div>
  </section>`;
}

// --- generate ---
const TPL = { landing: read('templates/category.html'), listing: read('templates/listing.html') };
for (const top of B.categories.filter((c) => !c.parent)) rmSync(new URL(`${top.slug}/`, root), { recursive: true, force: true });

let count = 0;
for (const c of B.categories) {
  const kids = B.catChildren(c.slug);
  const url = B.catUrl(c.slug);
  const depth = url.split('/').filter(Boolean).length;
  const top = B.catTrail(c.slug)[0].slug;
  const parent = c.parent ? B.catBySlug[c.parent].name : 'Shop by Department';
  let html = kids.length ? TPL.landing : TPL.listing;
  // keep blocks marked <!-- only:<slug> --> ... <!-- /only --> for that category only
  html = html.replace(/<!-- only:([\w-]+) -->([\s\S]*?)<!-- \/only -->\n?/g, (m, s, body) => (s === c.slug ? body : ''));
  const tokens = {
    BASE: '../'.repeat(depth), SLUG: c.slug, TOP: top, NAME: esc(c.name), NAME_LOWER: esc(c.name.toLowerCase()), PARENT: esc(parent),
    INTRO: esc(introOf(c)), DESC: esc(introOf(c)), CRUMBS: crumbs(c),
    HERO_IMG: img(heroImgOf(c), { sizes: '100vw', lazy: false, priority: true }),
    SUBTILES: kids.map(tile).join(''), SUB_COUNT: kids.length,
    GUIDE_IMG: img(GUIDE[top] || 'why-tub', { sizes: '(max-width: 980px) 100vw, 44vw', cls: 'reveal' }),
    INSPIRE_IMG: img(INSPIRE[top] || 'look-retreat', { sizes: '100vw' }),
    RELATED: kids.length ? '' : related(c),
  };
  html = html.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in tokens ? tokens[k] : m));
  const dir = new URL(url, root);
  mkdirSync(dir, { recursive: true });
  writeFileSync(new URL('index.html', dir), html);
  count++;
}
console.log(`category pages: ${count} (${B.categories.filter((c) => B.catChildren(c.slug).length).length} landing, ${B.categories.filter((c) => !B.catChildren(c.slug).length).length} listing)`);
if (!existsSync(new URL('bathroom/bathtubs/freestanding-bathtubs/index.html', root))) throw new Error('freestanding page missing');
