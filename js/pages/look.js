/* look.html: page script (source). Built to js/pages/look.min.js by `npm run build`. */
  const look = LOOKS.find((l) => l.id === new URLSearchParams(location.search).get('look')) || LOOKS[0];
  const tagged = look.items.map((id) => ({ p: BLISS.byId(id) })).filter((s) => s.p);
  const total = tagged.reduce((t, s) => t + s.p.cad, 0);
  document.title = `${look.title} | Shop the Look | Bliss Bath and Kitchen`;
  document.getElementById('crumb').textContent = look.title;

  document.getElementById('look').innerHTML = `
    <div class="look-stage">
      <img src="img/${look.img}.webp" alt="${esc(look.title)}: ${esc(look.intro)}" fetchpriority="high">
    </div>
    <aside class="look-panel">
      <span class="post-meta"><span class="post-cat">${look.room}</span><span>${look.style}</span></span>
      <h1>${look.title}</h1>
      <p class="muted">${look.intro}</p>
      <h2 class="lp-h">In This Look <span class="muted">(${tagged.length})</span></h2>
      <ul class="look-items">${tagged.map((s) => `
        <li>
          <a href="product.html" class="li-img"><img src="img/${s.p.img}.webp"${imgSet(s.p.img, '120px')} alt="" loading="lazy">${BLISS.onSale(s.p) ? '<span class="badge sale">Sale</span>' : ''}</a>
          <span class="li-info"><span class="brand">${s.p.brand}</span><a class="name" href="product.html">${s.p.name}</a><span class="li-price">${priceOf(s.p)}</span></span>
          <span class="li-act"><button class="btn sm" data-add="${s.p.id}" aria-label="Add ${esc(s.p.name)} to cart">${icon('bag', 'sm')}</button><button class="btn ghost sm" data-inquire="${s.p.id}">Inquire</button></span>
        </li>`).join('')}</ul>
      <div class="look-total"><span>Total for ${tagged.length} items</span><strong>${price(total)}</strong></div>
      <button class="btn block" id="addAll">${icon('bag', 'sm')} Add All ${tagged.length} to Cart</button>
      <button class="btn ghost block" data-inquire="" id="askLook" style="margin-top:10px">${icon('mail', 'sm')} Ask About This Look</button>
      <p class="inq-note">Need a different size or finish? A specialist can adapt this look to your space.</p>
    </aside>`;

  document.getElementById('noteSec').innerHTML = `
    <div class="wrap split" style="align-items:start">
      <div class="reveal"><span class="eyebrow gold">Designer's Note</span><h2>Why this works</h2><p>${look.note}</p></div>
      <div class="reveal"><span class="eyebrow gold">Finishes in this look</span>
        <div class="finish-row">${look.finishes.map(([n, c]) => `<div><span style="background:${c}"></span><b>${n}</b></div>`).join('')}</div>
        <a class="link-arrow" href="contact.html?topic=design" style="margin-top:22px">Request finish samples ${icon('arrow', 'sm')}</a></div>
    </div>`;
  document.getElementById('moreRail').innerHTML = look.more.map(BLISS.byId).filter(Boolean).map(productCard).join('');
  document.getElementById('otherLooks').innerHTML = LOOKS.filter((l) => l.id !== look.id).slice(0, 3).map((l) => `
    <a class="look-card" href="look.html?look=${l.id}"><span class="lc-img"><img src="img/${l.img}.webp"${imgSet(l.img, '(max-width: 680px) 92vw, 33vw')} alt="${esc(l.title)}" loading="lazy"></span>
      <span class="lc-body"><span class="post-meta"><span class="post-cat">${l.room}</span><span>${l.style}</span></span><b>${l.title}</b><span class="link-arrow">Shop This Look ${icon('arrow', 'sm')}</span></span></a>`).join('');
  renderIcons(document.getElementById('look'));
  observeReveal();

  document.getElementById('addAll').addEventListener('click', () => {
    tagged.forEach((s) => BLISS.cart.add(s.p.id, 1));
    toast(`${tagged.length} items from ${look.title} added to your cart`);
    openCart();
  });
