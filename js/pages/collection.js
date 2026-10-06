/* Category product listing (templates/category.html). Built to js/pages/collection.min.js by `npm run build`.
   Lists every product in the category and its sub-categories (e.g. /bathroom/bathtubs/ shows all bathtubs).
   The category comes from <body data-cat>; filters are built from the products on the page. */
  const slug = document.body.dataset.cat || 'freestanding-bathtubs';
  const cat = BLISS.catBySlug[slug];
  let products = BLISS.catProducts(slug);
  const notice = document.getElementById('catNotice');
  if (!products.length) {
    // nothing listed yet: show the closest parent category's products instead
    const trail = BLISS.catTrail(slug).slice(0, -1).reverse();
    const near = trail.find((c) => BLISS.catProducts(c.slug).length);
    products = near ? BLISS.catProducts(near.slug) : [];
    notice.hidden = false;
    notice.innerHTML = `We’re adding ${esc(cat.name.toLowerCase())} to our online store. ${near ? `Meanwhile, explore more <a href="${BLISS.catUrl(near.slug)}">${esc(near.name.toLowerCase())}</a>, or ` : ''}<a href="contact.html">contact us</a> for availability and pricing.`;
  }
  const childOf = (p) => { const t = BLISS.catTrail(BLISS.catOf(p)); const i = t.findIndex((c) => c.slug === slug); return i >= 0 && t[i + 1] ? t[i + 1].name : ''; };
  const val = (p, key) => key === 'price' ? priceBand(p.cad) : key === 'sale' ? (BLISS.onSale(p) ? 'On Sale' : '') : key === 'category' ? childOf(p) : p[key];
  const priceBand = (p) => p < 2000 ? 'Under $2,000' : p < 4000 ? '$2,000 – $4,000' : p < 6000 ? '$4,000 – $6,000' : 'Over $6,000';
  const uniq = (key) => [...new Set(products.map((p) => p[key]).filter(Boolean))];
  const groups = [
    ['Category', 'category', BLISS.catChildren(slug).map((c) => c.name)],
    ['Offers', 'sale', ['On Sale']],
    ['Price Range (CAD)', 'price', ['Under $2,000', '$2,000 – $4,000', '$4,000 – $6,000', 'Over $6,000']],
    ['Brand', 'brand', uniq('brand').sort()],
    ['Material', 'material', ['Acrylic', 'Stone Resin', 'Cast Iron', 'Solid Surface']],
    ['Finish', 'finish', ['White', 'Matte', 'Textured', 'Two-Tone']],
    ['Shape', 'shape', ['Oval', 'Rectangular', 'Round', 'Asymmetrical']],
    ['Size', 'size', ['Small', 'Standard', 'Large']],
  ].map(([l, k, opts]) => [l, k, opts.filter((o) => products.some((p) => val(p, k) === o))]).filter(([, , opts]) => opts.length);
  const sizeLabel = { Small: 'Small (up to 54")', Standard: 'Standard (54" – 60")', Large: 'Large (60"+)' };
  const active = {};
  let sort = 'featured', page = 1, perPage = 12;

  document.getElementById('filterGroups').innerHTML = groups.map(([label, key, opts], gi) => `
    <div class="fgroup${gi > 3 ? ' closed' : ''}">
      <button type="button" aria-expanded="${gi <= 3}">${label} ${icon('up', 'sm')}</button>
      <div class="opts">${opts.map((o) => {
        const n = products.filter((p) => val(p, key) === o).length;
        return `<label><input type="checkbox" data-key="${key}" value="${o}"> ${key === 'size' ? sizeLabel[o] : o} (${n})</label>`;
      }).join('')}</div>
    </div>`).join('');

  function render(keepPage) {
    if (!keepPage) page = 1;
    let list = products.filter((p) => Object.entries(active).every(([k, set]) => !set.size || set.has(val(p, k))));
    if (sort === 'low') list = [...list].sort((a, b) => a.cad - b.cad);
    if (sort === 'high') list = [...list].sort((a, b) => b.cad - a.cad);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    const grid = document.getElementById('grid');
    const pages = Math.max(1, Math.ceil(list.length / perPage));
    page = Math.min(page, pages);
    const shown = list.slice((page - 1) * perPage, page * perPage);
    grid.innerHTML = shown.length
      ? shown.map(productCard).join('')
      : '<p style="grid-column:1/-1;color:var(--muted);padding:40px 0">No products match these filters. Try removing one.</p>';
    const filtered = Object.values(active).some((s) => s.size);
    const from = list.length ? (page - 1) * perPage + 1 : 0, to = Math.min(page * perPage, list.length);
    document.getElementById('count').textContent = list.length > perPage ? `Showing ${from}–${to} of ${list.length} ${filtered ? 'matching ' : ''}products` : `${list.length} ${filtered ? 'matching ' : ''}product${list.length === 1 ? '' : 's'}`;
    const pager = document.getElementById('pager');
    pager.hidden = pages < 2;
    pager.innerHTML = pages < 2 ? '' : `${page > 1 ? `<button type="button" data-page="${page - 1}" aria-label="Previous page">‹</button>` : ''}${Array.from({ length: pages }, (_, i) => `<button type="button" data-page="${i + 1}"${i + 1 === page ? ' class="on" aria-current="page"' : ''}>${i + 1}</button>`).join('')}${page < pages ? `<button type="button" data-page="${page + 1}" aria-label="Next page">›</button>` : ''}`;
    syncWish();
    const chips = Object.entries(active).flatMap(([k, set]) => [...set].map((v) => `<button data-chip="${k}|${v}">${v} ${icon('close', 'sm')}</button>`));
    document.getElementById('chips').innerHTML = chips.join('');
  }

  document.getElementById('filters').addEventListener('change', (e) => {
    const cb = e.target.closest('input[type=checkbox]');
    if (cb) {
      const set = (active[cb.dataset.key] ||= new Set());
      cb.checked ? set.add(cb.value) : set.delete(cb.value);
      render();
    }
  });
  document.getElementById('filters').addEventListener('click', (e) => {
    const head = e.target.closest('.fgroup > button');
    if (head) { const g = head.parentElement; g.classList.toggle('closed'); head.setAttribute('aria-expanded', !g.classList.contains('closed')); }
  });
  document.getElementById('chips').addEventListener('click', (e) => {
    const c = e.target.closest('[data-chip]'); if (!c) return;
    const [k, v] = c.dataset.chip.split('|');
    active[k].delete(v);
    document.querySelector(`#filters input[data-key="${k}"][value="${CSS.escape(v)}"]`).checked = false;
    render();
  });
  document.getElementById('clearFilters').addEventListener('click', () => {
    Object.keys(active).forEach((k) => delete active[k]);
    document.querySelectorAll('#filters input[type=checkbox]').forEach((i) => (i.checked = false));
    render();
  });
  // sort: sidebar (desktop) and sticky toolbar (phones) stay in sync
  const sortSide = document.getElementById('sortSide'), sortTop = document.getElementById('sortTop');
  const SORT_LABEL = { featured: 'Featured', low: 'Price: Low to High', high: 'Price: High to Low', rating: 'Top Rated' };
  const sortVal = document.getElementById('sortVal');
  const setSort = (v) => {
    sort = v; sortSide.value = sortTop.value = v;
    document.querySelectorAll('input[name=ssort]').forEach((r) => { r.checked = r.value === v; });
    const SHORT = { featured: '', low: 'Price: Low', high: 'Price: High', rating: 'Top Rated' };
    if (sortVal) sortVal.textContent = SHORT[v] ? ` · ${SHORT[v]}` : '';
    render();
  };
  [sortSide, sortTop].forEach((el) => el.addEventListener('change', (e) => setSort(e.target.value)));
  // phones: Sort button opens a bottom sheet of options
  const sheet = document.getElementById('sortSheet'), sortOpen = document.getElementById('sortOpen');
  if (sheet && sortOpen) {
    const openSheet = (on) => {
      sheet.hidden = !on; document.body.classList.toggle('sheet-open', on);
      sortOpen.setAttribute('aria-expanded', on);
      if (on) (sheet.querySelector('input:checked') || sheet.querySelector('input')).focus(); else sortOpen.focus();
    };
    sortOpen.addEventListener('click', () => openSheet(true));
    sheet.addEventListener('click', (e) => { if (e.target.closest('[data-ss-close]')) openSheet(false); });
    sheet.addEventListener('change', (e) => { if (e.target.name === 'ssort') { setSort(e.target.value); setTimeout(() => openSheet(false), 120); } });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) openSheet(false); });
  }
  // grid density: desktop 4 / 3 per row, phones 1 / 2 per row (remembered on this device)
  const gridEl = document.getElementById('grid');
  const setPressed = (sel, b) => document.querySelectorAll(sel).forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
  document.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => { setPressed('[data-view]', b); gridEl.classList.toggle('list', b.dataset.view === '3'); }));
  document.querySelectorAll('[data-mview]').forEach((b) => b.addEventListener('click', () => {
    setPressed('[data-mview]', b); gridEl.classList.toggle('one', b.dataset.mview === '1');
    try { localStorage.setItem('bliss_mview', b.dataset.mview); } catch {}
  }));
  try { if (localStorage.getItem('bliss_mview') === '1') document.querySelector('[data-mview="1"]').click(); } catch {}
  // active-filter count on the Filters button
  const fCount = document.getElementById('fCount');
  document.addEventListener('change', () => { const n = document.querySelectorAll('#filters input[type=checkbox]:checked').length; fCount.textContent = n; fCount.hidden = !n; });
  document.getElementById('clearFilters').addEventListener('click', () => { fCount.hidden = true; });
  // sticky toolbar: add a shadow once it is stuck
  const tb = document.getElementById('colToolbar');
  const sentinel = document.createElement('div'); tb.before(sentinel);
  new IntersectionObserver(([en]) => tb.classList.toggle('stuck', !en.isIntersecting && en.boundingClientRect.top < 0), { rootMargin: '-90px 0px 0px 0px' }).observe(sentinel);
  const filters = document.getElementById('filters');
  const scrim = document.createElement('div'); scrim.className = 'filters-scrim'; document.body.append(scrim);
  const openF = (on) => { filters.classList.toggle('open', on); scrim.classList.toggle('on', on); document.body.classList.toggle('filters-open', on); };
  document.getElementById('filterOpen').addEventListener('click', (e) => { e.stopPropagation(); openF(true); });
  document.getElementById('filterClose').addEventListener('click', () => openF(false));
  document.getElementById('filterApply').addEventListener('click', () => { openF(false); gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  scrim.addEventListener('click', () => openF(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && filters.classList.contains('open')) openF(false); });
  document.addEventListener('change', () => { document.getElementById('filterApply').textContent = `Show ${document.getElementById('grid').querySelectorAll('.p-card').length} results`; });

  // pagination + products per page
  document.getElementById('pager').addEventListener('click', (e) => {
    const b = e.target.closest('[data-page]'); if (!b) return;
    page = +b.dataset.page; render(true);
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  document.getElementById('perPage')?.addEventListener('change', (e) => { perPage = +e.target.value; render(); });
  render();
