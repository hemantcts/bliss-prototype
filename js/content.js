/* BLISS prototype: editorial content (Shop the Look + Journal).
   In WordPress: looks = a "Look" custom post type (room image + a list of related products, no image hotspots),
   posts = standard blog posts with a "Shop this article" related-products field. */

window.LOOKS = [
  {
    id: 'modern-retreat', title: 'The Modern Retreat', room: 'Bath', style: 'Modern Organic', img: 'hero-home',
    intro: 'A sculptural white tub, a brushed-gold floor-mount filler and a lake view. Calm, warm and uncluttered.',
    note: 'We kept the palette to warm white, natural stone and one metal. Brushed gold reads warmer than chrome against wood tones and ages beautifully. Pair it with matte white ceramics so the filler becomes the jewellery of the room.',
    finishes: [['Brushed Gold', '#c49a52'], ['Matte White', '#f1ede6'], ['Natural Oak', '#b8894a']],
    items: ['kohler-freestanding', 'rohl-tub-filler'],
    more: ['riobel-bath-faucet', 'riobel-momenti-shower', 'toto-neorest-nx'],
  },
  {
    id: 'dark-drama', title: 'Dark Drama Bath', room: 'Bath', style: 'Contemporary', img: 'pd-room',
    intro: 'A matte black Barcelona 2 tub against soft plaster, warm pendants and a floating oak vanity.',
    note: 'A black exterior tub needs soft, light walls around it so it reads as a sculpture rather than a hole in the room. Warm 2700K pendants and satin brass fittings stop the black from feeling cold.',
    finishes: [['Matte Black', '#26221f'], ['Satin Brass', '#b8894a'], ['Warm Plaster', '#e8ddd0']],
    items: ['va-barcelona-2', 'rohl-tub-filler', 'vc-pendant', 'riobel-vanity-oak', 'riobel-bath-faucet'],
    more: ['va-edge', 'toto-drake', 'duravit-luv'],
  },
  {
    id: 'contemporary-kitchen', title: 'The Contemporary Kitchen', room: 'Kitchen', style: 'Transitional', img: 'cat-kitchen',
    intro: 'A bright island kitchen built around a gooseneck brass faucet and a hard-working workstation sink.',
    note: 'On an island this long, a workstation sink with accessories lets two people prep side by side. We matched the faucet finish to the cabinet hardware and kept the counters quiet.',
    finishes: [['Warm Brass', '#c49a52'], ['Soft White', '#f4f0e8'], ['White Oak', '#c9a978']],
    items: ['riobel-kitchen-faucet', 'kohler-workstation-sink', 'vc-pendant'],
    more: ['fp-french-door', 'fp-gas-cooktop', 'ilve-majestic-36'],
  },
  {
    id: 'chefs-kitchen', title: "The Chef's Kitchen", room: 'Kitchen', style: 'Classic', img: 'cat-appliances',
    intro: 'A black and brass Italian range as the centrepiece, framed by marble and shaker cabinetry.',
    note: 'A statement range deserves room to breathe: at least 12" of counter either side, and a hood rated for its BTUs. The brass knobs set the metal for the rest of the kitchen.',
    finishes: [['Gloss Black', '#1f1c1a'], ['Brass Trim', '#c49a52'], ['Calacatta Marble', '#efe9df']],
    items: ['ilve-majestic-36'],
    more: ['ilve-nostalgie-40', 'fp-french-door', 'riobel-kitchen-faucet', 'kohler-workstation-sink'],
  },
  {
    id: 'lakeside-spa', title: 'Lakeside Spa', room: 'Bath', style: 'Modern Organic', img: 'story',
    intro: 'Floor-to-ceiling glass, a soaking tub centred on the view and nothing to distract from it.',
    note: 'When the view is the feature, choose a low-profile tub and keep fittings slim. A floor-mount filler lets the tub sit away from the wall, right where the light is best.',
    finishes: [['Matte White', '#f1ede6'], ['Polished Nickel', '#c9c6c0'], ['Linen', '#e8dcc8']],
    items: ['va-serenity'],
    more: ['rohl-tub-filler', 'va-barcelona', 'kohler-veil'],
  },
];

