/* index.html: page script (source). Built to js/pages/index.min.js by `npm run build`. */
  /* Shop by category: large tiles in a slider */
  const cats = [['pc-bathtubs', 'Bathtubs', 'bathroom/bathtubs/freestanding-bathtubs/', 22], ['pc-faucets', 'Bathroom Faucets', 'bathroom/bathroom-faucets/', 3],
    ['pc-vanities', 'Vanities', 'bathroom/bathroom-vanities/', 1], ['pc-showers', 'Shower Systems', 'bathroom/showers/', 1], ['pc-toilets', 'Smart Toilets', 'bathroom/toilets/smart-toilets/', 2],
    ['nn-faucet', 'Kitchen Faucets', 'kitchen/kitchen-faucets/', 1], ['pc-sinks', 'Kitchen Sinks', 'kitchen/kitchen-sinks/', 1], ['pc-ovens', 'Ranges & Ovens', 'appliances/', 4],
    ['nn-grill', 'Outdoor', 'outdoor/', 1], ['pc-lighting', 'Lighting', 'lighting/', 2], ['cat-home', 'Furniture', 'furniture/', 0]];
  document.getElementById('catRail').innerHTML = cats.map(([img, name, href]) => `
    <a class="cat-tile" href="${href}">
      <span class="ct-img"><img src="img/${img}.webp"${imgSet(img, '(max-width: 680px) 72vw, 25vw')} alt="${name}" loading="lazy" decoding="async"></span>
      <span class="ct-name">${name}</span><span class="link-arrow">Shop now ${icon('arrow', 'sm')}</span>
    </a>`).join('');

  /* Brands showcase: two gliding rows of large logo tiles (type styled after each brand's wordmark) */
  const WORD = {
    'toto': ['TOTO', 'w-toto'], 'kohler': ['KOHLER.', 'w-kohler'], 'victoria-albert': ['VICTORIA + ALBERT', 'w-va'], 'riobel': ['Riobel', 'w-riobel'],
    'duravit': ['DURAVIT', 'w-duravit'], 'ilve': ['ILVE', 'w-ilve'], 'smeg': ['SMEG', 'w-smeg'], 'brizo': ['BRIZO', 'w-brizo'], 'graff': ['GRAFF', 'w-graff'],
    'grohe': ['GROHE', 'w-grohe'], 'hansgrohe': ['hansgrohe', 'w-hansgrohe'], 'rohl': ['ROHL', 'w-rohl'], 'blanco': ['BLANCO', 'w-blanco'], 'franke': ['FRANKE', 'w-franke'],
    'aquabrass': ['AQUABRASS', 'w-aquabrass'], 'bainultra': ['BainUltra', 'w-bain'], 'native-trails': ['Native Trails', 'w-native'], 'perrin-rowe': ['Perrin & Rowe', 'w-perrin'],
    'cafe-appliances': ['Café', 'w-cafe'], 'samsung': ['SAMSUNG', 'w-samsung'], 'blaze': ['BLAZE', 'w-blaze'], 'kamado-joe': ['KAMADO JOE', 'w-kamado'],
    'waterstone': ['WATERSTONE', 'w-water'], 'kwc': ['KWC', 'w-kwc'], 'maax': ['MAAX', 'w-maax'], 'fleurco': ['fleurco', 'w-fleurco'],
    'electric-mirror': ['ELECTRIC MIRROR', 'w-em'], 'caroma': ['Caroma', 'w-caroma'], 'ge': ['GE', 'w-ge'], 'mr-steam': ['MrSteam', 'w-steam'],
  };
  const slugs = Object.keys(WORD);
  const tile = (slug, hidden) => {
    const b = BLISS.brands.find((x) => x.slug === slug);
    const [txt, cls] = WORD[slug];
    return `<a class="brand-logo ${cls}" href="brand.html?b=${slug}" ${hidden ? 'tabindex="-1" aria-hidden="true"' : ''} title="${esc(b ? b.name : txt)}"><span>${esc(txt)}</span></a>`;
  };
  const row = (el, list) => {
    // duplicate the set so the glide loops seamlessly; the copy is hidden from assistive tech
    el.innerHTML = `<div class="marquee-track">${list.map((x) => tile(x)).join('')}${list.map((x) => tile(x, true)).join('')}</div>`;
  };
  row(document.getElementById('brandRowA'), slugs.slice(0, 15));
  row(document.getElementById('brandRowB'), slugs.slice(15));

  /* New & Noteworthy: 3 large products per view */
  const NN = {
    new: ['kohler-freestanding', 'riobel-kitchen-faucet', 'toto-neorest-nx', 'vc-chandelier', 'ilve-majestic-36', 'blaze-grill', 'va-barcelona-2', 'rohl-tub-filler'],
    best: ['va-barcelona-2', 'riobel-bath-faucet', 'kohler-workstation-sink', 'toto-drake', 'fp-french-door', 'riobel-momenti-shower', 'kohler-veil'],
    picks: ['aquabrass-concerto', 'vc-pendant', 'ilve-nostalgie-40', 'riobel-vanity-oak', 'va-edge', 'fp-gas-cooktop', 'duravit-luv'],
  };
  const NN_ALL = { new: ['search.html?q=new', 'View All New Arrivals'], best: ['search.html?q=best', 'View All Best Sellers'], picks: ['search.html', 'View All Products'] };
  const rail = document.getElementById('nnRail');
  function renderNN(key, resetScroll) {
    rail.innerHTML = NN[key].map(BLISS.byId).map((p) => `
      <article class="nn-card">
        <a class="ph" href="product.html"><img src="img/${p.img}.webp"${imgSet(p.img, '(max-width: 680px) 84vw, 33vw')} alt="${esc(p.brand + ' ' + p.name)}" loading="lazy" decoding="async">${badgeOf(p)}</a>
        <button class="wish" data-wish="${p.id}" aria-label="Add to wishlist" aria-pressed="false">${icon('heart', 'sm')}</button>
        <div class="nn-body">
          <span class="brand">${p.brand}</span>
          <a class="name" href="product.html">${p.name}</a>
          <div class="price">${priceOf(p)}</div>
          <div class="nn-actions"><button class="btn sm" data-add="${p.id}">Add to cart</button><button class="btn ghost sm" data-inquire="${p.id}">Inquire</button></div>
        </div>
      </article>`).join('');
    if (resetScroll) rail.scrollLeft = 0; // only when switching tabs (avoids a forced layout on load)
    const [href, label] = NN_ALL[key]; ['nnAll', 'nnAllM'].forEach((id) => { const el = document.getElementById(id); el.href = href; el.textContent = label; });
  }
  document.querySelectorAll('[data-nn]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('[data-nn]').forEach((x) => x.setAttribute('aria-selected', x === b));
    rail.classList.add('swap'); setTimeout(() => { renderNN(b.dataset.nn, true); rail.classList.remove('swap'); }, 180);
  }));
  renderNN('new');
