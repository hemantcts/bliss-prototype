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
    { id: 'toto-soiree', callForPrice: true, brand: 'TOTO', name: 'Soiree Freestanding Tub', cad: 7499, img: 'tub-11', cat: 'Bath', sub: 'Bathtubs', rating: 4, reviews: 5, colors: [W], weight: 'freight', material: 'Cast Iron', finish: 'Textured', shape: 'Oval', size: 'Small' },
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
    { id: 'ilve-majestic-36', callForPrice: true, brand: 'ILVE', name: 'Majestic II 36" Dual Fuel Range', cad: 9995, img: 'nn-range', cat: 'Appliances', sub: 'Ranges', rating: 4.9, reviews: 14, colors: [B, W, G], weight: 'freight', tag: 'New' },
    { id: 'ilve-nostalgie-40', was: 12490, brand: 'ILVE', name: 'Nostalgie II 40" Range', cad: 11490, img: 'pc-ovens', cat: 'Appliances', sub: 'Ranges', rating: 4.8, reviews: 9, colors: [B, W], weight: 'freight' },
    { id: 'fp-gas-cooktop', brand: 'SMEG', name: '30" Gas Cooktop', cad: 2199, img: 'pc-cooktops', cat: 'Appliances', sub: 'Cooktops', rating: 4.6, reviews: 19, colors: [B], weight: 'parcel' },
    { id: 'fp-french-door', callForPrice: true, brand: 'Café Appliances', name: '36" French Door Refrigerator', cad: 5799, img: 'pc-fridges', cat: 'Appliances', sub: 'Refrigeration', rating: 4.7, reviews: 22, colors: [N], weight: 'freight' },
    { id: 'blaze-grill', was: 4499, brand: 'Blaze', name: 'Premium LTE 32" Outdoor Grill', cad: 3999, img: 'nn-grill', cat: 'Outdoor', sub: 'Outdoor Grills', rating: 4.8, reviews: 16, colors: [N], weight: 'freight', tag: 'New' },
    { id: 'vc-chandelier', callForPrice: true, brand: 'Bliss Bath and Kitchen Collection', name: 'Calais Large Chandelier', cad: 4200, img: 'nn-chandelier', cat: 'Lighting', sub: 'Chandeliers', rating: 4.9, reviews: 7, colors: [BR, B], weight: 'parcel', tag: 'New' },
    { id: 'vc-pendant', brand: 'Bliss Bath and Kitchen Collection', name: 'Bellamy Brass Pendant', cad: 1180, img: 'pc-lighting', cat: 'Lighting', sub: 'Pendants', rating: 4.7, reviews: 12, colors: [BR, N], weight: 'parcel' },
  ];
  /* Colour names + the photo shown for each colour on product cards.
     In WooCommerce this is the image set on each product variation (Variations > Image). */
  const COLOR_NAMES = { [W]: 'White', [B]: 'Matte Black', [G]: 'Stone Grey', [M]: 'Mushroom', [BR]: 'Brushed Gold', [N]: 'Polished Nickel' };
  const fx = (img) => ({ [BR]: img, [B]: `${img}-black`, [N]: `${img}-nickel` });
  const VARIANT_IMG = {
    'va-barcelona-2': { [W]: 'pd-blend', [G]: 'tub-12' },
    'kohler-sunstruck': { [B]: 'tub-07' },
    'toto-neorest-tub': { [W]: 'tub-05' },
    'va-barcelona': { [B]: 'tub-02', [G]: 'tub-12' },
    'aquabrass-finch': { [B]: 'pd-room' },
    'kohler-veil': { [M]: 'tub-12' },
    'aquabrass-concerto': { [W]: 'tub-10' },
    'va-serenity': { [G]: 'tub-12' },
    'kohler-stately': { [B]: 'pd-main' },
    'blaze-outdoor-tub': { [W]: 'tub-09', [G]: 'tub-12' },
    'va-amalfi': { [G]: 'tub-12' },
    'va-napoli': { [B]: 'ym-4' },
    'va-edge': { [W]: 'ym-3' },
    'rohl-tub-filler': fx('tub-filler'),
    'riobel-momenti-shower': fx('pc-showers'),
    'riobel-bath-faucet': fx('pc-faucets'),
    'riobel-kitchen-faucet': fx('nn-faucet'),
    'vc-chandelier': fx('nn-chandelier'),
    'vc-pendant': fx('pc-lighting'),
  };
  // photo for a colour: the variation image if there is one, else the main photo for the first colour
  const variantImg = (p, c) => VARIANT_IMG[p.id]?.[c] || (c === (p.colors || [])[0] ? p.img : null);
  const colorName = (c) => COLOR_NAMES[c] || 'Colour';
  /* ---------- Product categories ----------
     Mirrors the WooCommerce product_cat tree. URLs follow the hierarchy, e.g.
     /bathroom/  ->  /bathroom/bathtubs/  ->  /bathroom/bathtubs/freestanding-bathtubs/
     [slug, name, parent slug, image, intro]. A category with children uses the landing layout;
     a category without children uses the product-listing (collection) layout. */
  const CAT_ROWS = [
    ['bathroom', 'Bathroom', '', 'cat-bath', 'Faucets, vanities, freestanding tubs, showers and smart toilets from the world’s leading bath brands, curated to create a calm, beautifully considered bathroom.'],
    ['bathtubs', 'Bathtubs', 'bathroom', 'look-retreat', 'Sculptural freestanding tubs, timeless clawfoots and space-saving designs in acrylic, stone resin and cast iron.'],
    ['freestanding-bathtubs', 'Freestanding Bathtubs', 'bathtubs', 'hero-collection', 'Make a statement with a freestanding tub. Explore our curated collection of premium designs that bring comfort, style and a spa-like feel to your bathroom.'],
    ['clawfoot-bathtubs', 'Clawfoot Bathtubs', 'bathtubs', 'hero-3', ''],
    ['corner-bathtubs', 'Corner Bathtubs', 'bathtubs', 'pd-room', ''],
    ['cast-iron-bathtubs', 'Cast Iron Bathtubs', 'bathtubs', 'pd-blend', ''],
    ['oval-bathtubs', 'Oval Bathtubs', 'bathtubs', 'why-tub', ''],
    ['japanese-bathtubs', 'Japanese Bathtubs', 'bathtubs', 'cat-bath', ''],
    ['non-standard-bathtubs', 'Non Standard Bathtubs', 'bathtubs', 'pd-main', ''],
    ['bathroom-faucets', 'Bathroom Faucets', 'bathroom', 'pc-faucets', ''],
    ['bathroom-vanities', 'Bathroom Vanities', 'bathroom', 'pc-vanities', ''],
    ['tub-fillers', 'Tub Fillers', 'bathroom', 'tub-filler', 'Floor-mounted and freestanding tub fillers that complete a freestanding bath with sculptural style.'],
    ['floor-mounted-tub-fillers', 'Floor Mounted Tub Fillers', 'tub-fillers', 'tub-filler', ''],
    ['freestanding-tub-fillers', 'Freestanding Tub Fillers', 'tub-fillers', 'blog-tub', ''],
    ['showers', 'Showers', 'bathroom', 'pc-showers', 'Shower systems, bases, doors and complete kits for a spa-worthy daily ritual.'],
    ['thermostatic-shower-systems', 'Thermostatic Shower Systems', 'showers', 'pc-showers', ''],
    ['shower-bases', 'Shower Bases', 'showers', 'pd-c3', ''],
    ['shower-doors', 'Shower Doors', 'showers', 'pd-c1', ''],
    ['sliding-shower-doors', 'Sliding Shower Doors', 'showers', 'pd-c2', ''],
    ['shower-kits', 'Shower Kits', 'showers', 'pc-showers-nickel', ''],
    ['toilets', 'Toilets', 'bathroom', 'pc-toilets', 'Smart, wall-hung and one-piece toilets engineered for comfort, hygiene and quiet efficiency.'],
    ['smart-toilets', 'Smart Toilets', 'toilets', 'nn-toilet', ''],
    ['wall-hung-toilets', 'Wall Hung Toilets', 'toilets', 'pc-toilets', ''],
    ['bathroom-fixtures', 'Bathroom Fixtures', 'bathroom', 'pc-faucets-nickel', ''],
    ['led-mirrors', 'LED Mirrors', 'bathroom', 'cat-home', ''],
    ['led-medicine-cabinets', 'LED Medicine Cabinets', 'bathroom', 'pd-c3', ''],
    ['towel-warmers', 'Towel Warmers', 'bathroom', 'look-retreat', ''],

    ['kitchen', 'Kitchen', '', 'cat-kitchen', 'Kitchen faucets, sinks and finishing details from leading brands, chosen to make the heart of your home as practical as it is beautiful.'],
    ['kitchen-faucets', 'Kitchen Faucets', 'kitchen', 'nn-faucet', 'Pull-down, single-hole, bridge and touchless faucets in brushed gold, nickel and matte black.'],
    ['single-hole-kitchen-faucets', 'Single Hole Kitchen Faucets', 'kitchen-faucets', 'nn-faucet', ''],
    ['pot-fillers', 'Pot Fillers', 'kitchen-faucets', 'nn-faucet-nickel', ''],
    ['touchless-kitchen-faucets', 'Touchless Kitchen Faucets', 'kitchen-faucets', 'nn-faucet-black', ''],
    ['bridge-kitchen-faucets', 'Bridge Kitchen Faucets', 'kitchen-faucets', 'blog-finish', ''],
    ['kitchen-sinks', 'Kitchen Sinks', 'kitchen', 'pc-sinks', 'Apron-front, undermount and workstation sinks in stainless steel, fireclay and granite composite.'],
    ['apron-kitchen-sinks', 'Apron Kitchen Sinks', 'kitchen-sinks', 'pc-sinks', ''],
    ['farmhouse-kitchen-sinks', 'Farmhouse Kitchen Sinks', 'kitchen-sinks', 'look-kitchen', ''],
    ['undermount-kitchen-sinks', 'Undermount Kitchen Sinks', 'kitchen-sinks', 'pc-sinks', ''],
    ['workstation-sinks', 'Workstation Sinks', 'kitchen-sinks', 'cat-kitchen', ''],
    ['granite-undermount-kitchen-sinks', 'Granite Undermount Kitchen Sinks', 'kitchen-sinks', 'pc-sinks', ''],
    ['soap-dispensers', 'Soap Dispensers', 'kitchen', 'hero-2', ''],

    ['appliances', 'Appliances', '', 'cat-appliances', 'Professional-style ranges, cooktops, refrigeration and ventilation from brands like ILVE, SMEG, Fulgor Milano and Café.'],
    ['ranges', 'Ranges', 'appliances', 'nn-range', ''],
    ['cooktops', 'Cooktops', 'appliances', 'pc-cooktops', ''],
    ['wall-ovens', 'Wall Ovens', 'appliances', 'pc-ovens', ''],
    ['refrigerators', 'Refrigerators', 'appliances', 'pc-fridges', 'French-door, column and wine refrigeration designed to keep fresh food and wine at its best.'],
    ['french-door-refrigerators', 'French Door Refrigerators', 'refrigerators', 'pc-fridges', ''],
    ['wine-storage', 'Wine Storage', 'refrigerators', 'blog-range', ''],
    ['ventilation', 'Ventilation', 'appliances', 'blog-range', 'Range hoods and downdraft systems that keep the kitchen fresh and quiet.'],
    ['range-hoods', 'Range Hoods', 'ventilation', 'blog-range', ''],
    ['downdraft-ventilation', 'Downdraft Ventilation', 'ventilation', 'mega-appliances', ''],

    ['lighting', 'Lighting', '', 'mega-lighting', 'Chandeliers, pendants, vanity lights and sconces in warm brass, polished nickel and matte black.'],
    ['chandeliers', 'Chandeliers', 'lighting', 'nn-chandelier', ''],
    ['pendants', 'Pendants', 'lighting', 'pc-lighting', ''],
    ['vanity-lights', 'Vanity Lights', 'lighting', 'pc-lighting-nickel', ''],
    ['wall-sconces', 'Wall Sconces', 'lighting', 'nn-chandelier-black', ''],

    ['furniture', 'Furniture', '', 'cat-home', 'Considered furniture and mirrors that complete the home. A new collection is arriving soon.'],
    ['living', 'Living', 'furniture', 'cat-home', ''],
    ['dining', 'Dining', 'furniture', 'ig-3', ''],
    ['bedroom', 'Bedroom', 'furniture', 'mega-lighting', ''],
    ['mirrors', 'Mirrors', 'furniture', 'mega-furniture', ''],

    ['outdoor', 'Outdoor', '', 'mega-outdoor', 'Grills, outdoor kitchens and pizza ovens from Blaze and Kamado Joe for entertaining under the open sky.'],
    ['outdoor-grills', 'Outdoor Grills', 'outdoor', 'nn-grill', 'Gas, built-in and kamado grills built for outdoor cooking at its best.'],
    ['built-in-grills', 'Built-in Grills', 'outdoor-grills', 'nn-grill', ''],
    ['smokers-kamado-grills', 'Smokers & Kamado Grills', 'outdoor-grills', 'mega-outdoor', ''],
    ['outdoor-kitchens', 'Outdoor Kitchens', 'outdoor', 'mega-outdoor', ''],
    ['pizza-ovens', 'Pizza Ovens', 'outdoor', 'nn-grill', ''],
    ['outdoor-refrigeration', 'Outdoor Refrigeration', 'outdoor', 'pc-fridges', ''],
    ['grill-accessories', 'Grill Accessories', 'outdoor', 'nn-grill', ''],
    ['outdoor-lighting', 'Outdoor Lighting', 'outdoor', 'pc-lighting', ''],
  ];
  const categories = CAT_ROWS.map(([slug, name, parent, img, intro]) => ({ slug, name, parent, img, intro }));
  const catBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
  const catByName = (name) => categories.find((c) => c.name.toLowerCase() === String(name).toLowerCase());
  const catChildren = (slug) => categories.filter((c) => c.parent === slug);
  const catTrail = (slug) => { const out = []; for (let c = catBySlug[slug]; c; c = catBySlug[c.parent]) out.unshift(c); return out; };
  const catUrl = (slug) => catTrail(slug).map((c) => c.slug).join('/') + '/';   // relative to the site root
  const catDescendants = (slug) => [slug, ...catChildren(slug).flatMap((c) => catDescendants(c.slug))];
  // where each product sits in the tree (product.sub -> deepest matching category)
  const SUB_TO_CAT = {
    Bathtubs: 'freestanding-bathtubs', 'Bathroom Faucets': 'bathroom-faucets', 'Freestanding Tub Fillers': 'freestanding-tub-fillers',
    'Shower Systems': 'thermostatic-shower-systems', 'Smart Toilets': 'smart-toilets', Toilets: 'toilets', Vanities: 'bathroom-vanities',
    'Kitchen Faucets': 'kitchen-faucets', 'Kitchen Sinks': 'kitchen-sinks', Ranges: 'ranges', Cooktops: 'cooktops', Refrigeration: 'refrigerators',
    'Outdoor Grills': 'outdoor-grills', Chandeliers: 'chandeliers', Pendants: 'pendants',
  };
  const catOf = (p) => SUB_TO_CAT[p.sub] || '';
  const catProducts = (slug) => { const set = new Set(catDescendants(slug)); return products.filter((p) => set.has(catOf(p))); };

  const byId = (id) => products.find((p) => p.id === id);
  // products without a listed price show "Price on request" and a Call for Pricing button (no add to cart)
  const hasPrice = (p) => !p.callForPrice;
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
    items: () => cart.map((l) => {
      const p = byId(l.id);
      if (!p) return null;
      const product = l.cad && l.cad !== p.cad ? { ...p, cad: l.cad, was: p.was ? p.was + (l.cad - p.cad) : undefined } : p;
      return { ...l, product };
    }).filter(Boolean),
    count: () => cart.reduce((n, l) => n + l.qty, 0),
    subtotal: () => cartApi.items().reduce((s, l) => s + l.product.cad * l.qty, 0),
    add(id, qty = 1, variant = '', cad = null) {
      const line = cart.find((l) => key(l.id, l.variant) === key(id, variant));
      line ? (line.qty = Math.min(line.qty + qty, 20)) : cart.push(cad ? { id, qty, variant, cad } : { id, qty, variant });
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

  /* ---------- Wishlist store (WooCommerce: YITH / TI Wishlist, saved to the account when logged in) ---------- */
  let wishIds = store.get('bliss_wishlist', []).filter((id) => byId(id));
  const saveWish = () => { store.set('bliss_wishlist', wishIds); document.dispatchEvent(new CustomEvent('wish:change')); };
  const wishApi = {
    ids: () => [...wishIds],
    items: () => wishIds.map(byId).filter(Boolean),
    count: () => wishIds.length,
    has: (id) => wishIds.includes(id),
    add(id) { if (byId(id) && !wishIds.includes(id)) { wishIds.unshift(id); saveWish(); } },
    remove(id) { wishIds = wishIds.filter((x) => x !== id); saveWish(); },
    toggle(id) { wishApi.has(id) ? wishApi.remove(id) : wishApi.add(id); return wishApi.has(id); },
    clear() { wishIds = []; saveWish(); },
  };

  return { products, brands, byId, hasPrice, variantImg, colorName, categories, catBySlug, catByName, catChildren, catTrail, catUrl, catDescendants, catOf, catProducts, onSale, pctOff, money, convert, setCurrency, refreshPrices, get currency() { return currency; }, cart: cartApi, wish: wishApi, store };
})();
