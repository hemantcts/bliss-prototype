/* BLISS prototype — shared layout + interactions (no build step, works from file://)
   Requires js/data.js to be loaded first. */

const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
  cart: '<path d="M3 4h2l2.2 11h11l2-8H6.2"/><circle cx="9" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/>',
  bag: '<path d="M5 8h14l-1 13H6Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  menu: '<path d="M3 7h18M3 12h18M3 17h18"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
  left: '<path d="m15 5-7 7 7 7"/>',
  right: '<path d="m9 5 7 7-7 7"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  up: '<path d="m6 15 6-6 6 6"/>',
  truck: '<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  store: '<path d="M3 9h18M4 9l1-5h14l1 5M5 9v11h14V9M9 20v-6h6v6"/><path d="M8 4v5M12 4v5M16 4v5"/>',
  diamond: '<path d="M6 4h12l3 5-9 11L3 9Z"/><path d="M3 9h18M9 4l-1.5 5L12 20l4.5-11L15 4"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8"/>',
  pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  grid: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/>',
  grid3: '<rect x="3" y="4" width="4.5" height="7"/><rect x="9.75" y="4" width="4.5" height="7"/><rect x="16.5" y="4" width="4.5" height="7"/><rect x="3" y="13" width="4.5" height="7"/><rect x="9.75" y="13" width="4.5" height="7"/><rect x="16.5" y="13" width="4.5" height="7"/>',
  filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
  zoom: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  upload: '<path d="M12 16V5M7 10l5-5 5 5M5 20h14"/>',
  leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 14 10"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/>',
  ruler: '<path d="M3 17 17 3l4 4L7 21Z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  hand: '<path d="M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V12M16 9a1.5 1.5 0 0 1 3 0v4a8 8 0 0 1-8 8h-1a6 6 0 0 1-5-3l-2.5-4a1.5 1.5 0 0 1 2.5-1.6L7 15"/>',
  bath: '<path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z"/><path d="M6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2 0-1.5-1-2-1-3s1-2 2.5-2H18a3 3 0 0 0 3-3c0-4.5-4-8-9-8Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8Z"/><circle cx="7.5" cy="8" r="1.3"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-2.5 5 2.5-1.5-7"/>',
  recycle: '<path d="M7 19H4l3-5M17 19h3l-3-5M12 4l-2 3.5M12 4l2 3.5M9 19h6M6 13 9 8M18 13l-3-5"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8Z"/>',
  pinterest: '<circle cx="12" cy="12" r="9"/><path d="M10.5 20 12 13.5M11 9.5a2.5 2.5 0 1 1 1.5 4.5c-1 0-1.5-.5-1.5-.5"/>',
  youtube: '<rect x="2.5" y="6" width="19" height="12" rx="3.5"/><path d="m10.5 9.5 4 2.5-4 2.5Z"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  return: '<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  note: '<path d="M5 4h14v16H5z"/><path d="M8 9h8M8 13h8M8 17h5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .7 3.2 2.6 3.5 5.5"/>',
  building: '<path d="M4 21V5l8-2v18M12 8h8v13M8 8v.01M8 12v.01M8 16v.01M16 12v.01M16 16v.01M2 21h20"/>',
  percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
  box: '<path d="m12 3 9 4.5v9L12 21l-9-4.5v-9Z"/><path d="m3 7.5 9 4.5 9-4.5M12 12v9"/>',
  file: '<path d="M6 3h8l5 5v13H6Z"/><path d="M14 3v5h5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5Z"/>',
  play: '<path d="M8 5v14l11-7Z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>',
};
const icon = (n, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;
window.icon = icon;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
window.esc = esc;

const PAGE = document.body.dataset.page || 'home';

/* Payment method badges (simplified marks; swap for official artwork from each provider's brand kit) */
const PAY = {
  visa: '<svg viewBox="0 0 48 30" aria-label="Visa" role="img"><rect width="48" height="30" rx="4" fill="#fff"/><text x="24" y="20" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="13" font-weight="900" font-style="italic" fill="#1a1f71" letter-spacing=".5">VISA</text></svg>',
  mastercard: '<svg viewBox="0 0 48 30" aria-label="Mastercard" role="img"><rect width="48" height="30" rx="4" fill="#fff"/><circle cx="19.5" cy="15" r="8.5" fill="#eb001b"/><circle cx="28.5" cy="15" r="8.5" fill="#f79e1b"/><path d="M24 7.8a8.5 8.5 0 0 1 0 14.4 8.5 8.5 0 0 1 0-14.4Z" fill="#ff5f00"/></svg>',
  amex: '<svg viewBox="0 0 48 30" aria-label="American Express" role="img"><rect width="48" height="30" rx="4" fill="#2e77bc"/><text x="24" y="19" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="10" font-weight="900" fill="#fff" letter-spacing=".6">AMEX</text></svg>',
  paypal: '<svg viewBox="0 0 48 30" aria-label="PayPal" role="img"><rect width="48" height="30" rx="4" fill="#fff"/><text x="24" y="19" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="10.5" font-weight="800" font-style="italic"><tspan fill="#003087">Pay</tspan><tspan fill="#009cde">Pal</tspan></text></svg>',
  applepay: '<svg viewBox="0 0 48 30" aria-label="Apple Pay" role="img"><rect width="48" height="30" rx="4" fill="#000"/><text x="24" y="18.5" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="8.5" font-weight="600" fill="#fff">Apple Pay</text></svg>',
  gpay: '<svg viewBox="0 0 48 30" aria-label="Google Pay" role="img"><rect width="48" height="30" rx="4" fill="#fff"/><text x="24" y="19" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="10" font-weight="700"><tspan fill="#4285f4">G</tspan><tspan fill="#5f6368"> Pay</tspan></text></svg>',
};
const payIcons = (keys = Object.keys(PAY)) => `<div class="pay-badges" aria-label="Accepted payment methods">${keys.map((k) => PAY[k]).join('')}</div>`;
window.payIcons = payIcons;
const { money } = BLISS;
const price = (cad, whole) => `<span data-price="${cad}"${whole ? ' data-whole' : ''}>${money(cad, whole)}</span>`;
window.price = price;
/* Product price: sale price + struck-through regular price when on sale */
const priceOf = (p, qty = 1) => BLISS.onSale(p)
  ? `<span class="sale-price">${price(p.cad * qty)}</span> <del class="was-price" aria-label="Regular price">${price(p.was * qty)}</del>`
  : price(p.cad * qty);
const badgeOf = (p) => BLISS.onSale(p) ? `<span class="badge sale">Sale −${BLISS.pctOff(p)}%</span>` : p.tag ? `<span class="badge">${p.tag}</span>` : '';
window.priceOf = priceOf;
window.badgeOf = badgeOf;

/* ---------- Header ---------- */
const NAV = [
  ['Bath', 'collection.html'], ['Kitchen', 'search.html?cat=Kitchen'], ['Appliances', 'search.html?cat=Appliances'],
  ['Lighting', 'search.html?cat=Lighting'], ['Furniture', 'search.html?cat=Furniture'], ['Brands', 'brands.html'],
  ['Inspiration', 'shop-the-look.html'], ['Sale', 'search.html?q=sale'],
];
const navActive = { collection: 'Bath', product: 'Bath', brands: 'Brands', looks: 'Inspiration', look: 'Inspiration', blog: 'Inspiration', 'blog-post': 'Inspiration' };
const navLink = ([n, href]) => `<a href="${href}" class="${n === 'Sale' ? 'sale' : ''}${navActive[PAGE] === n ? ' active' : ''}">${n}</a>`;

/* Category link lists: shared by the mega menu, mobile menu and footer (keep every SEO link) */
const sq = (t) => `search.html?q=${encodeURIComponent(t)}`;
const L = (t, h) => [t, h || sq(t)];
const LINKS = {
  bathroom: [L('Bathroom Faucets'), L('Bathroom Vanities'), L('Bathroom Fixtures'), L('Floor Mounted Tub Fillers'), L('Freestanding Tub Fillers'), L('LED Mirrors'), L('LED Medicine Cabinets'), L('Towel Warmers')],
  showers: [L('Shower Bases'), L('Shower Doors'), L('Sliding Shower Doors'), L('Shower Kits'), L('Thermostatic Shower Systems'), L('Smart Toilets'), L('Wall Hung Toilets')],
  bathtubs: [L('Bathtubs', 'collection.html'), L('Freestanding Bathtubs', 'collection.html'), L('Clawfoot Bathtubs'), L('Corner Bathtubs'), L('Cast Iron Bathtubs'), L('Non Standard Bathtubs'), L('Oval Bathtubs'), L('Japanese Bathtubs')],
  kFaucets: [L('Kitchen Faucets'), L('Single Hole Kitchen Faucets'), L('Pot Fillers'), L('Touchless Kitchen Faucets'), L('Bridge Kitchen Faucets')],
  kSinks: [L('Kitchen Sinks'), L('Apron Kitchen Sinks'), L('Farmhouse Kitchen Sinks'), L('Undermount Kitchen Sinks'), L('Workstation Sinks'), L('Granite Undermount Kitchen Sinks')],
  kMore: [L('Kitchen Appliances', 'search.html?cat=Appliances'), L('Soap Dispensers')],
  cooking: [L('Ranges'), L('Cooktops'), L('Wall Ovens'), L('Outdoor Grills')],
  refrig: [L('Refrigerators'), L('French Door Refrigerators'), L('Wine Storage')],
  vent: [L('Range Hoods'), L('Downdraft Ventilation')],
  lighting: [L('Chandeliers'), L('Pendants'), L('Vanity Lights'), L('Wall Sconces')],
  furniture: [L('Living', 'search.html?cat=Furniture'), L('Dining', 'search.html?cat=Furniture'), L('Bedroom', 'search.html?cat=Furniture'), L('Mirrors')],
  brands: BLISS.brands.filter((b) => b.featured).map((b) => L(b.name)),
};
const linkList = (items) => `<ul>${items.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>`;
const megaCol = (title, items) => `<div class="mega-col"><h4>${title}</h4>${linkList(items)}</div>`;
const megaFeature = (img, eyebrow, title, href) => `
  <a class="mega-feature" href="${href}"><span class="mf-img"><img src="img/${img}.webp" alt="" loading="lazy"></span><span class="eyebrow">${eyebrow}</span><b>${title}</b><span class="link-arrow">Shop now ${icon('arrow', 'sm')}</span></a>`;
const MEGA = {
  Bath: [megaCol('Bathroom', LINKS.bathroom), megaCol('Showers &amp; Toilets', LINKS.showers), megaCol('Bathtubs', LINKS.bathtubs),
    megaFeature('cat-bath', 'Featured', 'Freestanding Bathtubs', 'collection.html')],
  Kitchen: [megaCol('Kitchen Faucets', LINKS.kFaucets), megaCol('Kitchen Sinks', LINKS.kSinks), megaCol('More for the Kitchen', LINKS.kMore),
    megaFeature('cat-kitchen', 'Shop the look', 'The Contemporary Kitchen', 'search.html?cat=Kitchen')],
  Appliances: [megaCol('Cooking', LINKS.cooking), megaCol('Refrigeration', LINKS.refrig), megaCol('Ventilation', LINKS.vent),
    megaFeature('cat-appliances', 'Italian excellence', 'ILVE Ranges', sq('ILVE'))],
  Lighting: [megaCol('Lighting', LINKS.lighting), megaCol('Shop by Finish', [L('Warm Brass', sq('brass')), L('Polished Nickel', sq('nickel')), L('Matte Black', sq('black'))]),
    megaFeature('ig-4', 'New arrivals', 'Lighting for Every Room', 'search.html?cat=Lighting')],
  Furniture: [megaCol('Furniture', LINKS.furniture), megaCol('Need Help?', [L('Design Services', 'contact.html?topic=design'), L('Visit Our Showroom', 'showroom.html')]),
    megaFeature('cat-home', 'Coming soon', 'The Furniture Collection', 'search.html?cat=Furniture')],
  Brands: [`<div class="mega-col wide"><h4>Featured Brands</h4><ul class="mega-brands">${LINKS.brands.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul><a class="link-arrow" href="brands.html" style="margin-top:16px">View all ${BLISS.brands.length} brands ${icon('arrow', 'sm')}</a></div>`,
    megaFeature('brands-faucet', 'The brands you love', 'All in One Place', 'brands.html')],
  Inspiration: [megaCol('Get Inspired', [L('Shop the Look', 'shop-the-look.html'), L('The Journal', 'blog.html'), L('Find Your Finish', sq('brass')), L('Our Story', 'about.html'), L('Visit Our Showroom', 'showroom.html')]),
    megaFeature('look-retreat', 'Shop the look', 'The Modern Retreat', 'look.html?look=modern-retreat'), megaFeature('look-kitchen', 'Shop the look', 'The Contemporary Kitchen', 'look.html?look=contemporary-kitchen')],
};
const navItem = ([n, href]) => MEGA[n] ? `
  <div class="nav-item" data-mega>
    <a href="${href}" class="nav-link${navActive[PAGE] === n ? ' active' : ''}" aria-haspopup="true" aria-expanded="false">${n}</a>
    <div class="mega" role="region" aria-label="${n} menu"><div class="wrap mega-inner">${MEGA[n].join('')}</div>
      <div class="mega-foot"><div class="wrap"><a href="${href}" class="link-arrow">Shop all ${n} ${icon('arrow', 'sm')}</a><span>${icon('truck', 'sm')} Free shipping on eligible orders · Canada &amp; USA</span></div></div></div>
  </div>` : `<div class="nav-item">${navLink([n, href])}</div>`;
const mobileItem = ([n, href]) => MEGA[n]
  ? `<details class="m-group"><summary>${n}${icon('down', 'sm')}</summary><div>${MEGA[n].filter((c) => c.includes('mega-col')).join('')}<a class="m-all" href="${href}">Shop all ${n} ${icon('arrow', 'sm')}</a></div></details>`
  : navLink([n, href]);

const currencyMenu = (id) => `
<div class="cur" data-cur>
  <button class="cur-btn" aria-haspopup="listbox" aria-expanded="false" aria-controls="${id}">
    <span class="cur-flag" data-currency-flag></span><span data-currency-label>${BLISS.currency}</span>${icon('down', 'sm')}
  </button>
  <ul class="cur-menu" id="${id}" role="listbox" aria-label="Currency">
    <li role="option" data-set-cur="CAD"><span class="cur-flag ca"></span><b>CAD $</b><small>Canadian dollar</small></li>
    <li role="option" data-set-cur="USD"><span class="cur-flag us"></span><b>USD $</b><small>US dollar</small></li>
  </ul>
</div>`;

const headerHTML = `
<a class="skip" href="#main">Skip to content</a>
<div class="topbar"><div class="wrap">
  <div class="left"><span>Free shipping on eligible orders · Canada &amp; USA</span><span>Design services available</span></div>
  <div class="right"><a href="trade.html">Trade program</a><a href="showroom.html">Showroom</a><a href="contact.html">Contact</a>${currencyMenu('curTop')}</div>
</div></div>
<header class="site-header"><div class="wrap">
  <button class="menu-toggle" aria-label="Open menu">${icon('menu')}</button>
  <a class="logo" href="index.html" aria-label="Bliss home"><b>BLISS</b><small>Bath · Kitchen · Appliance · Home</small><img class="logo-img" src="img/logo-bliss.webp" alt="Bliss Bath &amp; Kitchen" width="596" height="123" loading="lazy" decoding="async"></a>
  <nav class="main-nav" aria-label="Main">${NAV.map(navItem).join('')}</nav>
  <div class="header-actions">
    <button aria-label="Search (press /)" data-open-search>${icon('search')}</button>
    <a href="#" aria-label="Account" class="hide-sm">${icon('user')}</a>
    <a href="wishlist.html" aria-label="Wishlist" class="hide-sm">${icon('heart')}<span class="cart-count wish-count" data-wish-count hidden>0</span></a>
    <button aria-label="Open cart" data-open-cart>${icon('bag')}<span class="cart-count" data-cart>0</span></button>
  </div>
</div></header>
<div class="mobile-nav"><div class="scrim"></div><nav aria-label="Mobile">
  <button class="close" aria-label="Close menu">${icon('close')}</button>
  ${NAV.map(mobileItem).join('')}
  <a href="wishlist.html">Wishlist <span class="m-count" data-wish-count hidden>0</span></a><a href="about.html">Our Story</a><a href="trade.html">Trade program</a><a href="showroom.html">Showroom</a><a href="contact.html">Contact</a>
  <div class="m-cur"><span>Currency</span>${currencyMenu('curMobile')}</div>
</nav></div>`;

/* Services bar — copy from the client content document */
const trustHTML = `
<section class="trust"><div class="wrap">
  <a class="trust-item" href="contact.html">${icon('compass')}<div><strong>Design Expertise</strong><span>Guidance from product &amp; design specialists</span></div></a>
  <a class="trust-item" href="trade.html">${icon('building')}<div><strong>Trade Program</strong><span>Exclusive benefits for industry professionals</span></div></a>
  <a class="trust-item" href="showroom.html">${icon('store')}<div><strong>Visit Our Showroom</strong><span>Experience our collections in Markham</span></div></a>
  <a class="trust-item" href="shipping.html">${icon('truck')}<div><strong>Canada &amp; USA Shipping</strong><span>Delivery across North America</span></div></a>
</div></section>`;

const newsletterHTML = `
<section class="newsletter"><div class="wrap">
  <div><span class="eyebrow">Stay inspired</span><h2>Join the Bliss List</h2>
  <p>Be the first to discover new collections, designer favourites, exclusive offers and inspiration for the home.</p></div>
  <form class="nl-form" onsubmit="event.preventDefault(); toast('Thanks — you\\'re on the Bliss List.'); this.reset();">
    <input type="email" required placeholder="Enter your email address" aria-label="Email address">
    <button class="btn" type="submit">Subscribe ${icon('arrow', 'sm')}</button>
  </form>
</div></section>`;

const col = (title, items) => `<h4>${title}</h4><ul>${items.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>`;
const PAGES = [
  ['Home', 'index.html', 'home'], ['Collection', 'collection.html', 'collection'], ['Product', 'product.html', 'product'],
  ['Search / Shop', 'search.html?q=tub', 'search'], ['Cart', 'cart.html', 'cart'], ['Wishlist', 'wishlist.html', 'wishlist'], ['Checkout', 'checkout.html', 'checkout'],
  ['Order confirmed', 'order-confirmed.html', 'confirmed'], ['Our Story', 'about.html', 'about'], ['Contact', 'contact.html', 'contact'],
  ['Trade Program', 'trade.html', 'trade'], ['Project Inquiries', 'projects.html', 'projects'], ['Showroom', 'showroom.html', 'showroom'],
  ['Brands', 'brands.html', 'brands'], ['Shop the Look', 'shop-the-look.html', 'looks'], ['Look detail', 'look.html?look=dark-drama', 'look'], ['Blog', 'blog.html', 'blog'], ['Blog article', 'blog-post.html', 'blog-post'], ['Terms & Conditions', 'terms.html', 'terms'], ['Returns', 'returns.html', 'returns'], ['Shipping Policy', 'shipping.html', 'shipping'], ['Privacy Policy', 'privacy.html', 'privacy'],
];
const footerHTML = `
<footer class="site-footer"><div class="wrap">
  <div class="f-brand"><a class="logo" href="index.html"><b>BLISS</b><small>Bath · Kitchen · Appliance · Home</small><img class="logo-img" src="img/logo-bliss-light.webp" alt="Bliss Bath &amp; Kitchen" width="596" height="123" loading="lazy" decoding="async"></a></div>
  <div class="f-cols f-one">
    <div>${col('Bathroom Products', [L('Bathroom Faucets'), L('Bathroom Vanities'), L('Bathroom Fixtures'), L('Floor Mounted Tub Fillers'), L('Smart Toilets'), L('Freestanding Tub Fillers'), L('LED Mirrors'), L('LED Medicine Cabinets'), L('Shower Bases'), L('Shower Doors'), L('Shower Kits'), L('Thermostatic Shower Systems'), L('Sliding Shower Doors'), L('Wall Hung Toilets'), L('Towel Warmers')])}</div>
    <div>${col('Bathtubs', LINKS.bathtubs)}${col('Lighting', LINKS.lighting)}</div>
    <div>${col('Kitchen Products', [L('Kitchen Faucets'), L('Single Hole Kitchen Faucets'), L('Pot Fillers'), L('Kitchen Sinks'), L('Apron Kitchen Sinks'), L('Farmhouse Kitchen Sinks'), L('Undermount Kitchen Sinks'), L('Workstation Sinks'), L('Granite Undermount Kitchen Sinks'), L('Kitchen Appliances', 'search.html?cat=Appliances'), L('Touchless Kitchen Faucets'), L('Bridge Kitchen Faucets'), L('Soap Dispensers')])}</div>
    <div>${col('Appliances', [...LINKS.cooking, LINKS.refrig[0], LINKS.vent[0]])}${col('Furniture', LINKS.furniture)}</div>
    <div>${col('Discover', [['Our Story', 'about.html'], ['Brands', 'brands.html'], ['Shop the Look', 'shop-the-look.html'], ['New Arrivals', 'search.html?q=new'], ['Best Sellers', 'search.html?q=best'], ['Sale', 'search.html?q=sale'], ['Design Services', 'contact.html?topic=design'], ['Visit Our Showroom', 'showroom.html'], ['Blogs', 'blog.html']])}</div>
    <div class="f-contact-col">${col('Customer Care', [['About Us', 'about.html'], ['Contact Us', 'contact.html'], ['Return Policy', 'returns.html'], ['Shipping Policy', 'shipping.html'], ['Terms &amp; Conditions', 'terms.html'], ['Trade Program', 'trade.html'], ['Project Inquiries', 'projects.html']])}
      <ul class="f-contact">
        <li>${icon('pin')}<span>5 Shields Court, Unit 104<br>Markham, Ontario</span></li>
        <li>${icon('phone')}<a href="tel:18553661001">1-855-366-1001</a></li>
        <li>${icon('mail')}<a href="mailto:admin@blissbathandkitchen.com">Email us</a></li>
      </ul></div>
  </div>
  <div class="f-pay"><span>We accept</span>${payIcons()}</div>
  <div class="f-bottom">
    <div class="f-legal"><span>© 2026 Bliss Bath and Kitchen. All rights reserved.</span>
      <a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms &amp; Conditions</a><button type="button" data-cookie-prefs>Cookie Preferences</button><button type="button" data-cookie-prefs="optout">Do Not Sell or Share My Personal Information</button></div>
    <div class="socials">
      <a href="#" aria-label="Facebook">${icon('facebook', 'sm')}</a><a href="#" aria-label="Instagram">${icon('instagram', 'sm')}</a>
      <a href="#" aria-label="Pinterest">${icon('pinterest', 'sm')}</a><a href="#" aria-label="YouTube">${icon('youtube', 'sm')}</a>
      <a href="#" aria-label="LinkedIn">${icon('linkedin', 'sm')}</a>
    </div>
    <div class="region">${currencyMenu('curFoot')}</div>
  </div>
</div></footer>
<div class="toast" role="status" aria-live="polite">${icon('check')}<span></span></div>
<details class="proto-badge"><summary>Prototype pages ${icon('up', 'sm')}</summary>
  <nav>${PAGES.map(([t, h, k]) => `<a href="${h}" class="${PAGE === k ? 'on' : ''}">${t}</a>`).join('')}</nav>
</details>`;

/* ---------- Cart drawer + search overlay shells ---------- */
const drawerHTML = `
<div class="drawer-scrim" data-close-cart></div>
<aside class="drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-labelledby="cartTitle" aria-hidden="true">
  <header class="drawer-head"><h2 id="cartTitle">Your Cart <span data-cart-label></span></h2><button aria-label="Close cart" data-close-cart>${icon('close')}</button></header>
  <div class="drawer-ship" id="drawerShip"></div>
  <div class="drawer-body" id="drawerBody"></div>
  <footer class="drawer-foot" id="drawerFoot"></footer>
</aside>`;

const searchHTML = `
<div class="search-ov" id="searchOv" role="dialog" aria-modal="true" aria-label="Search" aria-hidden="true">
  <div class="search-top"><div class="wrap">
    <form class="search-bar" action="search.html" role="search">
      ${icon('search')}
      <input id="searchInput" name="q" type="search" autocomplete="off" spellcheck="false" placeholder="Search products, brands, finishes…" aria-label="Search" aria-controls="searchResults">
      <kbd class="hide-sm">ESC</kbd>
      <button type="button" class="search-close" data-close-search aria-label="Close search">${icon('close')}</button>
    </form>
  </div></div>
  <div class="search-body"><div class="wrap" id="searchResults"></div></div>
</div>`;

const mount = (sel, html) => { const el = document.querySelector(sel); if (el) el.outerHTML = html; };
mount('#site-header', headerHTML);
mount('#trust', trustHTML);
mount('#newsletter', newsletterHTML);
const MINIMAL = document.body.hasAttribute('data-minimal');
const minimalFooterHTML = `
<footer class="co-min-foot"><div class="wrap">
  <a href="returns.html">Returns</a><a href="shipping.html">Shipping policy</a><a href="privacy.html">Privacy policy</a><button type="button" data-cookie-prefs>Cookie preferences</button><a href="contact.html">Contact</a><a href="tel:18553661001">1-855-366-1001</a>
  <span>© 2026 Bliss Bath and Kitchen</span>
</div></footer>
<div class="toast" role="status" aria-live="polite">${icon('check')}<span></span></div>
<details class="proto-badge"><summary>Prototype pages ${icon('up', 'sm')}</summary>
  <nav>${PAGES.map(([t, h, k]) => `<a href="${h}" class="${PAGE === k ? 'on' : ''}">${t}</a>`).join('')}</nav>
</details>`;
mount('#site-footer', (MINIMAL ? minimalFooterHTML : footerHTML) + drawerHTML + searchHTML);
if (!document.querySelector('main')?.id) document.querySelector('main')?.setAttribute('id', 'main');

/* Render any <i data-icon="name"> placeholders */
function renderIcons(root = document) {
  root.querySelectorAll('i[data-icon]').forEach((el) => { el.outerHTML = icon(el.dataset.icon, el.className || ''); });
}
renderIcons();
window.renderIcons = renderIcons;
document.querySelectorAll('[data-pay]').forEach((el) => { el.outerHTML = payIcons(el.dataset.pay.split(',')); });

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg, action) {
  const t = document.querySelector('.toast');
  t.querySelector('span').textContent = msg;
  t.querySelector('.toast-act')?.remove();
  if (action) {
    const a = document.createElement('a');
    a.className = 'toast-act'; a.href = action.href; a.textContent = action.label;
    t.append(a);
  }
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), action ? 3600 : 2600);
}
window.toast = toast;

