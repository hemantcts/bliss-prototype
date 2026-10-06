/* wishlist.html: page script (source). Built to js/pages/wishlist.min.js by `npm run build`. */
  /* A shared link looks like wishlist.html?items=id1,id2 — shown read-only until the visitor saves it */
  const sharedIds = (new URLSearchParams(location.search).get('items') || '').split(',').map((s) => s.trim()).filter((id) => BLISS.byId(id));
  const viewingShared = sharedIds.length > 0 && sharedIds.join() !== BLISS.wish.ids().join();
  const root = document.getElementById('wlRoot');
  const bar = document.getElementById('wlBar');

  const shipLine = (p) => p.weight === 'freight'
    ? `${icon('truck', 'sm')} Ships by freight`
    : `${icon('check', 'sm')} Free shipping eligible`;

  const wlCard = (p, shared) => `
    <article class="wl-card">
      <a class="ph" href="product.html"><img src="img/${p.img}.webp"${imgSet(p.img, '(max-width: 680px) 46vw, 22vw')} alt="${esc(p.brand + ' ' + p.name)}" loading="lazy" decoding="async">${badgeOf(p)}</a>
      ${shared ? '' : `<button class="wl-remove" data-wl-remove="${p.id}" aria-label="Remove ${esc(p.name)} from wishlist">${icon('close', 'sm')}</button>`}
      <div class="body">
        <span class="brand">${p.brand}</span>
        <a class="name" href="product.html">${p.name}</a>
        <div class="price">${priceOf(p)}</div>
        ${BLISS.onSale(p) ? `<span class="wl-drop">${icon('tag', 'sm')} On sale now: save ${price(p.was - p.cad)}</span>` : ''}
        <span class="wl-ship">${shipLine(p)}</span>
        <div class="actions">
          <button class="btn sm" data-wl-move="${p.id}">${shared ? 'Add to cart' : 'Move to cart'}</button>
          <button class="btn ghost sm" data-inquire="${p.id}">Inquire</button>
        </div>
      </div>
    </article>`;

  function render() {
    const shared = viewingShared;
    const items = shared ? sharedIds.map(BLISS.byId) : BLISS.wish.items();
    const n = items.length;
    const total = items.reduce((t, p) => t + p.cad, 0);
    document.getElementById('wlTitle').textContent = shared ? 'A Shared Wishlist' : 'My Wishlist';

    const sb = document.getElementById('sharedBar');
    sb.hidden = !shared;
    if (shared) sb.innerHTML = `${icon('users', 'sm')}<span>You're viewing a wishlist someone shared with you (${n} item${n === 1 ? '' : 's'}).</span>
      <button class="btn sm" id="saveShared">${icon('heart', 'sm')} Save All to My Wishlist</button>`;

    if (!n) {
      bar.innerHTML = '';
      root.innerHTML = `<div class="empty-state wl-empty">
        <span class="wl-heart">${icon('heart', 'lg')}</span>
        <h2>Your wishlist is empty</h2>
        <p>Tap the heart on any product to save it here. Handy for comparing finishes or sharing ideas with your designer.</p>
        <div class="hero-cta" style="justify-content:center;margin-top:20px"><a class="btn" href="collection.html">Shop Bathtubs</a><a class="btn ghost" href="shop-the-look.html">Shop the Look</a></div>
      </div>`;
      return;
    }
    bar.innerHTML = `
      <div><strong>${n} item${n === 1 ? '' : 's'}</strong><span class="muted"> · ${price(total)} total</span></div>
      <div class="wl-tools">
        <button class="btn sm" id="addAll">${icon('bag', 'sm')} Add All to Cart</button>
        ${shared ? '' : `<button class="btn ghost sm" id="shareWl">${icon('users', 'sm')} Share</button>
        <button class="btn ghost sm" data-inquire="" title="Ask about everything on your list">${icon('mail', 'sm')} Inquire About List</button>
        <button class="wl-clear" id="clearWl">Clear wishlist</button>`}
      </div>`;
    root.innerHTML = `<div class="wl-grid">${items.map((p) => wlCard(p, shared)).join('')}</div>`;
    renderRecs(items);
  }

  function renderRecs(items) {
    const have = new Set(items.map((p) => p.id));
    const cats = new Set(items.map((p) => p.sub));
    const recs = BLISS.products.filter((p) => !have.has(p.id)).sort((a, b) => cats.has(b.sub) - cats.has(a.sub) || b.rating - a.rating).slice(0, 8);
    document.getElementById('recRail').innerHTML = recs.map(productCard).join('');
  }

  document.addEventListener('click', (e) => {
    const rm = e.target.closest('[data-wl-remove]');
    if (rm) {
      const card = rm.closest('.wl-card'); card.classList.add('leaving');
      setTimeout(() => { BLISS.wish.remove(rm.dataset.wlRemove); toast('Removed from your wishlist'); }, 220);
    }
    const mv = e.target.closest('[data-wl-move]');
    if (mv) {
      BLISS.cart.add(mv.dataset.wlMove, 1);
      if (!viewingShared) BLISS.wish.remove(mv.dataset.wlMove);
      openCart();
    }
    if (e.target.closest('#addAll')) {
      const items = viewingShared ? sharedIds : BLISS.wish.ids();
      items.forEach((id) => BLISS.cart.add(id, 1));
      toast(`${items.length} items added to your cart`);
      openCart();
    }
    if (e.target.closest('#clearWl') && confirm('Remove all items from your wishlist?')) { BLISS.wish.clear(); toast('Wishlist cleared'); }
    if (e.target.closest('#shareWl')) {
      const url = `${location.origin}${location.pathname}?items=${BLISS.wish.ids().join(',')}`;
      const done = () => toast('Share link copied. Send it to your designer or partner');
      if (navigator.share) navigator.share({ title: 'My Bliss Bath and Kitchen wishlist', url }).catch(() => {});
      else navigator.clipboard?.writeText(url).then(done, () => prompt('Copy this link:', url));
    }
    if (e.target.closest('#saveShared')) {
      sharedIds.forEach((id) => BLISS.wish.add(id));
      toast('Saved to your wishlist');
      history.replaceState(null, '', 'wishlist.html');
      location.reload();
    }
  });
  document.addEventListener('wish:change', render);
  document.addEventListener('currency:change', render);
  render();
  if (!BLISS.wish.count() && !viewingShared) renderRecs([]);
