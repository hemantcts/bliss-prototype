/* cart.html: page script (source). Built to js/pages/cart.min.js by `npm run build`. */
  const root = document.getElementById('cartRoot');
  const PROMOS = { BLISS10: 0.10, TRADE15: 0.15 };
  let promo = BLISS.store.get('bliss_promo', null);

  function render() {
    const items = BLISS.cart.items();
    if (!items.length) {
      root.innerHTML = `<div class="empty-state" style="margin-bottom:60px">${icon('bag', 'lg')}<h2>Your cart is empty</h2><p>Discover pieces curated for beautiful living.</p>
        <div class="hero-cta" style="justify-content:center;margin-top:20px"><a class="btn" href="bathroom/bathtubs/freestanding-bathtubs/">Shop Bathtubs</a><a class="btn ghost" href="search.html?q=new">New Arrivals</a></div></div>`;
      return;
    }
    const sub = BLISS.cart.subtotal();
    const disc = promo && PROMOS[promo] ? Math.round(sub * PROMOS[promo] * 100) / 100 : 0;
    root.innerHTML = `<div class="cart-page">
      <div>
        <table class="cart-table">
          <thead><tr><th>Product</th><th class="unit">Price</th><th>Quantity</th><th>Total</th></tr></thead>
          <tbody>${items.map((l) => `<tr>
            <td><div class="prod"><a href="product.html"><img loading="lazy" decoding="async" src="img/${l.product.img}.webp"${imgSet(l.product.img, '96px')} alt=""></a><div>
              <span class="brand">${l.product.brand}</span><a class="name" href="product.html">${l.product.name}</a>
              ${l.variant ? `<span class="variant">${esc(l.variant)}</span>` : ''}
              ${l.product.weight === 'freight' ? '' : `<span class="ship">${icon('check', 'sm')} Free standard shipping eligible</span>`}
            </div></div></td>
            <td class="unit">${priceOf(l.product)}</td>
            <td><div style="display:flex;gap:14px;align-items:center">${qtyControl(l)}<button class="line-remove" data-remove="${l.id}|${esc(l.variant)}" aria-label="Remove ${esc(l.product.name)}">${icon('trash', 'sm')}</button></div></td>
            <td><strong style="font-weight:500;color:var(--ink)">${priceOf(l.product, l.qty)}</strong></td>
          </tr>`).join('')}</tbody>
        </table>
        <div class="field" style="margin-top:28px;max-width:520px"><span>Order note <em>(optional)</em></span>
          <textarea id="note" rows="3" placeholder="Delivery instructions, project name, etc.">${esc(BLISS.store.get('bliss_note', ''))}</textarea></div>
      </div>
      <aside class="summary">
        <h2>Order Summary</h2>
        ${(() => { const save = items.reduce((t, l) => t + (BLISS.onSale(l.product) ? (l.product.was - l.product.cad) * l.qty : 0), 0); return save ? `<div class="save-row">${icon('tag', 'sm')} You're saving ${price(save)} on sale items</div>` : ''; })()}
        <div class="sum-row"><span>Subtotal</span><span>${price(sub)}</span></div>
        ${disc ? `<div class="sum-row" style="color:#4f7a48"><span>Discount (${promo})</span><span>−${price(disc)}</span></div>` : ''}
        <div class="sum-row"><span>Shipping</span><span>${BLISS.cart.hasFreight() ? 'Calculated at checkout' : 'Free'}</span></div>
        <div class="sum-row"><span>Taxes</span><span class="muted">Calculated at checkout</span></div>
        <form class="promo" id="promoForm"><input id="promoIn" placeholder="Discount code" aria-label="Discount code" value="${promo || ''}"><button class="btn ghost">Apply</button></form>
        <p class="promo-msg" id="promoMsg"></p>
        <div class="sum-row total"><span>Estimated total</span><strong><small data-currency-suffix>${BLISS.currency === 'CAD' ? 'CAD' : ''}</small>${price(sub - disc)}</strong></div>
        <a class="btn block" href="checkout.html" style="margin-top:14px">${icon('lock', 'sm')} Proceed to Checkout</a>
        <div class="express-btns" style="margin-top:10px"><button class="xp-apple" type="button">Apple Pay</button><button class="xp-paypal" type="button">PayPal</button><button class="xp-gpay" type="button">G Pay</button></div>
        <div class="trust-mini">
          <div>${icon('shield', 'sm')} Secure checkout · SSL encrypted</div>
          <div>${icon('return', 'sm')} 14-day returns on eligible items</div>
          <div>${icon('phone', 'sm')} Questions? Call 1-855-366-1001</div>
        </div>
      </aside>
    </div>`;
    document.getElementById('note').addEventListener('input', (e) => BLISS.store.set('bliss_note', e.target.value));
    document.getElementById('promoForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const code = document.getElementById('promoIn').value.trim().toUpperCase();
      if (PROMOS[code]) { promo = code; BLISS.store.set('bliss_promo', code); render(); toast(`Code ${code} applied`); }
      else { const m = document.getElementById('promoMsg'); m.className = 'promo-msg bad'; m.textContent = code ? 'That code isn\'t valid. Try BLISS10 for this demo.' : 'Enter a code.'; }
    });
    if (promo && PROMOS[promo]) { const m = document.getElementById('promoMsg'); m.className = 'promo-msg ok'; m.textContent = `${Math.round(PROMOS[promo] * 100)}% off applied.`; }
  }
  document.addEventListener('cart:change', render);
  render();

  const inCart = new Set(BLISS.cart.items().map((l) => l.id));
  document.getElementById('alsoRail').innerHTML = ['riobel-bath-faucet', 'riobel-momenti-shower', 'vc-pendant', 'toto-drake', 'kohler-workstation-sink', 'va-amalfi']
    .filter((id) => !inCart.has(id)).map(BLISS.byId).map(productCard).join('');