/* ---------- Currency switcher ---------- */
function syncCurrencyUI() {
  document.querySelectorAll('[data-currency-flag]').forEach((f) => (f.className = 'cur-flag ' + (BLISS.currency === 'CAD' ? 'ca' : 'us')));
  document.querySelectorAll('[data-set-cur]').forEach((li) => li.setAttribute('aria-selected', li.dataset.setCur === BLISS.currency));
}
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.cur-btn');
  document.querySelectorAll('[data-cur].open').forEach((c) => { if (!btn || !c.contains(btn)) { c.classList.remove('open'); c.querySelector('.cur-btn').setAttribute('aria-expanded', false); } });
  if (btn) {
    const c = btn.closest('[data-cur]'); c.classList.toggle('open'); btn.setAttribute('aria-expanded', c.classList.contains('open'));
  }
  const opt = e.target.closest('[data-set-cur]');
  if (opt) {
    BLISS.setCurrency(opt.dataset.setCur);
    syncCurrencyUI();
    toast(opt.dataset.setCur === 'CAD' ? 'Prices now shown in Canadian dollars' : 'Prices now shown in US dollars');
  }
});
syncCurrencyUI();
BLISS.refreshPrices();

/* ---------- Cart drawer ---------- */
const drawer = document.getElementById('cartDrawer');
let lastFocus;
function openCart() {
  lastFocus = document.activeElement;
  renderDrawer();
  document.body.classList.add('cart-open');
  drawer.setAttribute('aria-hidden', 'false');
  setTimeout(() => drawer.querySelector('[data-close-cart]').focus(), 50);
}
function closeCart() {
  document.body.classList.remove('cart-open');
  drawer.setAttribute('aria-hidden', 'true');
  lastFocus?.focus?.();
}
window.openCart = openCart;

