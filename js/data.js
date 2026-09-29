/* BLISS prototype — catalogue, currency and cart store.
   In WooCommerce these come from products, WOOCS/Aelia currency switcher and WC()->cart. */

window.BLISS = (() => {
  /* ---------- Catalogue (prices stored in CAD) ---------- */
  const W = '#fbfaf7', B = '#26221f', G = '#cfc6b8', M = '#a79c8c', BR = '#b8894a', N = '#c9c6c0';
  const products = [
    { id: 'va-barcelona-2', was: 7190, brand: 'Victoria + Albert', name: 'Barcelona 2 Freestanding Bathtub', cad: 6490, img: 'pd-main', cat: 'Bath', sub: 'Bathtubs', rating: 4.8, reviews: 12, colors: [B, W, G], weight: 'freight', tag: 'Best Seller' },
    { id: 'kohler-sunstruck', brand: 'Kohler', name: 'Sunstruck™ Freestanding Bathtub', cad: 5299, img: 'tub-01', cat: 'Bath', sub: 'Bathtubs', rating: 5, reviews: 12, colors: [W, B], weight: 'freight', material: 'Acrylic', finish: 'White', shape: 'Oval', size: 'Standard' },
    { id: 'toto-neorest-tub', brand: 'TOTO', name: 'Neorest Freestanding Tub', cad: 5799, img: 'tub-02', cat: 'Bath', sub: 'Bathtubs', rating: 4, reviews: 8, colors: [B, W], weight: 'freight', material: 'Stone Resin', finish: 'Matte', shape: 'Oval', size: 'Large' },
    { id: 'va-barcelona', was: 7299, brand: 'Victoria + Albert', name: 'Barcelona Freestanding Tub', cad: 6499, img: 'tub-03', cat: 'Bath', sub: 'Bathtubs', rating: 5, reviews: 15, colors: [W, B, G], weight: 'freight', material: 'Stone Resin', finish: 'White', shape: 'Oval', size: 'Large' },
    { id: 'duravit-luv', was: 4199, brand: 'Duravit', name: 'Luv Freestanding Bathtub', cad: 3699, img: 'tub-04', cat: 'Bath', sub: 'Bathtubs', rating: 4, reviews: 6, colors: [W], weight: 'freight', material: 'Acrylic', finish: 'White', shape: 'Asymmetrical', size: 'Standard' },
    { id: 'aquabrass-finch', brand: 'Aquabrass', name: 'Finch Freestanding Bathtub', cad: 4999, img: 'tub-05', cat: 'Bath', sub: 'Bathtubs', rating: 5, reviews: 11, colors: [W, B], weight: 'freight', material: 'Solid Surface', finish: 'Matte', shape: 'Rectangular', size: 'Standard' },
    { id: 'kohler-veil', was: 4999, brand: 'Kohler', name: 'Veil Freestanding Bathtub', cad: 4300, img: 'tub-06', cat: 'Bath', sub: 'Bathtubs', rating: 5, reviews: 10, colors: [W, M], weight: 'freight', material: 'Acrylic', finish: 'White', shape: 'Oval', size: 'Standard' },
    { id: 'aquabrass-concerto', was: 7699, brand: 'Aquabrass', name: 'Concerto Freestanding Tub', cad: 6899, img: 'tub-07', cat: 'Bath', sub: 'Bathtubs', rating: 4, reviews: 7, colors: [B, W], weight: 'freight', material: 'Cast Iron', finish: 'Two-Tone', shape: 'Oval', size: 'Large' },
    { id: 'va-serenity', brand: 'Victoria + Albert', name: 'Serenity Freestanding Tub', cad: 5999, img: 'tub-08', cat: 'Bath', sub: 'Bathtubs', rating: 4, reviews: 8, colors: [W, G], weight: 'freight', material: 'Stone Resin', finish: 'White', shape: 'Oval', size: 'Standard' },
    { id: 'duravit-cape-cod', brand: 'Duravit', name: 'Cape Cod Freestanding Bathtub', cad: 5499, img: 'tub-09', cat: 'Bath', sub: 'Bathtubs', rating: 4, reviews: 8, colors: [W], weight: 'freight', material: 'Solid Surface', finish: 'Matte', shape: 'Round', size: 'Standard' },
    { id: 'kohler-stately', brand: 'Kohler', name: 'Stately Freestanding Bathtub', cad: 4799, img: 'tub-10', cat: 'Bath', sub: 'Bathtubs', rating: 5, reviews: 6, colors: [W, B], weight: 'freight', material: 'Acrylic', finish: 'White', shape: 'Rectangular', size: 'Large' },
    { id: 'toto-soiree', brand: 'TOTO', name: 'Soiree Freestanding Tub', cad: 7499, img: 'tub-11', cat: 'Bath', sub: 'Bathtubs', rating: 4, reviews: 5, colors: [W], weight: 'freight', material: 'Cast Iron', finish: 'Textured', shape: 'Oval', size: 'Small' },
    { id: 'blaze-outdoor-tub', brand: 'Blaze', name: 'Outdoor Freestanding Tub', cad: 6299, img: 'tub-12', cat: 'Bath', sub: 'Bathtubs', rating: 4, reviews: 4, colors: [W, G], weight: 'freight', material: 'Acrylic', finish: 'White', shape: 'Oval', size: 'Small' },
    { id: 'va-amalfi', brand: 'Victoria + Albert', name: 'Amalfi Freestanding Bathtub', cad: 5890, img: 'ym-2', cat: 'Bath', sub: 'Bathtubs', rating: 5, reviews: 8, colors: [W, G], weight: 'freight' },
    { id: 'va-napoli', brand: 'Victoria + Albert', name: 'Napoli Freestanding Bathtub', cad: 5790, img: 'ym-3', cat: 'Bath', sub: 'Bathtubs', rating: 5, reviews: 6, colors: [W, B], weight: 'freight' },
    { id: 'va-edge', brand: 'Victoria + Albert', name: 'Edge Freestanding Bathtub', cad: 6290, img: 'ym-4', cat: 'Bath', sub: 'Bathtubs', rating: 5, reviews: 10, colors: [B, W], weight: 'freight' },
    { id: 'rohl-tub-filler', brand: 'Rohl', name: 'Floor-Mount Tub Filler, Brushed Gold', cad: 3290, img: 'tub-filler', cat: 'Bath', sub: 'Freestanding Tub Fillers', rating: 4.9, reviews: 18, colors: [BR, N, B], weight: 'parcel', tag: 'Designer Pick' },
    { id: 'kohler-freestanding', brand: 'Kohler', name: 'Freestanding Soaking Tub', cad: 4299, img: 'nn-tub', cat: 'Bath', sub: 'Bathtubs', rating: 5, reviews: 9, colors: [W], weight: 'freight', tag: 'New' },
    { id: 'toto-neorest-nx', brand: 'TOTO', name: 'Neorest NX Smart Toilet', cad: 12450, img: 'nn-toilet', cat: 'Bath', sub: 'Smart Toilets', rating: 5, reviews: 21, colors: [W], weight: 'parcel', tag: 'New' },
    { id: 'toto-drake', was: 1049, brand: 'TOTO', name: 'Drake II Two-Piece Toilet', cad: 899, img: 'pc-toilets', cat: 'Bath', sub: 'Toilets', rating: 4.6, reviews: 44, colors: [W], weight: 'parcel' },
    { id: 'riobel-vanity-oak', brand: 'Riobel', name: 'Heritage 36" Oak Vanity', cad: 3290, img: 'pc-vanities', cat: 'Bath', sub: 'Vanities', rating: 4.7, reviews: 13, colors: [BR], weight: 'freight' },
    { id: 'riobel-momenti-shower', brand: 'Riobel', name: 'Momenti Thermostatic Shower System', cad: 2890, img: 'pc-showers', cat: 'Bath', sub: 'Shower Systems', rating: 4.8, reviews: 17, colors: [BR, B, N], weight: 'parcel' },
    { id: 'riobel-bath-faucet', was: 790, brand: 'Riobel', name: 'Parabola Bathroom Faucet', cad: 690, img: 'pc-faucets', cat: 'Bath', sub: 'Bathroom Faucets', rating: 4.9, reviews: 31, colors: [BR, B, N], weight: 'parcel' },
    { id: 'riobel-kitchen-faucet', brand: 'Riobel', name: 'Azure Kitchen Faucet', cad: 1299, img: 'nn-faucet', cat: 'Kitchen', sub: 'Kitchen Faucets', rating: 4.8, reviews: 26, colors: [BR, B, N], weight: 'parcel', tag: 'New' },
    { id: 'kohler-workstation-sink', brand: 'Kohler', name: 'Prolific 33" Workstation Sink', cad: 1649, img: 'pc-sinks', cat: 'Kitchen', sub: 'Kitchen Sinks', rating: 4.7, reviews: 38, colors: [N], weight: 'parcel' },
    { id: 'ilve-majestic-36', brand: 'ILVE', name: 'Majestic II 36" Dual Fuel Range', cad: 9995, img: 'nn-range', cat: 'Appliances', sub: 'Ranges', rating: 4.9, reviews: 14, colors: [B, W, G], weight: 'freight', tag: 'New' },
    { id: 'ilve-nostalgie-40', was: 12490, brand: 'ILVE', name: 'Nostalgie II 40" Range', cad: 11490, img: 'pc-ovens', cat: 'Appliances', sub: 'Ranges', rating: 4.8, reviews: 9, colors: [B, W], weight: 'freight' },
    { id: 'fp-gas-cooktop', brand: 'SMEG', name: '30" Gas Cooktop', cad: 2199, img: 'pc-cooktops', cat: 'Appliances', sub: 'Cooktops', rating: 4.6, reviews: 19, colors: [B], weight: 'parcel' },
    { id: 'fp-french-door', brand: 'Café Appliances', name: '36" French Door Refrigerator', cad: 5799, img: 'pc-fridges', cat: 'Appliances', sub: 'Refrigeration', rating: 4.7, reviews: 22, colors: [N], weight: 'freight' },
    { id: 'blaze-grill', was: 4499, brand: 'Blaze', name: 'Premium LTE 32" Outdoor Grill', cad: 3999, img: 'nn-grill', cat: 'Appliances', sub: 'Outdoor', rating: 4.8, reviews: 16, colors: [N], weight: 'freight', tag: 'New' },
    { id: 'vc-chandelier', brand: 'Bliss Collection', name: 'Calais Large Chandelier', cad: 4200, img: 'nn-chandelier', cat: 'Lighting', sub: 'Chandeliers', rating: 4.9, reviews: 7, colors: [BR, B], weight: 'parcel', tag: 'New' },
    { id: 'vc-pendant', brand: 'Bliss Collection', name: 'Bellamy Brass Pendant', cad: 1180, img: 'pc-lighting', cat: 'Lighting', sub: 'Pendants', rating: 4.7, reviews: 12, colors: [BR, N], weight: 'parcel' },
  ];
  const byId = (id) => products.find((p) => p.id === id);
  const onSale = (p) => p.was && p.was > p.cad;
  const pctOff = (p) => (onSale(p) ? Math.round((1 - p.cad / p.was) * 100) : 0);

  /* ---------- Brands (from blissbathandkitchen.com/manufacturers) ----------
     slug = the live site's /brands/<slug>/ URL, keep it in WooCommerce for SEO.
     cats = best-guess categories for filtering; confirm with the client. */
  const brand = (name, slug, cats, extra = {}) => ({ name, slug, cats, ...extra });
  const brands = [
    brand('Aquabrass', 'aquabrass', ['Bath', 'Kitchen'], { featured: 'Canadian-designed faucets' }),
    brand('AquaDesign', 'aquadesign', ['Bath']),
    brand('Axent', 'axent', ['Bath'], { note: 'Smart toilets' }),
    brand('BainUltra', 'bainultra', ['Bath'], { featured: 'Therapeutic baths' }),
    brand('Blanco', 'blanco', ['Kitchen']),
    brand('Blaze', 'blaze', ['Outdoor']),
    brand('Bliss Bath', 'bliss-bath', ['Bath']),
    brand('Brizo', 'brizo', ['Bath', 'Kitchen'], { featured: 'Luxury fashion for the home' }),
    brand('Cabano', 'cabano', ['Bath']),
    brand('Café Appliances', 'cafe-appliances', ['Appliances']),
    brand('Caroma', 'caroma', ['Bath']),
    brand('Catalano', 'catalano', ['Bath']),
    brand('Cheviot Products', 'cheviot', ['Bath']),
    brand('Duravit', 'duravit', ['Bath'], { featured: 'German bathroom design' }),
    brand('Electric Mirror', 'electric-mirror', ['Bath']),
    brand('Fiora', 'fiora', ['Bath']),
    brand('Fleurco', 'fleurco', ['Bath']),
    brand('Foster', 'foster', ['Kitchen', 'Appliances']),
    brand('Franke', 'franke', ['Kitchen']),
    brand('GE', 'ge', ['Appliances']),
    brand('Graff', 'graff', ['Bath', 'Kitchen'], { featured: 'Sculptural luxury fixtures' }),
    brand('Grohe', 'grohe', ['Bath', 'Kitchen']),
    brand('Hansgrohe', 'hansgrohe', ['Bath', 'Kitchen']),
    brand('Icera', 'icera', ['Bath']),
    brand('ICO Canada', 'ico-canada', ['Bath']),
    brand('ILVE', 'ilve', ['Appliances'], { featured: 'Italian cooking excellence' }),
    brand('Infinity Drain', 'infinity-drain', ['Bath']),
    brand('Invisacook', 'invisacook', ['Appliances']),
    brand('Kamado Joe', 'kamado-joe', ['Outdoor']),
    brand('Kohler', 'kohler', ['Bath', 'Kitchen'], { featured: 'Iconic design & innovation' }),
    brand('KWC', 'kwc', ['Kitchen']),
    brand('Maax', 'maax', ['Bath']),
    brand('Madeli', 'madeli', ['Bath']),
    brand('Maier', 'aqua-design-2', ['Bath']),
    brand('Mr. Steam', 'mr-steam', ['Bath']),
    brand('Native Trails', 'native-trails', ['Bath', 'Kitchen']),
    brand('Perrin & Rowe', 'perrin-rowe', ['Bath', 'Kitchen']),
    brand('PierDeco Design', 'pierdeco-design', ['Bath']),
    brand('Produits Neptune', 'neptune', ['Bath']),
    brand('Recor', 'recor', ['Bath']),
    brand('Riobel', 'riobel', ['Bath', 'Kitchen'], { featured: 'Distinctive bath design' }),
    brand('Rohl', 'rohl', ['Bath', 'Kitchen'], { featured: 'Timeless European craft' }),
    brand('Royal Bath and Marble', 'royal-bath-and-marble', ['Bath']),
    brand('Samsung', 'samsung', ['Appliances']),
    brand('Shaws', 'shaws', ['Kitchen']),
    brand('Sidler', 'sidler', ['Bath']),
    brand('Simas', 'simas', ['Bath']),
    brand('Slik Portfolio', 'slik-portfolio', ['Bath']),
    brand('SMEG', 'smeg', ['Appliances'], { featured: 'Italian style & technology' }),
    brand('Sonia', 'sonia', ['Bath']),
    brand('Steamist', 'steamist', ['Bath']),
    brand('Stonetouch', 'stonetouch', ['Bath']),
    brand('StudioLux', 'studiolux', ['Bath']),
    brand('Tenzo', 'tenzo', ['Bath']),
    brand('TOTO', 'toto', ['Bath'], { featured: 'Innovation in every detail' }),
    brand('UNIK Stone', 'unik-stone', ['Bath']),
    brand('Victoria + Albert', 'victoria-albert', ['Bath'], { featured: 'Handmade volcanic limestone' }),
    brand('Waterstone', 'waterstone', ['Kitchen']),
    brand('Zitta', 'zitta', ['Bath']),
  ];

  /* ---------- Currency ---------- */
  const RATE = { CAD: 1, USD: 0.73 }; // demo rate, WooCommerce plugin will pull live rates
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } },
  };
  let currency = store.get('bliss_currency', 'CAD');
  const fmt = {
    CAD: new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }),
    USD: new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'USD' }),
    CAD0: new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }),
    USD0: new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
  };
  const convert = (cad) => Math.round(cad * RATE[currency] * 100) / 100;
  const money = (cad, whole = false) => fmt[currency + (whole ? '0' : '')].format(convert(cad));
  const setCurrency = (c) => {
    currency = c; store.set('bliss_currency', c);
    refreshPrices();
    document.dispatchEvent(new CustomEvent('currency:change', { detail: c }));
  };
  /* Any element with data-price="<CAD>" (optional data-whole) is re-rendered on switch */
  function refreshPrices(root = document) {
    root.querySelectorAll('[data-price]').forEach((el) => {
      el.textContent = money(+el.dataset.price, el.hasAttribute('data-whole'));
    });
    document.querySelectorAll('[data-currency-label]').forEach((el) => (el.textContent = currency));
    document.querySelectorAll('[data-currency-suffix]').forEach((el) => (el.textContent = currency === 'CAD' ? 'CAD' : ''));
  }

  /* ---------- Cart store ---------- */
  let cart = store.get('bliss_cart', []);
  const save = () => { store.set('bliss_cart', cart); document.dispatchEvent(new CustomEvent('cart:change')); };
  const key = (id, variant) => `${id}|${variant || ''}`;
  const cartApi = {
    items: () => cart.map((l) => ({ ...l, product: byId(l.id) })).filter((l) => l.product),
    count: () => cart.reduce((n, l) => n + l.qty, 0),
    subtotal: () => cartApi.items().reduce((s, l) => s + l.product.cad * l.qty, 0),
    add(id, qty = 1, variant = '') {
      const line = cart.find((l) => key(l.id, l.variant) === key(id, variant));
      line ? (line.qty = Math.min(line.qty + qty, 20)) : cart.push({ id, qty, variant });
      save();
    },
    setQty(id, variant, qty) {
      const line = cart.find((l) => key(l.id, l.variant) === key(id, variant));
      if (!line) return;
      if (qty <= 0) cart = cart.filter((l) => l !== line); else line.qty = Math.min(qty, 20);
      save();
    },
    remove(id, variant) { cart = cart.filter((l) => key(l.id, l.variant) !== key(id, variant)); save(); },
    clear() { cart = []; save(); },
    hasFreight: () => cartApi.items().some((l) => l.product.weight === 'freight'),
  };

  return { products, brands, byId, onSale, pctOff, money, convert, setCurrency, refreshPrices, get currency() { return currency; }, cart: cartApi, store };
})();
