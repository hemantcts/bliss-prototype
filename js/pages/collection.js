/* Final-category product listing (templates/listing.html). Built to js/pages/collection.min.js by `npm run build`. */
  /* Product listing for a final category (e.g. /bathroom/bathtubs/freestanding-bathtubs/).
     The category comes from <body data-cat>; filters are built from the products in it. */
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
  const val = (p, key) => key === 'price' ? priceBand(p.cad) : key === 'sale' ? (BLISS.onSale(p) ? 'On Sale' : '') : p[key];
  const priceBand = (p) => p < 2000 ? 'Under $2,000' : p < 4000 ? '$2,000 – $4,000' : p < 6000 ? '$4,000 – $6,000' : 'Over $6,000';
  const uniq = (key) => [...new Set(products.map((p) => p[key]).filter(Boolean))];
  const groups = [
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
  let sort = 'featured';

  document.getElementById('filterGroups').innerHTML = groups.map(([label, key, opts], gi) => `
    <div class="fgroup${gi > 3 ? ' closed' : ''}">
      <button type="button" aria-expanded="${gi <= 3}">${label} ${icon('up', 'sm')}</button>
      <div class="opts">${opts.map((o) => {
        const n = products.filter((p) => val(p, key) === o).length;
        return `<label><input type="checkbox" data-key="${key}" value="${o}"> ${key === 'size' ? sizeLabel[o] : o} (${n})</label>`;
      }).join('')}</div>
    </div>`).join('');

  function render() {
    let list = products.filter((p) => Object.entries(active).every(([k, set]) => !set.size || set.has(val(p, k))));
    if (sort === 'low') list = [...list].sort((a, b) => a.cad - b.cad);
    if (sort === 'high') list = [...list].sort((a, b) => b.cad - a.cad);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    const grid = document.getElementById('grid');
    grid.innerHTML = list.length
      ? list.map(productCard).join('')
      : '<p style="grid-column:1/-1;color:var(--muted);padding:40px 0">No products match these filters. Try removing one.</p>';
    const filtered = Object.values(active).some((s) => s.size);
    // the freestanding page demonstrates pagination (42 in the full catalogue); other categories show their real count
    document.getElementById('count').textContent = filtered ? `${list.length} matching products` : slug === 'freestanding-bathtubs' ? `Showing ${list.length} of 42 products` : `${list.length} product${list.length === 1 ? '' : 's'}`;
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
  [sortSide, sortTop].forEach((el) => el.addEventListener('change', (e) => { sort = e.target.value; sortSide.value = sortTop.value = sort; render(); }));
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

  document.getElementById('pager').hidden = slug !== 'freestanding-bathtubs';
  render();
