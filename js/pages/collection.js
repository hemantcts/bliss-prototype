/* collection.html: page script (source). Built to js/pages/collection.min.js by `npm run build`. */
  const products = BLISS.products.filter((p) => p.material); // the 12 freestanding tubs
  const priceBand = (p) => p < 2000 ? 'Under $2,000' : p < 4000 ? '$2,000 – $4,000' : p < 6000 ? '$4,000 – $6,000' : 'Over $6,000';
  const groups = [
    ['Offers', 'sale', ['On Sale']],
    ['Price Range (CAD)', 'price', ['Under $2,000', '$2,000 – $4,000', '$4,000 – $6,000', 'Over $6,000']],
    ['Brand', 'brand', ['Kohler', 'TOTO', 'Victoria + Albert', 'Duravit', 'Aquabrass', 'Blaze']],
    ['Material', 'material', ['Acrylic', 'Stone Resin', 'Cast Iron', 'Solid Surface']],
    ['Finish', 'finish', ['White', 'Matte', 'Textured', 'Two-Tone']],
    ['Shape', 'shape', ['Oval', 'Rectangular', 'Round', 'Asymmetrical']],
    ['Size', 'size', ['Small', 'Standard', 'Large']],
  ];
  const sizeLabel = { Small: 'Small (up to 54")', Standard: 'Standard (54" – 60")', Large: 'Large (60"+)' };
  const val = (p, key) => key === 'price' ? priceBand(p.cad) : key === 'sale' ? (BLISS.onSale(p) ? 'On Sale' : '') : p[key];
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
      : '<p style="grid-column:1/-1;color:var(--muted);padding:40px 0">No tubs match these filters. Try removing one.</p>';
    const filtered = Object.values(active).some((s) => s.size);
    document.getElementById('count').textContent = filtered ? `${list.length} matching products` : 'Showing 12 of 42 products';
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

  render();