const para = (text) => `<p>${text}</p>`;
window.POSTS = [
  {
    slug: 'freestanding-tub-guide', cat: 'Buying Guide', title: 'How to Choose the Right Freestanding Bathtub', img: 'why-tub',
    date: '2026-09-18', read: 6, excerpt: 'Size, material, drain position and clearance: everything to check before you fall in love with a tub.',
    products: ['va-barcelona-2', 'kohler-veil', 'duravit-luv', 'rohl-tub-filler'],
    body: [
      para('A freestanding tub is usually the most photographed thing in a bathroom, and the one decision that\'s hardest to undo. Here\'s what our specialists check before recommending one.'),
      '<h2>1. Measure the room, not just the tub</h2>',
      para('Allow at least 6" of clearance on every side for cleaning, and more if the tub sits in front of a window. Tubs between 59" and 67" suit most primary bathrooms; compact models from 54" work in smaller rooms.'),
      '<h2>2. Choose the material</h2>',
      '<ul><li><strong>Acrylic:</strong> light, warm to the touch, the most affordable.</li><li><strong>Stone resin / cast stone:</strong> matte, solid feel with excellent heat retention.</li><li><strong>Cast iron:</strong> the most durable and traditional, but very heavy.</li></ul>',
      '<div class="callout"><svg class="icon" viewBox="0 0 24 24"><path d="M3 17 17 3l4 4L7 21Z"/></svg><p><strong>Check the floor.</strong> A filled cast stone tub can weigh over 1,000 lbs. Confirm your floor structure before ordering.</p></div>',
      '<h2>3. Plan the plumbing</h2>',
      para('Freestanding tubs need a floor drain in the right position and either a floor-mount or wall-mount filler. Floor-mount fillers let the tub float in the room; wall-mount fillers need the tub close to a wall.'),
      '<h2>4. Think about who bathes</h2>',
      para('Sit in the tub if you can. Our Markham showroom has display models for exactly this reason. Back angle, depth and length matter more than looks for a long soak.'),
    ],
  },
  {
    slug: 'choosing-your-finish', cat: 'Design', title: 'Brass, Nickel or Matte Black? Choosing Your Finish', img: 'brands-faucet',
    date: '2026-09-04', read: 4, excerpt: 'How to pick a finish that suits your space, and how to coordinate it across faucets, hardware and lighting.',
    products: ['riobel-kitchen-faucet', 'riobel-bath-faucet', 'rohl-tub-filler', 'vc-pendant'],
    body: [
      para('The right finish ties a room together. The wrong one fights with everything around it. Here\'s how we help clients decide.'),
      '<h2>Warm brass</h2>', para('Brushed or satin brass brings warmth to white, cream and wood-toned rooms. It\'s forgiving with fingerprints and pairs well with natural stone.'),
      '<h2>Polished nickel</h2>', para('Softer and warmer than chrome, polished nickel suits classic and transitional spaces. It works beautifully with marble.'),
      '<h2>Matte black</h2>', para('Crisp and graphic, matte black gives contrast against light walls and tile. Use it deliberately: two or three black elements read as a design choice, not an accident.'),
      '<h2>Mixing metals</h2>', para('Mixing is fine if it\'s intentional: choose one dominant finish for plumbing, and let lighting or hardware be the accent. Keep the undertones consistent (warm with warm, cool with cool).'),
    ],
  },
  {
    slug: 'statement-range-kitchen', cat: 'Kitchen', title: 'Planning a Kitchen Around a Statement Range', img: 'cat-appliances',
    date: '2026-08-21', read: 5, excerpt: 'Ventilation, clearances and layout tips for designing around an ILVE, SMEG or Café range.',
    products: ['ilve-majestic-36', 'ilve-nostalgie-40', 'fp-gas-cooktop', 'fp-french-door'],
    body: [
      para('A pro-style range becomes the focal point of a kitchen. Plan for it early and everything else falls into place.'),
      '<h2>Size and fuel</h2>', para('36" ranges suit most family kitchens; 40"–48" models give you a second oven and more burners. Confirm gas or dual-fuel availability and electrical requirements before you fall in love with a model.'),
      '<h2>Ventilation</h2>', para('Match the hood to the range\'s total BTU output and width. A hood 3"–6" wider than the range captures more smoke. Check make-up air requirements in your area.'),
      '<h2>Clearances</h2>', para('Leave at least 12" of counter on each side of the range for landing space, and keep it away from corners so oven doors open fully.'),
    ],
  },
  {
    slug: 'are-smart-toilets-worth-it', cat: 'Buying Guide', title: 'Are Smart Toilets Worth It?', img: 'ig-5',
    date: '2026-08-07', read: 5, excerpt: 'Heated seats, auto-flush and self-cleaning: what matters day to day, and what to plan for before installing.',
    products: ['toto-neorest-nx', 'toto-drake'],
    body: [
      para('Smart toilets have moved from novelty to a sought-after upgrade. Here\'s what they do well, and what to plan for.'),
      '<h2>The features that matter</h2>', '<ul><li>Integrated bidet with warm water</li><li>Heated seat and warm-air dryer</li><li>Automatic lid and flush</li><li>Self-cleaning wand and bowl coatings</li></ul>',
      '<h2>Plan the install</h2>', para('Most smart toilets need a GFCI outlet within reach, and some need a dedicated water supply. Tell your electrician and plumber early.'),
    ],
  },
  {
    slug: 'spa-bathroom-ideas', cat: 'Inspiration', title: '7 Ideas for a Spa-Like Bathroom', img: 'hero-collection',
    date: '2026-07-24', read: 4, excerpt: 'Soft light, natural materials and a tub with a view: small changes that make a big difference.',
    products: ['va-serenity', 'riobel-momenti-shower', 'rohl-tub-filler'],
    body: [
      para('A spa bathroom is less about luxury and more about calm. These are the ideas we return to most often.'),
      '<ol><li>Put the tub where the light is.</li><li>Choose one warm metal and repeat it.</li><li>Use a thermostatic shower for a consistent temperature.</li><li>Add a heated towel warmer.</li><li>Keep storage closed and counters clear.</li><li>Layer lighting: ambient, task and a dimmable accent.</li><li>Bring in plants and natural textures.</li></ol>',
    ],
  },
  {
    slug: 'receiving-a-freight-delivery', cat: 'Guides', title: 'How to Receive a Freight Delivery', img: 'pd-blend',
    date: '2026-07-10', read: 3, excerpt: 'Bathtubs, vanities and ranges arrive by freight. Here\'s how to inspect them and what to do if something\'s wrong.',
    products: ['va-barcelona-2', 'riobel-vanity-oak'],
    body: [
      para('Large items ship by freight to your curb or driveway. A few minutes of checking at delivery protects your purchase.'),
      '<h2>Before the truck arrives</h2>', para('Make sure someone is home for the 2–4 hour window, and that there\'s a clear path from the curb. Standard freight doesn\'t include bringing items inside.'),
      '<h2>At delivery</h2>', '<ul><li>Inspect the packaging before signing.</li><li>Write "DAMAGED" and describe any damage on the Bill of Lading.</li><li>Take photos while the driver is still there.</li><li>Report freight damage to us within 24 hours.</li></ul>',
      para('Read the full <a href="returns.html#freight">damage and returns policy</a>, or call us at 1-855-366-1001.'),
    ],
  },
];
window.POST_BY = (slug) => window.POSTS.find((p) => p.slug === slug);
window.fmtDate = (d) => new Date(d + 'T12:00:00').toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
