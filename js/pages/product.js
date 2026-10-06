/* product.html: page script (source). Built to js/pages/product.min.js by `npm run build`. */
  // Products without a listed price: no add to cart; the shopper can call for pricing or send an inquiry.
  // In WooCommerce: a product with an empty price (or a 'call for price' flag). Prototype demo: product.html?pricing=call
  const CALL_FOR_PRICE = new URLSearchParams(location.search).get('pricing') === 'call';
  const CALL_HTML = '<span class="call-price">Price on request</span><small class="price-note">Call us or send an inquiry for pricing, availability and lead time.</small>';
  // Gallery
  const thumbs = [...document.querySelectorAll('#thumbs button')];
  const stage = document.getElementById('stageImg');
  let gi = 0;
  const show = (i) => {
    gi = (i + thumbs.length) % thumbs.length;
    stage.style.opacity = 0;
    setTimeout(() => {
      const src = thumbs[gi].dataset.src, name = src.slice(4, -5), v = IMG_VARIANTS[name];
      if (v) stage.srcset = v.slice(1).map((x) => `img/${name}-${x}.webp ${x}w`).concat(`${src} ${v[0]}w`).join(', '); else stage.removeAttribute('srcset');
      stage.src = src; stage.style.opacity = 1;
    }, 150);
    thumbs.forEach((t, k) => t.classList.toggle('on', k === gi));
  };
  thumbs.forEach((t, i) => t.addEventListener('click', () => show(i)));
  document.querySelectorAll('[data-gal]').forEach((b) => b.addEventListener('click', () => show(gi + +b.dataset.gal)));

  /* ---------- Product zoom ----------
     Desktop: hover the main photo to magnify where the cursor is.
     Everywhere: the zoom button (or a click on the photo) opens a full-screen viewer;
     tap/click to zoom in, drag to pan, arrows/swipe to change photo, Esc to close. */
  (function productZoom() {
    const box = document.querySelector('.stage');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    // hover magnifier
    box.addEventListener('mousemove', (e) => {
      if (!fine.matches || e.target.closest('button')) { stage.classList.remove('hz'); return; }
      if (stage.hasAttribute('srcset')) stage.removeAttribute('srcset'); // magnify the full-resolution photo
      const r = box.getBoundingClientRect();
      stage.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
      stage.classList.add('hz');
    });
    box.addEventListener('mouseleave', () => stage.classList.remove('hz'));

    // full-screen viewer
    const v = document.createElement('div');
    v.className = 'pz'; v.hidden = true;
    v.setAttribute('role', 'dialog'); v.setAttribute('aria-modal', 'true'); v.setAttribute('aria-label', 'Product photos');
    v.innerHTML = `<div class="pz-bar"><span class="pz-count"></span><span class="pz-tip">Tap the photo to zoom</span><button class="pz-x" aria-label="Close">${icon('close')}</button></div>
      <div class="pz-view"><img alt="" draggable="false"></div>
      <button class="pz-nav prev" aria-label="Previous photo">${icon('left')}</button><button class="pz-nav next" aria-label="Next photo">${icon('right')}</button>
      <div class="pz-thumbs">${thumbs.map((t, i) => `<button data-pz="${i}" aria-label="Photo ${i + 1}"><img src="${t.dataset.src}" alt=""></button>`).join('')}</div>`;
    document.body.append(v);
    const view = v.querySelector('.pz-view'), img = view.querySelector('img');
    let at = 0, z = false, tx = 0, ty = 0, drag = null, moved = false, lastFocus = null;
    const SCALE = 2.5;
    const apply = () => { img.style.transform = z ? `translate(${tx}px, ${ty}px) scale(${SCALE})` : ''; v.classList.toggle('zoomed', z); };
    const clamp = () => {
      const w = img.offsetWidth, h = img.offsetHeight, vw = view.clientWidth, vh = view.clientHeight;
      const mx = Math.max(0, (w * SCALE - vw) / 2), my = Math.max(0, (h * SCALE - vh) / 2);
      tx = Math.max(-mx, Math.min(mx, tx)); ty = Math.max(-my, Math.min(my, ty));
    };
    const go = (i) => {
      at = (i + thumbs.length) % thumbs.length; z = false; tx = ty = 0; apply();
      img.src = thumbs[at].dataset.src; img.alt = `Product photo ${at + 1} of ${thumbs.length}`;
      v.querySelector('.pz-count').textContent = `${at + 1} / ${thumbs.length}`;
      v.querySelectorAll('[data-pz]').forEach((b, k) => b.classList.toggle('on', k === at));
    };
    const open = () => { lastFocus = document.activeElement; stage.classList.remove('hz'); go(gi); v.hidden = false; document.body.classList.add('consent-open'); v.querySelector('.pz-x').focus(); };
    const close = () => { v.hidden = true; document.body.classList.remove('consent-open'); show(at); lastFocus?.focus(); };
    const zoomAt = (cx, cy) => {
      // zoom towards the tapped point
      const r = img.getBoundingClientRect();
      tx = (r.left + r.width / 2 - cx) * (SCALE - 1); ty = (r.top + r.height / 2 - cy) * (SCALE - 1);
      z = true; clamp(); apply();
    };
    box.querySelector('.zoom').addEventListener('click', open);
    stage.addEventListener('click', open);

    view.addEventListener('pointerdown', (e) => { if (e.target !== img) return; drag = { x: e.clientX, y: e.clientY, tx, ty }; moved = false; img.setPointerCapture(e.pointerId); });
    view.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 6) moved = true;
      if (z) { tx = drag.tx + dx; ty = drag.ty + dy; clamp(); apply(); }
    });
    view.addEventListener('pointerup', (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x; drag = null;
      if (!moved) { if (z) { z = false; tx = ty = 0; apply(); } else zoomAt(e.clientX, e.clientY); return; }
      if (!z && Math.abs(dx) > 50) go(at + (dx < 0 ? 1 : -1)); // swipe when not zoomed
    });
    view.addEventListener('pointercancel', () => { drag = null; });
    v.addEventListener('click', (e) => {
      if (e.target.closest('.pz-x') || e.target === view) return close();
      if (e.target.closest('.pz-nav.prev')) go(at - 1);
      if (e.target.closest('.pz-nav.next')) go(at + 1);
      const t = e.target.closest('[data-pz]'); if (t) go(+t.dataset.pz);
    });
    document.addEventListener('keydown', (e) => {
      if (v.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(at + 1);
      if (e.key === 'ArrowLeft') go(at - 1);
    });
    window.addEventListener('resize', () => { if (z) { clamp(); apply(); } });
  })();

  /* ---------- Variations (WooCommerce variable product) ----------
     Each option adds to the base (sale) price. Until every required option is chosen we show the
     price range and the button asks for the missing options, exactly like WooCommerce. */
  const BASE = 6490, BASE_WAS = 7190;
  const VARS = [
    { key: 'size', label: 'Bathtub Size', req: true, sku: (v) => v, opts: [['59', '59" (1500 mm)', -600], ['67', '67" (1700 mm)', 0], ['71', '71" (1800 mm)', 650]] },
    { key: 'colour', label: 'Bathtub Colour', req: true, sku: (v) => v.toUpperCase(), opts: [
      ['bw', 'Black / White (interior / exterior)', 0, '#1f1c1a'], ['gw', 'Gloss White', 0, '#fbfaf7'], ['mw', 'Matte White', 290, '#ece8e1'],
      ['ral', 'Custom RAL Colour (made to order)', 1150, 'conic-gradient(#8a3b2a, #c9a870, #3f5a47, #2b3c63, #8a3b2a)']] },
    { key: 'hole', label: 'Faucet Hole', req: true, sku: (v) => 'H' + v.toUpperCase().slice(0, 1), opts: [['none', 'No holes (floor-mount filler)', 0], ['1', '1 hole, deck-mount', 180], ['3', '3 holes, 8" centres', 260]] },
    { key: 'feetColor', label: 'Feet Color', req: true, opts: [['gold', 'Brushed Gold', 0], ['nickel', 'Polished Nickel', 0], ['black', 'Matte Black', 0], ['chrome', 'Polished Chrome', 0]] },
    { key: 'feet', label: 'Feet', req: true, sku: (v) => 'F' + v.slice(0, 1).toUpperCase(), opts: [['none', 'No feet (plinth base)', 0], ['claw', 'Ball & Claw', 420], ['imperial', 'Imperial', 380]] },
    { key: 'waste', label: 'Waste and Overflow', req: false, opts: [['', 'Not required', 0], ['chrome', 'Chrome click-clack', 120], ['gold', 'Brushed Gold', 240], ['black', 'Matte Black', 190], ['nickel', 'Polished Nickel', 220]] },
  ];
  const state = {};
  const grid = document.getElementById('varGrid');
  const adder = (d) => (d ? ` (${d > 0 ? '+' : '−'}${BLISS.money(Math.abs(d), true)})` : '');
  const feetless = () => state.feet === 'none';

  function renderSelects() {
    grid.innerHTML = VARS.map((v) => {
      const disabled = v.key === 'feetColor' && feetless();
      return `<label class="var-field${disabled ? ' is-na' : ''}" data-var="${v.key}">
        <span>${v.label} ${v.req ? '<span class="req" aria-hidden="true">*</span>' : '<em>(optional)</em>'}</span>
        <select name="${v.key}" ${v.req && !disabled ? 'required aria-required="true"' : ''} ${disabled ? 'disabled' : ''}>
          ${disabled ? '<option value="na">Not applicable (no feet)</option>' : `<option value="">${v.req ? 'Select an option…' : 'Not required'}</option>`}
          ${disabled ? '' : v.opts.filter(([val]) => val !== '').map(([val, txt, d]) => `<option value="${val}"${state[v.key] === val ? ' selected' : ''}>${esc(txt)}${adder(d)}</option>`).join('')}
        </select>
        ${v.swatch ? `<span class="var-swatches" role="radiogroup" aria-label="${v.label}">${v.opts.map(([val, txt, , c]) => `<button type="button" role="radio" aria-checked="${state[v.key] === val}" data-swatch="${val}" title="${esc(txt)}" aria-label="${esc(txt)}" style="background:${c}"></button>`).join('')}</span>` : ''}
        <small class="var-err">Please choose a ${v.label.toLowerCase()}.</small>
      </label>`;
    }).join('');
  }

  function selection() {
    const need = VARS.filter((v) => v.req && !(v.key === 'feetColor' && feetless()));
    const complete = need.every((v) => state[v.key]);
    const delta = VARS.reduce((t, v) => t + (v.opts.find(([val]) => val && val === state[v.key])?.[2] || 0), 0);
    const parts = VARS.map((v) => {
      if (v.key === 'feetColor' && feetless()) return null;
      const o = v.opts.find(([val]) => val && val === state[v.key]);
      return o ? `${v.label}: ${o[1]}` : null;
    }).filter(Boolean);
    const sku = ['VA-BAR2', ...VARS.filter((v) => v.sku && state[v.key]).map((v) => v.sku(state[v.key]))].join('-');
    return { complete, cad: BASE + delta, was: BASE_WAS + delta, label: parts.join(' · '), parts, sku, madeToOrder: state.colour === 'ral' };
  }

  function priceRange() {
    let lo = BASE, hi = BASE;
    VARS.forEach((v) => { const ds = v.opts.map((o) => o[2]); lo += Math.min(...ds, v.req ? Infinity : 0) === Infinity ? 0 : Math.min(...ds); hi += Math.max(...ds); });
    return [lo, hi];
  }

  function update() {
    const sel = selection();
    const priceEl = document.getElementById('pdpPrice');
    if (CALL_FOR_PRICE) {
      priceEl.innerHTML = CALL_HTML;
    } else if (sel.complete) {
      priceEl.innerHTML = `<span class="sale-price">${BLISS.money(sel.cad)}</span> <del class="was-price" aria-label="Regular price">${BLISS.money(sel.was)}</del> <small data-currency-suffix>${BLISS.currency === 'CAD' ? 'CAD' : ''}</small> <span class="badge sale inline">Sale −${Math.round((1 - sel.cad / sel.was) * 100)}%</span>`;
    } else {
      const [lo, hi] = priceRange();
      priceEl.innerHTML = `<span class="sale-price">${BLISS.money(lo)} – ${BLISS.money(hi)}</span> <small data-currency-suffix>${BLISS.currency === 'CAD' ? 'CAD' : ''}</small> <span class="badge sale inline">Sale</span><small class="price-note">Price depends on the options you choose</small>`;
    }
    document.getElementById('sku').textContent = sel.sku;
    document.getElementById('skuMeta').textContent = sel.sku;
    const add = document.getElementById('pdpAdd');
    add.setAttribute('aria-disabled', !sel.complete);
    add.classList.toggle('is-waiting', !sel.complete);
    document.getElementById('varClear').hidden = !Object.values(state).some(Boolean);
    const sum = document.getElementById('varSummary');
    sum.hidden = !sel.complete;
    if (sel.complete) {
      sum.innerHTML = `<div class="vs-head"><b>Your selection</b>${CALL_FOR_PRICE ? '' : `<span class="sale-price notranslate" translate="no">${BLISS.money(sel.cad)}</span>`}</div>
        <ul>${sel.parts.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        <div class="vs-stock ${sel.madeToOrder ? 'mto' : ''}">${icon(sel.madeToOrder ? 'clock' : 'check', 'sm')} ${sel.madeToOrder ? 'Made to order · ships in approximately 6–8 weeks' : 'In stock · typically ships in 2–5 business days'}</div>`;
    }
  }

  grid.addEventListener('change', (e) => {
    const f = e.target.closest('select'); if (!f) return;
    state[f.name] = f.value;
    f.closest('.var-field').classList.remove('missing');
    if (f.name === 'feet') { if (feetless()) delete state.feetColor; renderSelects(); }
    else if (f.name === 'colour') renderSelects();
    update();
  });
  grid.addEventListener('click', (e) => {
    const sw = e.target.closest('[data-swatch]'); if (!sw) return;
    state.colour = sw.dataset.swatch;
    renderSelects(); update();
  });
  document.getElementById('varClear').addEventListener('click', () => { Object.keys(state).forEach((k) => delete state[k]); renderSelects(); update(); });
  document.addEventListener('currency:change', () => { renderSelects(); update(); });

  window.PDP = {
    selection,
    flagMissing() {
      let first = null;
      VARS.forEach((v) => {
        if (!v.req || (v.key === 'feetColor' && feetless()) || state[v.key]) return;
        const f = grid.querySelector(`[data-var="${v.key}"]`);
        f.classList.add('missing'); first = first || f;
      });
      first?.querySelector('select').focus();
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
  };
  renderSelects(); update();

  /* ---------- Reviews with customer photos (WooCommerce: e.g. "Customer Reviews for WooCommerce" photo uploads) ---------- */
  const REVIEWS = [
    { n: 'Sarah M.', w: 'Toronto, ON', r: 5, d: '2026-09-02', t: 'The centrepiece of our renovation', b: 'Holds heat for ages and the matte black exterior looks incredible. Delivery team was careful and on time.', p: ['pd-room', 'pd-ig2'], h: 14 },
    { n: 'David K.', w: 'Vancouver, BC', r: 5, d: '2026-08-19', t: 'Worth every penny', b: 'Deep enough to fully soak. The Bliss Bath and Kitchen showroom team helped us pick the right filler too.', p: ['ym-1'], h: 9 },
    { n: 'Priya R.', w: 'Seattle, WA', r: 4, d: '2026-08-04', t: 'Beautiful, heavy, plan the install', b: 'Gorgeous tub. Make sure your floor is ready for the weight, but otherwise flawless.', p: [], h: 11 },
    { n: 'Marc L.', w: 'Montréal, QC', r: 5, d: '2026-07-21', t: 'Better than the photos', b: 'The finish is flawless and the shape is so comfortable. Went with the 67" and it fits two kids easily.', p: ['pd-ig3', 'pd-ig4', 'pd-c2'], h: 6 },
    { n: 'Hannah W.', w: 'Calgary, AB', r: 5, d: '2026-07-02', t: 'Spa at home', b: 'We use it every evening. Warm for a long time and easy to clean.', p: ['pd-ig5'], h: 4 },
    { n: 'Olivia B.', w: 'Boston, MA', r: 4, d: '2026-06-15', t: 'Lovely tub, long lead time on custom colour', b: 'We ordered a custom RAL colour, it took about 7 weeks but was exactly what we wanted.', p: ['pd-ig1'], h: 3 },
    { n: 'James P.', w: 'Ottawa, ON', r: 5, d: '2026-05-30', t: 'Great service', b: 'Freight delivery was booked in a 2-hour window and the driver was great.', p: [], h: 2 },
  ];
  const dist = { 5: 9, 4: 3, 3: 0, 2: 0, 1: 0 };
  const allPhotos = REVIEWS.flatMap((r, i) => r.p.map((img) => ({ img, i })));
  let rvFilter = 'all';
  const starsOf = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);
  const fmtD = (d) => new Date(d + 'T12:00:00').toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
  const imgSrc = (x) => (x.startsWith('blob:') ? x : `img/${x}.webp`);

  document.getElementById('rvBars').innerHTML = [5, 4, 3, 2, 1].map((n) => `
    <button type="button" class="rv-bar" data-rv="${n}" ${dist[n] ? '' : 'disabled'}><span>${n} ★</span><i><em style="width:${(dist[n] / 12) * 100}%"></em></i><span>${dist[n]}</span></button>`).join('');
  function renderStrip() {
    document.getElementById('rvPhotoCount').textContent = `(${allPhotos.length})`;
    document.getElementById('rvStrip').innerHTML = allPhotos.slice(0, 7).map((ph, k) => `
      <button type="button" class="rv-thumb" data-photo="${k}" aria-label="View customer photo ${k + 1}"><img src="${imgSrc(ph.img)}" alt="" loading="lazy">${k === 6 && allPhotos.length > 7 ? `<span>+${allPhotos.length - 7}</span>` : ''}</button>`).join('');
  }
  function renderList() {
    const withPhotos = REVIEWS.filter((r) => r.p.length).length;
    document.getElementById('rvFilter').innerHTML = [['all', `All reviews (${REVIEWS.length})`], ['photos', `With photos (${withPhotos})`], ['5', '5 stars'], ['4', '4 stars']]
      .map(([k, t]) => `<button type="button" aria-pressed="${rvFilter === k}" data-rvf="${k}">${t}</button>`).join('');
    const list = REVIEWS.filter((r) => rvFilter === 'all' || (rvFilter === 'photos' ? r.p.length : r.r === +rvFilter));
    document.getElementById('rvList').innerHTML = list.map((r) => {
      const i = REVIEWS.indexOf(r);
      return `<article class="review">
        <div class="rv-head"><div class="stars">${starsOf(r.r)}</div>${r.pending ? '<span class="status st-quote">Pending approval</span>' : ''}<time>${fmtD(r.d)}</time></div>
        <h4>${esc(r.t)}</h4><p>${esc(r.b)}</p>
        ${r.p.length ? `<div class="rv-imgs">${r.p.map((img, k) => `<button type="button" class="rv-thumb sm" data-rvimg="${i}:${k}" aria-label="View photo"><img src="${imgSrc(img)}" alt="Customer photo from ${esc(r.n)}" loading="lazy"></button>`).join('')}</div>` : ''}
        <div class="rv-foot"><small><b>${esc(r.n)}</b>${r.w ? ` · ${esc(r.w)}` : ''} · ${icon('check', 'sm')} Verified buyer</small>
          <button type="button" class="rv-helpful" data-helpful="${i}">Helpful (${r.h})</button></div>
      </article>`;
    }).join('') || '<p class="muted">No reviews match this filter yet.</p>';
  }

  /* lightbox */
  const lb = document.createElement('div');
  lb.className = 'lightbox'; lb.hidden = true; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Customer photo');
  document.body.append(lb);
  let lbList = [], lbAt = 0;
  function openLb(list, at) {
    lbList = list; lbAt = at;
    const it = list[at], r = REVIEWS[it.i];
    lb.innerHTML = `<button class="lb-x" aria-label="Close">${icon('close')}</button>
      <button class="lb-nav prev" aria-label="Previous photo">${icon('left')}</button>
      <figure><img src="${imgSrc(it.img)}" alt="Customer photo"><figcaption><span class="stars">${starsOf(r.r)}</span> <b>${esc(r.t)}</b><br><small>${esc(r.n)}${r.w ? ' · ' + esc(r.w) : ''} · ${at + 1} of ${list.length}</small></figcaption></figure>
      <button class="lb-nav next" aria-label="Next photo">${icon('right')}</button>`;
    lb.hidden = false; document.body.classList.add('consent-open');
    lb.querySelector('.lb-x').focus();
  }
  const closeLb = () => { lb.hidden = true; document.body.classList.remove('consent-open'); };
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target.closest('.lb-x')) return closeLb();
    if (e.target.closest('.prev')) openLb(lbList, (lbAt - 1 + lbList.length) % lbList.length);
    if (e.target.closest('.next')) openLb(lbList, (lbAt + 1) % lbList.length);
  });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') openLb(lbList, (lbAt + 1) % lbList.length);
    if (e.key === 'ArrowLeft') openLb(lbList, (lbAt - 1 + lbList.length) % lbList.length);
  });

  const panelEl = document.getElementById('tab-reviews');
  panelEl.addEventListener('click', (e) => {
    const ph = e.target.closest('[data-photo]'); if (ph) return openLb(allPhotos, +ph.dataset.photo);
    const ri = e.target.closest('[data-rvimg]');
    if (ri) { const [i, k] = ri.dataset.rvimg.split(':').map(Number); const list = REVIEWS[i].p.map((img) => ({ img, i })); return openLb(list, k); }
    const f = e.target.closest('[data-rvf]'); if (f) { rvFilter = f.dataset.rvf; renderList(); }
    const bar = e.target.closest('[data-rv]'); if (bar) { rvFilter = bar.dataset.rv; renderList(); }
    const h = e.target.closest('[data-helpful]');
    if (h && !h.disabled) { REVIEWS[h.dataset.helpful].h++; h.textContent = `Helpful (${REVIEWS[h.dataset.helpful].h})`; h.disabled = true; }
  });

  /* write a review + photo upload */
  const form = document.getElementById('rvForm');
  form.querySelector('.rate-stars').innerHTML = [5, 4, 3, 2, 1].map((n) => `<input type="radio" name="rating" id="r${n}" value="${n}" required><label for="r${n}" title="${n} star${n > 1 ? 's' : ''}">★</label>`).join('');
  let uploads = [];
  const drop = document.getElementById('rvDrop'), files = document.getElementById('rvFiles'), prev = document.getElementById('rvPreviews');
  function addFiles(list) {
    const ok = [...list].filter((f) => /^image\//.test(f.type) && f.size <= 10 * 1024 * 1024);
    if (ok.length < list.length) toast('Some files were skipped: images up to 10 MB only');
    uploads = uploads.concat(ok.map((f) => ({ f, url: URL.createObjectURL(f) }))).slice(0, 5);
    if (list.length + uploads.length > 5) toast('You can add up to 5 photos');
    prev.innerHTML = uploads.map((u, k) => `<span class="rv-prev"><img src="${u.url}" alt=""><button type="button" data-unup="${k}" aria-label="Remove photo">${icon('close', 'sm')}</button></span>`).join('');
  }
  files.addEventListener('change', () => { addFiles(files.files); files.value = ''; });
  ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', (e) => addFiles(e.dataTransfer.files));
  prev.addEventListener('click', (e) => { const b = e.target.closest('[data-unup]'); if (!b) return; URL.revokeObjectURL(uploads[b.dataset.unup].url); uploads.splice(+b.dataset.unup, 1); addFiles([]); });
  const openForm = () => { form.hidden = false; form.scrollIntoView({ behavior: 'smooth', block: 'start' }); setTimeout(() => form.querySelector('#r5').focus(), 400); };
  document.getElementById('writeReview').addEventListener('click', openForm);
  document.getElementById('rvCancel').addEventListener('click', () => { form.hidden = true; });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = [...form.elements].filter((el) => el.willValidate && !el.checkValidity());
    if (bad.length) { bad[0].focus(); bad[0].reportValidity(); return; }
    REVIEWS.unshift({ n: form.name.value.trim(), w: form.where.value.trim(), r: +form.rating.value, d: new Date().toISOString().slice(0, 10), t: form.title.value.trim(), b: form.body.value.trim(), p: uploads.map((u) => u.url), h: 0, pending: true });
    uploads.forEach((u) => allPhotos.unshift({ img: u.url, i: 0 }));
    allPhotos.forEach((ph) => { if (!ph.img.startsWith('blob:')) ph.i += 1; });
    uploads = []; prev.innerHTML = ''; form.reset(); form.hidden = true;
    rvFilter = 'all'; renderStrip(); renderList();
    document.getElementById('rvList').scrollIntoView({ behavior: 'smooth', block: 'start' });
    toast('Thanks! Your review will appear once approved');
  });
  // "4.8 (12 reviews)" link under the title opens the reviews tab
  document.querySelector('[data-open-reviews]').addEventListener('click', (e) => {
    e.preventDefault(); document.querySelector('[data-tab="reviews"]').click();
    document.getElementById('reviews').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  renderStrip(); renderList();

  if (CALL_FOR_PRICE) {
    document.body.classList.add('call-pricing');
    const row = document.querySelector('.buy-row');
    row.insertAdjacentHTML('afterbegin', `<a class="btn call-btn" id="pdpCall" href="tel:18553661001" aria-label="Call 1-855-366-1001 for pricing">${icon('phone', 'sm')} Call for Pricing</a>`);
    document.getElementById('sbBtn').textContent = 'Call for Pricing';
    document.querySelector('.inq-note').textContent = 'Prefer email? Send an inquiry and a specialist will reply with pricing within one business day.';
  }

  /* ---------- Phones: sticky add-to-cart bar + swipeable gallery ---------- */
  (function mobileBuy() {
    const bar = document.getElementById('stickyBuy'), btn = document.getElementById('sbBtn'), main = document.getElementById('pdpAdd');
    const sync = () => {
      if (CALL_FOR_PRICE) { document.getElementById('sbPrice').textContent = 'Price on request'; document.getElementById('sbWas').textContent = ''; return; }
      const sel = window.PDP.selection();
      // before options are chosen show the "from" price, like Bathify shows the starting price
      document.getElementById('sbPrice').textContent = BLISS.money(sel.complete ? sel.cad : 5890);
      document.getElementById('sbWas').textContent = BLISS.money(sel.complete ? sel.was : 6590);
    };
    // visible whenever the main Add to Cart button is off screen (from page load, like Bathify)
    new IntersectionObserver(([en]) => {
      const show = !en.isIntersecting;
      bar.classList.toggle('show', show); bar.setAttribute('aria-hidden', !show);
      document.body.classList.toggle('has-sticky-buy', show);
      if (show) sync();
    }).observe(CALL_FOR_PRICE ? document.getElementById('pdpCall') : main);
    document.getElementById('variations').addEventListener('change', sync);
    // Buy Now: add the chosen configuration and go straight to checkout; if options are missing, take the shopper to them
    btn.addEventListener('click', () => {
      if (CALL_FOR_PRICE) { location.href = 'tel:18553661001'; return; }
      const sel = window.PDP.selection();
      if (!sel.complete) { window.PDP.flagMissing(); toast('Choose your options to buy now'); return; }
      const qty = parseInt(document.querySelector('.buy .qty input')?.value, 10) || 1;
      BLISS.cart.add('va-barcelona-2', qty, sel.label, sel.cad);
      location.href = 'checkout.html';
    });
    // swipe the main product photo
    const stage = document.querySelector('.stage');
    let x0 = null;
    stage.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) document.querySelector(`[data-gal="${dx < 0 ? 1 : -1}"]`)?.click();
    });
  })();

  // Qty
  const q = document.querySelector('.qty input');
  document.querySelectorAll('[data-q]').forEach((b) => b.addEventListener('click', () => {
    q.value = Math.max(1, Math.min(10, (parseInt(q.value, 10) || 1) + +b.dataset.q));
  }));

  // Tabs
  document.querySelectorAll('[data-tab]').forEach((t) => t.addEventListener('click', () => {
    document.querySelectorAll('[data-tab]').forEach((x) => x.classList.toggle('on', x === t));
    document.querySelectorAll('.tab-panel').forEach((p) => p.classList.toggle('on', p.id === 'tab-' + t.dataset.tab));
  }));

  // Also like
  const also = ['va-barcelona', 'va-amalfi', 'va-napoli', 'va-edge', 'va-serenity'].map(BLISS.byId);
  document.getElementById('alsoRail').innerHTML = also.map(productCard).join('');
