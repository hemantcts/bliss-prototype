/* order-confirmed.html: page script (source). Built to js/pages/order-confirmed.min.js by `npm run build`. */
  let order = null;
  try { order = JSON.parse(sessionStorage.getItem('bliss_order')); } catch {}
  if (!order) { // opened directly: show a sample order
    const sub = 6490 + 690, tax = Math.round(sub * 0.13 * 100) / 100;
    order = { no: 'BL-482917', email: 'you@example.com', name: 'Alex Morgan', pickup: false, address: ['5 Shields Court, Unit 104', 'Markham ON L3R 0G3', 'Canada'],
      items: [{ id: 'va-barcelona-2', qty: 1, variant: 'Black / White (interior / exterior)' }, { id: 'riobel-bath-faucet', qty: 1, variant: '' }],
      totals: { sub, disc: 0, sh: { cad: null, label: 'Delivery', note: 'Confirmed by email' }, tax, taxLabel: 'HST 13%', total: sub + tax }, pay: 'card', date: new Date().toISOString() };
  }
  const t = order.totals;
  const freight = t.sh.cad === null;
  const first = (order.name || '').split(' ')[0];
  const lines = order.items.map((l) => ({ ...l, product: BLISS.byId(l.id) })).filter((l) => l.product);
  document.getElementById('confirm').innerHTML = `
    <div class="confirm-head">
      <div class="tick">${icon('check')}</div>
      <div><small>Order ${esc(order.no)}</small><h1>Thank you${first ? ', ' + esc(first) : ''}!</h1></div>
    </div>
    <div class="callout"><i data-icon="mail"></i><p><strong>Your order is confirmed.</strong> We've sent a confirmation to ${esc(order.email)}. ${freight ? "We'll email your delivery details and any shipping charges for approval before we process your order." : order.pickup ? "We'll email you when your order is ready for pickup in Markham." : "You'll receive tracking details as soon as your order ships."}</p></div>
    <div class="timeline">
      <div class="done"><b>Confirmed</b>Today</div>
      <div class="done"><b>Processing</b>1–2 business days</div>
      <div><b>${order.pickup ? 'Ready for pickup' : 'Shipped'}</b>Typically 2–5 business days</div>
      <div><b>${order.pickup ? 'Picked up' : 'Delivered'}</b>${order.pickup ? 'Markham warehouse' : 'Inspect on arrival'}</div>
    </div>
    <div class="confirm-grid">
      <div class="confirm-box"><h3>${order.pickup ? 'Pickup location' : 'Shipping address'}</h3>
        ${order.pickup ? '<p>Bliss Bath and Kitchen warehouse</p><p>5 Shields Court, Unit 104</p><p>Markham, Ontario</p>' : `<p>${esc(order.name)}</p>${order.address.map((a) => `<p>${esc(a)}</p>`).join('')}`}
      </div>
      <div class="confirm-box"><h3>Payment</h3><p>${{ card: 'Credit card', paypal: 'PayPal'}[order.pay] || 'Credit card'}</p>
        <p class="muted">Total <span data-price="${t.total}"></span> <span data-currency-suffix></span></p></div>
    </div>
    <div class="confirm-box" style="margin-top:20px">
      <h3>Order summary</h3>
      <ul class="sum-lines">${lines.map((l) => `<li class="sum-line">
        <div class="thumb"><img loading="lazy" decoding="async" src="img/${l.product.img}.webp"${imgSet(l.product.img, '96px')} alt=""><b>${l.qty}</b></div>
        <div><span class="brand">${l.product.brand}</span><span class="name">${l.product.name}</span>${l.variant ? `<span class="variant">${esc(l.variant)}</span>` : ''}</div>
        <span>${price(l.product.cad * l.qty)}</span></li>`).join('')}</ul>
      <div class="sum-row"><span>Subtotal</span><span>${price(t.sub)}</span></div>
      ${t.disc ? `<div class="sum-row"><span>Discount</span><span>−${price(t.disc)}</span></div>` : ''}
      <div class="sum-row"><span>Shipping${t.sh.cad === null ? '' : ` <small class="muted">${esc(t.sh.label)}</small>`}</span><span>${t.sh.cad === null ? 'Confirmed by email' : t.sh.cad === 0 ? 'Free' : price(t.sh.cad)}</span></div>
      <div class="sum-row"><span>Taxes <small class="muted">${esc(t.taxLabel)}</small></span><span>${t.tax == null ? '—' : price(t.tax)}</span></div>
      <div class="sum-row total"><span>Total</span><strong><small data-currency-suffix></small>${price(t.total)}</strong></div>
    </div>
    <div class="callout warn"><i data-icon="info"></i><p><strong>Please inspect every item on delivery.</strong> Note any visible damage on the delivery receipt before signing and report it to us within 24 hours. Don't install anything that appears damaged. <a href="returns.html" style="color:var(--gold-text);text-decoration:underline">Damage &amp; returns policy</a></p></div>
    <div class="hero-cta" style="margin-top:26px"><a class="btn" href="index.html">Continue Shopping ${icon('arrow', 'sm')}</a><a class="btn ghost" href="contact.html">Questions? Contact Us</a></div>`;
  renderIcons(document.getElementById('confirm'));
  BLISS.refreshPrices();
