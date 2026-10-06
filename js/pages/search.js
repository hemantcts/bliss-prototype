/* search.html: page script (source). Built to js/pages/search.min.js by `npm run build`. */
  const params = new URLSearchParams(location.search);
  const q = (params.get('q') || '').trim();
  let cat = params.get('cat') || 'All';
  let brand = 'All';
  let sort = 'rel';
  document.getElementById('q').value = q;

  const SPECIAL = {
    new: { title: 'New Arrivals', eyebrow: 'Just in', filter: (p) => p.tag === 'New' },
    best: { title: 'Best Sellers', eyebrow: 'Customer favourites', filter: (p) => p.tag === 'Best Seller' || p.rating >= 4.8 },
    sale: { title: 'Sale', eyebrow: 'Limited-time offers', filter: (p) => BLISS.onSale(p) },
  };
  const special = SPECIAL[q.toLowerCase()];
  const base = special ? BLISS.products.filter(special.filter) : q ? searchProducts(q) : BLISS.products;

  const title = document.getElementById('title');
  const eyebrow = document.getElementById('eyebrow');
  if (special) { title.textContent = special.title; eyebrow.textContent = special.eyebrow; }
  else if (q) { title.innerHTML = `Results for <em>“${esc(q)}”</em>`; eyebrow.textContent = 'Search'; }
  else if (cat !== 'All') { title.textContent = cat; eyebrow.textContent = 'Shop by space'; }
  document.getElementById('crumb').textContent = special ? special.title : q ? 'Search' : cat === 'All' ? 'Shop' : cat;
  document.title = `${special ? special.title : q ? 'Search: ' + q : cat === 'All' ? 'Shop' : cat} | Bliss Bath and Kitchen`;

  const CATS = ['All', 'Bath', 'Kitchen', 'Appliances', 'Outdoor', 'Lighting', 'Furniture'];
  function chips(el, values, current, counts) {
    el.innerHTML = values.map((v) => `<button type="button" aria-pressed="${v === current}" data-v="${esc(v)}">${esc(v)}${counts ? ` <span class="muted">${counts(v)}</span>` : ''}</button>`).join('');
  }
  function render() {
    const inCat = base.filter((p) => cat === 'All' || p.cat === cat);
    const brands = ['All', ...new Set(inCat.map((p) => p.brand))];
    if (!brands.includes(brand)) brand = 'All';
    chips(document.getElementById('catChips'), CATS, cat, (c) => c === 'All' ? base.length : base.filter((p) => p.cat === c).length);
    chips(document.getElementById('brandChips'), brands, brand);
    let list = inCat.filter((p) => brand === 'All' || p.brand === brand);
    if (sort === 'low') list = [...list].sort((a, b) => a.cad - b.cad);
    if (sort === 'high') list = [...list].sort((a, b) => b.cad - a.cad);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    document.getElementById('count').textContent = `${list.length} product${list.length === 1 ? '' : 's'}`;
    const grid = document.getElementById('grid');
    if (list.length) { grid.innerHTML = list.map(productCard).join(''); return; }
    const msg = cat === 'Furniture'
      ? ['Furniture is arriving soon', 'We\'re curating our furniture collection now. Our specialists can already source pieces for your project.']
      : q.toLowerCase() === 'sale'
      ? ['No sale items right now', 'Join the Bliss List below to be first to hear about exclusive offers.']
      : ['Nothing matches just yet', `We couldn't find products for “${esc(q || cat)}”. Try another term, or ask a specialist. We can source almost anything.`];
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><h2>${msg[0]}</h2><p>${msg[1]}</p>
      <div class="hero-cta" style="justify-content:center;margin-top:20px"><a class="btn" href="contact.html">Ask a Specialist</a><a class="btn ghost" href="search.html">Browse All</a></div></div>`;
  }
  document.getElementById('catChips').addEventListener('click', (e) => { const b = e.target.closest('[data-v]'); if (b) { cat = b.dataset.v; render(); } });
  document.getElementById('brandChips').addEventListener('click', (e) => { const b = e.target.closest('[data-v]'); if (b) { brand = b.dataset.v; render(); } });
  document.getElementById('sort').addEventListener('change', (e) => { sort = e.target.value; render(); });
  render();