const qtyControl = (l) => `
  <div class="qty sm" data-line="${l.id}|${esc(l.variant)}">
    <button type="button" data-step="-1" aria-label="Decrease quantity">−</button>
    <input value="${l.qty}" inputmode="numeric" aria-label="Quantity">
    <button type="button" data-step="1" aria-label="Increase quantity">+</button>
  </div>`;
window.qtyControl = qtyControl;

function shipNote() {
  if (!BLISS.cart.count()) return '';
  return BLISS.cart.hasFreight()
    ? `${icon('truck', 'sm')}<span>Your cart includes <b>freight</b> items. Curbside delivery is quoted before we process your order.</span>`
    : `${icon('check', 'sm')}<span>Your order qualifies for <b>free standard shipping</b> across Canada &amp; USA.</span>`;
}

function renderDrawer() {
  const items = BLISS.cart.items();
  const count = BLISS.cart.count();
  drawer.querySelector('[data-cart-label]').textContent = count ? `(${count})` : '';
  document.getElementById('drawerShip').innerHTML = shipNote();
  document.getElementById('drawerShip').hidden = !count;
  const body = document.getElementById('drawerBody');
  const foot = document.getElementById('drawerFoot');
  if (!items.length) {
    body.innerHTML = `<div class="drawer-empty">
      ${icon('bag', 'lg')}<h3>Your cart is empty</h3><p>Discover pieces curated for beautiful living.</p>
      <a class="btn" href="collection.html">Shop Bathtubs ${icon('arrow', 'sm')}</a>
      <div class="drawer-cats"><a href="search.html?cat=Kitchen">Kitchen</a><a href="search.html?cat=Appliances">Appliances</a><a href="search.html?cat=Lighting">Lighting</a><a href="search.html?q=new">New Arrivals</a></div>
    </div>`;
    foot.innerHTML = '';
    return;
  }
  const inCart = new Set(items.map((l) => l.id));
  const recs = BLISS.products.filter((p) => !inCart.has(p.id) && p.weight === 'parcel').slice(0, 3);
  body.innerHTML = `<ul class="lines">${items.map((l) => `
    <li class="line">
      <a href="product.html" class="line-img"><img src="img/${l.product.img}.webp" alt=""></a>
      <div class="line-info">
        <span class="brand">${l.product.brand}</span>
        <a href="product.html" class="name">${l.product.name}</a>
        ${l.variant ? `<span class="variant">${esc(l.variant)}</span>` : ''}
        <div class="line-row">${qtyControl(l)}<button class="line-remove" data-remove="${l.id}|${esc(l.variant)}">Remove</button></div>
      </div>
      <div class="line-price">${priceOf(l.product, l.qty)}</div>
    </li>`).join('')}</ul>
    <div class="recs"><h4>Complete the look</h4>${recs.map((p) => `
      <div class="rec"><img src="img/${p.img}.webp" alt=""><div><span class="brand">${p.brand}</span><span class="name">${p.name}</span>${priceOf(p)}</div>
      <button class="rec-add" data-add="${p.id}" aria-label="Add ${esc(p.name)} to cart">${icon('bag', 'sm')}+</button></div>`).join('')}
    </div>`;
  foot.innerHTML = `
    <details class="order-note"><summary>${icon('note', 'sm')} Add order note</summary><textarea rows="3" placeholder="Delivery instructions, project name, etc.">${esc(BLISS.store.get('bliss_note', ''))}</textarea></details>
    ${(() => { const save = BLISS.cart.items().reduce((t, l) => t + (BLISS.onSale(l.product) ? (l.product.was - l.product.cad) * l.qty : 0), 0); return save ? `<div class="save-row">${icon('tag', 'sm')} You're saving ${price(save)}</div>` : ''; })()}
    <div class="sub-row"><span>Subtotal</span><strong>${price(BLISS.cart.subtotal())} <small data-currency-suffix>${BLISS.currency === 'CAD' ? 'CAD' : ''}</small></strong></div>
    <p class="fine">Taxes and shipping calculated at checkout.</p>
    <a class="btn block" href="checkout.html">${icon('lock', 'sm')} Checkout</a>
    <a class="link-arrow center" href="cart.html">View cart ${icon('arrow', 'sm')}</a>
    ${payIcons()}`;
  foot.querySelector('textarea').addEventListener('input', (e) => BLISS.store.set('bliss_note', e.target.value));
}

function updateCartCount() {
  document.querySelectorAll('[data-cart]').forEach((c) => {
    c.textContent = BLISS.cart.count();
    c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
  });
}
document.addEventListener('cart:change', () => {
  updateCartCount();
  if (document.body.classList.contains('cart-open')) renderDrawer();
});
updateCartCount();

document.addEventListener('click', (e) => {
  if (e.target.closest('[data-open-cart]')) { e.preventDefault(); openCart(); }
  if (e.target.closest('[data-close-cart]')) closeCart();

  const add = e.target.closest('[data-add]');
  if (add) {
    e.preventDefault();
    let qty = 1, variant = '';
    if (add.dataset.add === 'pdp') {
      qty = parseInt(document.querySelector('.buy .qty input')?.value, 10) || 1;
      variant = document.getElementById('colourName')?.textContent || '';
    }
    const id = add.dataset.add === 'pdp' ? add.dataset.id : add.dataset.add;
    BLISS.cart.add(id, qty, variant);
    add.classList.add('added');
    setTimeout(() => add.classList.remove('added'), 1200);
    if (!add.closest('.drawer')) openCart();
  }
  const rm = e.target.closest('[data-remove]');
  if (rm) { const [id, v] = rm.dataset.remove.split('|'); BLISS.cart.remove(id, v); }

  const step = e.target.closest('[data-line] [data-step]');
  if (step) {
    const wrap = step.closest('[data-line]');
    const [id, v] = wrap.dataset.line.split('|');
    const line = BLISS.cart.items().find((l) => l.id === id && l.variant === v);
    if (line) BLISS.cart.setQty(id, v, line.qty + +step.dataset.step);
  }

  const wish = e.target.closest('[data-wish]');
  if (wish) {
    e.preventDefault();
    const on = BLISS.wish.toggle(wish.dataset.wish);
    wish.classList.remove('pop'); void wish.offsetWidth; if (on) wish.classList.add('pop');
    toast(on ? 'Saved to your wishlist' : 'Removed from your wishlist', on ? { href: 'wishlist.html', label: 'View' } : null);
  }
});

/* ---------- Wishlist: keep every heart and the header count in sync ---------- */
function syncWish(root = document) {
  root.querySelectorAll('[data-wish]').forEach((b) => {
    const on = BLISS.wish.has(b.dataset.wish);
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on);
    b.setAttribute('aria-label', on ? 'Remove from wishlist' : 'Add to wishlist');
  });
  document.querySelectorAll('[data-wish-count]').forEach((c) => {
    const n = BLISS.wish.count();
    c.textContent = n; c.hidden = !n;
  });
}
window.syncWish = syncWish;
document.addEventListener('wish:change', () => syncWish());
// product grids are re-rendered by page scripts, so re-sync hearts whenever new ones appear
new MutationObserver((muts) => {
  if (muts.some((m) => [...m.addedNodes].some((n) => n.nodeType === 1 && (n.matches?.('[data-wish]') || n.querySelector?.('[data-wish]'))))) syncWish();
}).observe(document.body, { childList: true, subtree: true });
syncWish();
document.addEventListener('change', (e) => {
  const input = e.target.closest('[data-line] input');
  if (input) {
    const [id, v] = input.closest('[data-line]').dataset.line.split('|');
    BLISS.cart.setQty(id, v, parseInt(input.value, 10) || 0);
  }
});

/* ---------- Search overlay ---------- */
const searchOv = document.getElementById('searchOv');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const POPULAR = ['Freestanding tub', 'Brass kitchen faucet', 'Smart toilet', 'ILVE range', 'Matte black', 'Victoria + Albert'];
const SITE_PAGES = [
  ['Returns & Cancellations', 'returns.html', 'return refund cancel exchange damaged rga restocking'],
  ['Shipping Policy', 'shipping.html', 'shipping delivery freight pickup expedited international lead time'],
  ['Trade Program', 'trade.html', 'trade designer builder contractor pricing account'],
  ['Project Inquiries', 'projects.html', 'project quote volume pricing builder multi-unit'],
  ['Visit Our Showroom', 'showroom.html', 'showroom markham visit appointment directions hours'],
  ['My Wishlist', 'wishlist.html', 'wishlist saved favourites favorites'],
  ['Contact Us', 'contact.html', 'contact help phone email support'],
  ['Shop the Look', 'shop-the-look.html', 'shop the look inspiration rooms ideas'],
  ['The Journal (Blog)', 'blog.html', 'blog journal guide ideas articles'],
  ['Terms & Conditions', 'terms.html', 'terms conditions legal'],
  ['Our Brands (A–Z)', 'brands.html', 'brands manufacturers directory logos'],
  ['Our Story', 'about.html', 'about story bliss'],
  ['Privacy & Cookie Policy', 'privacy.html', 'privacy cookies personal information data consent'],
];
const SYN = { tub: 'bathtub', tubs: 'bathtub', bathtubs: 'bathtub', faucets: 'faucet', tap: 'faucet', taps: 'faucet', stove: 'range', oven: 'range', fridge: 'refrigerator', black: 'matte black b', brass: 'brass gold', gold: 'brass', light: 'lighting', lights: 'lighting' };

function haystack(p) {
  return [p.brand, p.name, p.cat, p.sub, p.material, p.finish, p.shape, p.tag,
    p.colors?.includes('#26221f') ? 'black matte black' : '', p.colors?.includes('#b8894a') ? 'brass gold' : '',
    p.colors?.includes('#c9c6c0') ? 'nickel chrome stainless' : '', p.colors?.includes('#fbfaf7') ? 'white' : '', p.tag === 'Best Seller' || p.rating >= 4.8 ? 'best seller' : ''].join(' ').toLowerCase();
}
function searchProducts(q) {
  const tokens = q.toLowerCase().replace(/[+]/g, ' ').split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  return BLISS.products
    .map((p) => {
      const h = haystack(p);
      let score = 0;
      for (const t of tokens) {
        const alts = [t, ...(SYN[t] || '').split(' ').filter(Boolean), t.replace(/s$/, '')];
        const hit = alts.find((a) => h.includes(a));
        if (!hit) return null;
        score += p.name.toLowerCase().includes(hit) ? 3 : p.brand.toLowerCase().includes(hit) ? 2 : 1;
      }
      return { p, score: score + p.rating / 10 };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}
window.searchProducts = searchProducts;
const hl = (text, q) => {
  const tokens = q.trim().split(/\s+/).filter((t) => t.length > 1).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return tokens.length ? esc(text).replace(new RegExp(`(${tokens.join('|')})`, 'ig'), '<mark>$1</mark>') : esc(text);
};
const resultCard = (p, q = '') => `
  <a class="sr-card" href="product.html" data-sr>
    <div class="ph"><img src="img/${p.img}.webp" alt="" loading="lazy">${badgeOf(p)}</div>
    <span class="brand">${hl(p.brand, q)}</span><span class="name">${hl(p.name, q)}</span><span class="sr-price">${priceOf(p)}</span>
  </a>`;

function renderSearch() {
  const q = searchInput.value.trim();
  if (!q) {
    const trending = ['va-barcelona-2', 'riobel-kitchen-faucet', 'toto-neorest-nx', 'ilve-majestic-36'].map(BLISS.byId);
    searchResults.innerHTML = `
      <div class="sr-grid">
        <div class="sr-side">
          <h4>${icon('trend', 'sm')} Popular searches</h4>
          <div class="chips">${POPULAR.map((t) => `<button type="button" data-query="${t}">${t}</button>`).join('')}</div>
          <h4>Shop by space</h4>
          <ul class="sr-links">
            <li><a data-sr href="collection.html">Bath ${icon('arrow', 'sm')}</a></li>
            <li><a data-sr href="search.html?cat=Kitchen">Kitchen ${icon('arrow', 'sm')}</a></li>
            <li><a data-sr href="search.html?cat=Appliances">Appliances ${icon('arrow', 'sm')}</a></li>
            <li><a data-sr href="search.html?cat=Lighting">Lighting ${icon('arrow', 'sm')}</a></li>
          </ul>
        </div>
        <div><h4>Trending now</h4><div class="sr-products">${trending.map((p) => resultCard(p)).join('')}</div></div>
      </div>`;
    return;
  }
  const found = searchProducts(q);
  const ql = q.toLowerCase();
  const cats = [...new Set(BLISS.products.flatMap((p) => [p.sub]))].filter((c) => c.toLowerCase().includes(ql) || ql.split(' ').some((t) => t.length > 2 && c.toLowerCase().includes(t.replace(/s$/, ''))));
  const brands = [...new Set(BLISS.products.map((p) => p.brand))].filter((b) => b.toLowerCase().includes(ql));
  const pages = SITE_PAGES.filter(([t, , k]) => (t + ' ' + k).toLowerCase().split(/\s+/).some((w) => w.startsWith(ql.split(' ')[0])));
  const suggestions = [...new Set(found.slice(0, 8).map((p) => p.sub))].slice(0, 4);
  searchResults.innerHTML = `
    <div class="sr-grid">
      <div class="sr-side">
        ${suggestions.length ? `<h4>Suggestions</h4><ul class="sr-links">${suggestions.map((s) => `<li><a data-sr href="search.html?q=${encodeURIComponent(s)}">${icon('search', 'sm')}<span>${hl(s, q)}</span></a></li>`).join('')}</ul>` : ''}
        ${cats.length ? `<h4>Categories</h4><ul class="sr-links">${cats.slice(0, 4).map((c) => `<li><a data-sr href="search.html?q=${encodeURIComponent(c)}"><span>${hl(c, q)}</span>${icon('arrow', 'sm')}</a></li>`).join('')}</ul>` : ''}
        ${brands.length ? `<h4>Brands</h4><ul class="sr-links">${brands.map((b) => `<li><a data-sr href="search.html?q=${encodeURIComponent(b)}"><span>${hl(b, q)}</span>${icon('arrow', 'sm')}</a></li>`).join('')}</ul>` : ''}
        ${pages.length ? `<h4>Pages</h4><ul class="sr-links">${pages.slice(0, 3).map(([t, h]) => `<li><a data-sr href="${h}">${icon('file', 'sm')}<span>${hl(t, q)}</span></a></li>`).join('')}</ul>` : ''}
      </div>
      <div>
        <h4>Products <span class="muted">(${found.length})</span></h4>
        ${found.length
          ? `<div class="sr-products">${found.slice(0, 8).map((p) => resultCard(p, q)).join('')}</div>
             <a class="btn ghost sr-all" data-sr href="search.html?q=${encodeURIComponent(q)}">View all ${found.length} results for “${esc(q)}” ${icon('arrow', 'sm')}</a>`
          : `<div class="sr-empty"><p>No products match “${esc(q)}”.</p><p class="muted">Try a brand, a product type or a finish, or <a href="contact.html">ask a specialist</a>. We can source almost anything.</p>
             <div class="chips">${POPULAR.slice(0, 4).map((t) => `<button type="button" data-query="${t}">${t}</button>`).join('')}</div></div>`}
      </div>
    </div>`;
}
function openSearch(prefill = '') {
  lastFocus = document.activeElement;
  document.body.classList.add('search-open');
  searchOv.setAttribute('aria-hidden', 'false');
  searchInput.value = prefill;
  renderSearch();
  setTimeout(() => searchInput.focus(), 60);
}
function closeSearch() {
  document.body.classList.remove('search-open');
  searchOv.setAttribute('aria-hidden', 'true');
  lastFocus?.focus?.();
}
window.openSearch = openSearch;
let sTimer;
searchInput.addEventListener('input', () => { clearTimeout(sTimer); sTimer = setTimeout(renderSearch, 90); });
searchOv.addEventListener('click', (e) => {
  const chip = e.target.closest('[data-query]');
  if (chip) { searchInput.value = chip.dataset.query; renderSearch(); searchInput.focus(); }
  if (e.target === searchOv || e.target.closest('[data-close-search]')) closeSearch();
});
searchOv.addEventListener('keydown', (e) => {
  const links = [...searchResults.querySelectorAll('[data-sr]')];
  const i = links.indexOf(document.activeElement);
  if (e.key === 'ArrowDown') { e.preventDefault(); (links[i + 1] || links[0])?.focus(); }
  if (e.key === 'ArrowUp') { e.preventDefault(); i <= 0 ? searchInput.focus() : links[i - 1].focus(); }
});
document.addEventListener('click', (e) => { if (e.target.closest('[data-open-search]')) openSearch(); });
document.addEventListener('keydown', (e) => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName);
  if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) { e.preventDefault(); openSearch(); }
  if (e.key === 'Escape') {
    if (document.body.classList.contains('search-open')) closeSearch();
    if (document.body.classList.contains('cart-open')) closeCart();
    document.querySelector('.mobile-nav')?.classList.remove('open');
  }
});

/* ---------- Mega menu (hover intent, keyboard, touch) ---------- */
(function megaMenu() {
  const items = [...document.querySelectorAll('.nav-item[data-mega]')];
  if (!items.length) return;
  let openTimer, closeTimer, current = null;
  function setOpen(it, on) {
    it.classList.toggle('open', on);
    it.querySelector('.nav-link').setAttribute('aria-expanded', on);
    document.body.classList.toggle('mega-open', !!document.querySelector('.nav-item.open'));
  }
  const open = (it) => {
    clearTimeout(closeTimer);
    if (current && current !== it) setOpen(current, false);
    setOpen(it, true); current = it;
  };
  const close = () => { if (current) setOpen(current, false); current = null; };
  items.forEach((it) => {
    it.addEventListener('mouseenter', () => { clearTimeout(closeTimer); clearTimeout(openTimer); openTimer = setTimeout(() => open(it), current ? 0 : 90); });
    it.addEventListener('mouseleave', () => { clearTimeout(openTimer); closeTimer = setTimeout(close, 180); });
    it.addEventListener('focusin', () => open(it));
    // tablets: first tap opens the menu, second tap follows the link
    it.querySelector('.nav-link').addEventListener('click', (e) => {
      if (matchMedia('(hover: none)').matches && !it.classList.contains('open')) { e.preventDefault(); open(it); }
    });
  });
  document.addEventListener('focusin', (e) => { if (current && !current.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && current) { const l = current.querySelector('.nav-link'); close(); l.focus(); } });
  document.addEventListener('click', (e) => { if (current && !e.target.closest('.nav-item')) close(); });
  const deep = new URLSearchParams(location.search).get('mega'); // demo: ?mega=Bath
  if (deep) { const it = items.find((x) => x.querySelector('.nav-link').textContent.trim() === deep); if (it) open(it); }
})();

/* ---------- Mobile nav ---------- */
const mnav = document.querySelector('.mobile-nav');
document.querySelector('.menu-toggle')?.addEventListener('click', () => mnav.classList.add('open'));
mnav?.addEventListener('click', (e) => {
  if (e.target.closest('.close') || e.target.classList.contains('scrim')) mnav.classList.remove('open');
});

/* ---------- Header shadow on scroll ---------- */
const hdr = document.querySelector('.site-header');
if (hdr) addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 40), { passive: true });

/* ---------- Carousels: [data-scroll="target-id"] buttons with data-dir ---------- */
document.querySelectorAll('[data-scroll]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const track = document.getElementById(btn.dataset.scroll);
    if (!track) return;
    const step = track.clientWidth * 0.8 * (btn.dataset.dir === 'prev' ? -1 : 1);
    track.scrollBy({ left: step, behavior: 'smooth' });
  });
});

/* ---------- FAQ: one open at a time per group ---------- */
document.querySelectorAll('.faq').forEach((group) => {
  group.querySelectorAll('details').forEach((d) => {
    d.addEventListener('toggle', () => {
      if (d.open) group.querySelectorAll('details').forEach((o) => o !== d && (o.open = false));
    });
  });
});

/* ---------- Hero slider (home): auto crossfade, swipe, cursor parallax, pause control ---------- */
(function heroSlider() {
  const hero = document.querySelector('.hero-slider');
  if (!hero) return;
  const slides = [...hero.querySelectorAll('.slide')];
  const toggle = hero.querySelector('.hs-toggle');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DURATION = 7000;
  let i = 0, timer, paused = reduce, hovering = false;
  hero.style.setProperty('--dur', DURATION + 'ms');

  function go(n) {
    slides[i].classList.remove('on'); slides[i].setAttribute('aria-hidden', 'true');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('on'); slides[i].removeAttribute('aria-hidden');
    schedule();
  }
  function schedule() {
    clearTimeout(timer);
    const hold = paused || hovering;
    hero.classList.toggle('paused', hold);
    if (!hold && slides.length > 1) timer = setTimeout(() => go(i + 1), DURATION);
  }
  toggle?.addEventListener('click', () => {
    paused = !paused;
    toggle.innerHTML = icon(paused ? 'play' : 'pause', 'sm');
    toggle.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    schedule();
  });
  if (reduce && toggle) { toggle.innerHTML = icon('play', 'sm'); toggle.setAttribute('aria-label', 'Play slideshow'); }
  // pause while the visitor is reading / focused inside the banner
  hero.addEventListener('focusin', () => { hovering = true; schedule(); });
  hero.addEventListener('focusout', () => { hovering = false; schedule(); });

  let x0 = null; // swipe
  hero.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') x0 = e.clientX; });
  hero.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
  });
  if (!reduce && matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      hero.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    hero.addEventListener('pointerleave', () => { hero.style.setProperty('--px', 0); hero.style.setProperty('--py', 0); });
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearTimeout(timer); else schedule(); });
  slides.forEach((s, k) => k && s.setAttribute('aria-hidden', 'true'));
  schedule();
})();

/* ---------- Reveal on scroll ---------- */
function observeReveal(root = document) {
  const els = root.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
}
observeReveal();

/* ---------- Shared product-card renderer ---------- */
window.stars = (r, count) => {
  const full = Math.round(r);
  return `<div class="stars" aria-label="${r} out of 5">${'★'.repeat(full)}${'☆'.repeat(5 - full)}${count != null ? `<em>(${count})</em>` : ''}</div>`;
};
window.productCard = (p) => `
<article class="p-card">
  <a class="ph" href="product.html"><img src="img/${p.img}.webp" alt="${esc(p.brand + ' ' + p.name)}" loading="lazy" decoding="async">${badgeOf(p)}</a>
  <button class="wish" data-wish="${p.id}" aria-label="Add to wishlist" aria-pressed="false">${icon('heart', 'sm')}</button>
  <div class="body">
    <span class="brand">${p.brand}</span>
    <a class="name" href="product.html">${p.name}</a>
    <div class="meta-row">${stars(p.rating, p.reviews)}<div class="swatches">${(p.colors || []).map((c) => `<i style="background:${c}"></i>`).join('')}</div></div>
    <div class="price">${priceOf(p)}</div>
    <div class="actions">
      <button class="btn sm" data-add="${p.id}">Add to cart</button>
      <button class="btn ghost sm" data-inquire="${p.id}">Inquire</button>
    </div>
  </div>
</article>`;

/* ---------- Demo forms: validate, then show a success state (no data is sent) ---------- */
document.querySelectorAll('form[data-demo-form]').forEach((f) => {
  f.noValidate = true;
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = [...f.elements].filter((el) => el.willValidate && !el.checkValidity());
    if (bad.length) { bad[0].focus(); bad[0].reportValidity(); return; }
    const btn = f.querySelector('[type=submit]');
    btn.classList.add('placing'); btn.innerHTML = '<span class="spinner"></span> Sending…';
    setTimeout(() => {
      const box = document.createElement('div');
      box.className = 'form-success';
      box.innerHTML = `<div class="tick">${icon('check')}</div><h3>${esc(f.dataset.successTitle || 'Thank you')}</h3><p>${esc(f.dataset.successText || 'A member of our team will be in touch within one business day.')}</p>`;
      f.replaceWith(box);
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 900);
  });
});

/* File drop zones */
document.querySelectorAll('.dropzone').forEach((dz) => {
  const input = dz.querySelector('input[type=file]');
  const list = document.getElementById(dz.dataset.list);
  const show = (files) => {
    if (!list) return;
    list.innerHTML = [...files].map((fl) => `<li><span>${esc(fl.name)}</span><span class="muted">${(fl.size / 1024 / 1024).toFixed(1)} MB</span></li>`).join('');
  };
  input.addEventListener('change', () => show(input.files));
  ['dragenter', 'dragover'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove('over'); }));
  dz.addEventListener('drop', (e) => { input.files = e.dataTransfer.files; show(input.files); });
});

/* Pre-select a topic from ?topic= (e.g. contact.html?topic=design) */
const topic = new URLSearchParams(location.search).get('topic');
if (topic) document.querySelector(`input[name=topic][value="${CSS.escape(topic)}"]`)?.click();

/* Table-of-contents highlight for policy pages */
const tocLinks = [...document.querySelectorAll('.toc nav a')];
if (tocLinks.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) tocLinks.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  tocLinks.forEach((a) => { const t = document.querySelector(a.getAttribute('href')); if (t) io.observe(t); });
}

/* Demo deep links: page.html#cart opens the cart drawer, ?search=term opens search */
if (location.hash === '#cart') openCart();
const autoSearch = new URLSearchParams(location.search).get('search');
if (autoSearch !== null) openSearch(autoSearch);


/* ---------- Cookie consent (PIPEDA / Quebec Law 25 opt-in · CCPA/CPRA opt-out + GPC) ----------
   Essential storage (cart, currency, checkout, this choice) runs without consent.
   Analytics and marketing tags must only load after opt-in. See applyConsent(). */
(function cookieConsent() {
  const KEY = 'bliss_consent';
  const gpc = navigator.globalPrivacyControl === true;
  let consent = BLISS.store.get(KEY, null);

  function applyConsent(c) {
    window.BLISS_CONSENT = c;
    // In WooCommerce: load GA4 when c.analytics, Meta/Google Ads pixels when c.marketing
    // (e.g. via Google Consent Mode v2 + CookieYes / Complianz).
    document.dispatchEvent(new CustomEvent('consent:change', { detail: c }));
  }
  function save(c) {
    consent = { necessary: true, analytics: !!c.analytics, marketing: !!c.marketing && !(gpc && c.marketing === 'default'), date: new Date().toISOString(), v: 1 };
    BLISS.store.set(KEY, consent);
    applyConsent(consent);
    hideBanner();
    toast('Your cookie preferences have been saved');
  }

  const banner = document.createElement('section');
  banner.className = 'cookie';
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = `
    <div class="cookie-text"><b>Your privacy matters to us.</b> We use essential cookies to run our store (your cart, currency and checkout).
      With your permission, we'd also like to use analytics and marketing cookies to improve our site and show you relevant ads.
      You can change your choice at any time. <a href="privacy.html#cookies">Cookie policy</a></div>
    <div class="cookie-actions">
      <button type="button" class="btn ghost sm" data-c="reject">Reject non-essential</button>
      <button type="button" class="btn ghost sm" data-c="custom">Customize</button>
      <button type="button" class="btn sm" data-c="accept">Accept all</button>
    </div>`;

  const modal = document.createElement('div');
  modal.className = 'consent-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'consentTitle');
  modal.hidden = true;
  const row = (key, title, text, locked) => `
    <div class="c-row">
      <div><h3>${title}</h3><p>${text}</p></div>
      ${locked ? '<span class="c-always">Always on</span>' : `<label class="switch"><input type="checkbox" data-cat="${key}"><span></span><em class="sr">${title}</em></label>`}
    </div>`;
  modal.innerHTML = `
    <div class="c-box">
      <header><h2 id="consentTitle">Cookie Preferences</h2><button type="button" class="c-x" data-c="close" aria-label="Close">${icon('close')}</button></header>
      <div class="c-body">
        <p class="muted">Choose which cookies we can use. Essential cookies are required for the store to work and can't be switched off.</p>
        ${gpc ? `<div class="co-notice">${icon('shield', 'sm')}<span>We detected a Global Privacy Control signal from your browser, so marketing cookies are off by default.</span></div>` : ''}
        ${row('necessary', 'Strictly necessary', 'Cart, checkout, security, your currency choice and remembering this preference.', true)}
        ${row('analytics', 'Analytics', 'Helps us understand how visitors use the site (e.g. Google Analytics) so we can improve it. Data is aggregated.')}
        ${row('marketing', 'Marketing', 'Lets us and our advertising partners (e.g. Google, Meta) show you relevant ads. Switching this off also opts you out of the “sale” or “sharing” of personal information under US state privacy laws.')}
      </div>
      <footer>
        <button type="button" class="btn ghost sm" data-c="reject">Reject all</button>
        <button type="button" class="btn ghost sm" data-c="save">Save choices</button>
        <button type="button" class="btn sm" data-c="accept">Accept all</button>
      </footer>
    </div>`;
  document.body.append(banner, modal);

  function showBanner() { banner.classList.add('show'); document.body.classList.add('has-cookie'); }
  function hideBanner() { banner.classList.remove('show'); document.body.classList.remove('has-cookie'); }
  function openModal(focusMarketing) {
    const c = consent || { analytics: false, marketing: false };
    modal.querySelector('[data-cat=analytics]').checked = !!c.analytics;
    modal.querySelector('[data-cat=marketing]').checked = !!c.marketing;
    modal.hidden = false;
    document.body.classList.add('consent-open');
    setTimeout(() => (focusMarketing ? modal.querySelector('[data-cat=marketing]') : modal.querySelector('.c-x')).focus(), 30);
  }
  function closeModal() { modal.hidden = true; document.body.classList.remove('consent-open'); }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-c]');
    if (b && (banner.contains(b) || modal.contains(b))) {
      const a = b.dataset.c;
      if (a === 'accept') { save({ analytics: true, marketing: gpc ? false : true }); closeModal(); }
      if (a === 'reject') { save({ analytics: false, marketing: false }); closeModal(); }
      if (a === 'custom') openModal();
      if (a === 'close') closeModal();
      if (a === 'save') { save({ analytics: modal.querySelector('[data-cat=analytics]').checked, marketing: modal.querySelector('[data-cat=marketing]').checked }); closeModal(); }
    }
    const pref = e.target.closest('[data-cookie-prefs]');
    if (pref) { e.preventDefault(); openModal(pref.dataset.cookiePrefs === 'optout'); }
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  if (consent) applyConsent(consent);
  else setTimeout(showBanner, 600);
})();


/* ---------- Prototype: colour theme switcher (Current / Green / Maroon) ---------- */
(function themePicker() {
  const THEMES = [['', 'Current', '#2b2118', '#a9834a'], ['green', 'Royal Green', '#0b4431', '#b08a4e'], ['maroon', 'Deep Maroon', '#3b0d16', '#b48a50'], ['night', 'Night Blue', '#0f1b33', '#b48a50'], ['classic', 'Classic Navy', '#212a79', '#72aacb']];
  if (document.documentElement.dataset.theme === 'navy') document.documentElement.dataset.theme = 'night';
  const cur = document.documentElement.dataset.theme || '';
  const box = document.createElement('div');
  box.className = 'theme-pick';
  box.setAttribute('role', 'radiogroup');
  box.setAttribute('aria-label', 'Colour theme');
  box.innerHTML = `<span>Colour</span>${THEMES.map(([k, n, a, b]) => `<button type="button" role="radio" aria-checked="${k === cur}" data-theme-set="${k}" title="${n}" aria-label="${n} theme" style="--a:${a};--b:${b}"></button>`).join('')}<em data-theme-name>${THEMES.find((t) => t[0] === cur)[1]}</em>`;
  document.body.append(box);
  box.addEventListener('click', (e) => {
    const b = e.target.closest('[data-theme-set]'); if (!b) return;
    const k = b.dataset.themeSet;
    if (k) document.documentElement.dataset.theme = k; else delete document.documentElement.dataset.theme;
    try { localStorage.setItem('bliss_theme', k); } catch {}
    box.querySelectorAll('[data-theme-set]').forEach((x) => x.setAttribute('aria-checked', x === b));
    box.querySelector('[data-theme-name]').textContent = b.title;
  });
})();


/* ---------- Make an Inquiry (every add-to-cart has one) ---------- */
(function inquiry() {
  const m = document.createElement('div');
  m.className = 'consent-modal inquiry-modal';
  m.setAttribute('role', 'dialog');
  m.setAttribute('aria-modal', 'true');
  m.setAttribute('aria-labelledby', 'inqTitle');
  m.hidden = true;
  document.body.append(m);
  let back;
  function open(p) {
    back = document.activeElement;
    m.innerHTML = `
      <div class="c-box">
        <header><h2 id="inqTitle">Make an Inquiry</h2><button type="button" class="c-x" data-inq-close aria-label="Close">${icon('close')}</button></header>
        <form class="c-body form" data-inq-form novalidate>
          ${p ? `<div class="inq-product"><img src="img/${p.img}.webp" alt=""><div><span class="brand">${p.brand}</span><b>${p.name}</b>${priceOf(p)}</div></div>` : ''}
          <p class="muted" style="font-size:13.5px;margin:0">Ask about availability, lead times, finishes or trade and project pricing. A product specialist replies within one business day.</p>
          <fieldset class="field" style="border:0;padding:0;margin:0"><span>I'd like to know about</span>
            <div class="pills">
              <label><input type="radio" name="about" value="availability" checked><span>Availability &amp; lead time</span></label>
              <label><input type="radio" name="about" value="pricing"><span>Trade / project pricing</span></label>
              <label><input type="radio" name="about" value="options"><span>Finishes &amp; options</span></label>
              <label><input type="radio" name="about" value="other"><span>Something else</span></label>
            </div>
          </fieldset>
          <div class="form-grid">
            <label class="field"><span>Name</span><input name="name" required autocomplete="name"></label>
            <label class="field"><span>Email</span><input type="email" name="email" required autocomplete="email"></label>
            <label class="field"><span>Phone <em>(optional)</em></span><input type="tel" name="phone" autocomplete="tel"></label>
            <label class="field"><span>Postal / ZIP code</span><input name="postal" required autocomplete="postal-code"></label>
            ${p ? `<label class="field"><span>Quantity</span><input name="qty" type="number" min="1" value="1" inputmode="numeric"></label>` : ''}
            <label class="field ${p ? '' : 'full'}"><span>I am a</span><select name="role"><option>Homeowner</option><option>Designer / Architect</option><option>Builder / Contractor</option><option>Other</option></select></label>
            <label class="field full"><span>Message</span><textarea name="msg" rows="3" placeholder="Anything we should know: finish, dimensions, project timeline…"></textarea></label>
          </div>
          <div><button class="btn" type="submit">Send Inquiry ${icon('arrow', 'sm')}</button></div>
        </form>
      </div>`;
    m.hidden = false;
    document.body.classList.add('consent-open');
    setTimeout(() => m.querySelector('input[name=name]')?.focus(), 40);
  }
  function close() { m.hidden = true; document.body.classList.remove('consent-open'); back?.focus?.(); }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-inquire]');
    if (b) { e.preventDefault(); open(BLISS.byId(b.dataset.inquire)); }
    if (e.target.closest('[data-inq-close]') || e.target === m) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !m.hidden) close(); });
  m.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    const bad = [...f.elements].filter((el) => el.willValidate && !el.checkValidity());
    if (bad.length) { bad[0].focus(); bad[0].reportValidity(); return; }
    const btn = f.querySelector('[type=submit]');
    btn.classList.add('placing'); btn.innerHTML = '<span class="spinner"></span> Sending…';
    setTimeout(() => {
      f.outerHTML = `<div class="c-body form-success"><div class="tick">${icon('check')}</div><h3>Inquiry sent</h3><p>Thank you. A Bliss product specialist will reply within one business day.</p><button class="btn ghost" type="button" data-inq-close>Continue Browsing</button></div>`;
    }, 800);
  });
  window.openInquiry = open;
})();
