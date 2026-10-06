/* checkout.html: page script (source). Built to js/pages/checkout.min.js by `npm run build`. */
  /* Demo: seed a cart so the page is never empty when opened directly */
  if (!BLISS.cart.count()) { BLISS.cart.add('va-barcelona-2', 1, 'Black / White (interior / exterior)'); BLISS.cart.add('riobel-bath-faucet', 1); }

  const CA = { AB: ['Alberta', 0.05, 'GST 5%'], BC: ['British Columbia', 0.12, 'GST 5% + PST 7%'], MB: ['Manitoba', 0.12, 'GST 5% + PST 7%'], NB: ['New Brunswick', 0.15, 'HST 15%'],
    NL: ['Newfoundland and Labrador', 0.15, 'HST 15%'], NS: ['Nova Scotia', 0.14, 'HST 14%'], NT: ['Northwest Territories', 0.05, 'GST 5%'], NU: ['Nunavut', 0.05, 'GST 5%'],
    ON: ['Ontario', 0.13, 'HST 13%'], PE: ['Prince Edward Island', 0.15, 'HST 15%'], QC: ['Quebec', 0.14975, 'GST 5% + QST 9.975%'], SK: ['Saskatchewan', 0.11, 'GST 5% + PST 6%'], YT: ['Yukon', 0.05, 'GST 5%'] };
  const US = 'AL Alabama|AK Alaska|AZ Arizona|AR Arkansas|CA California|CO Colorado|CT Connecticut|DE Delaware|DC District of Columbia|FL Florida|GA Georgia|HI Hawaii|ID Idaho|IL Illinois|IN Indiana|IA Iowa|KS Kansas|KY Kentucky|LA Louisiana|ME Maine|MD Maryland|MA Massachusetts|MI Michigan|MN Minnesota|MS Mississippi|MO Missouri|MT Montana|NE Nebraska|NV Nevada|NH New Hampshire|NJ New Jersey|NM New Mexico|NY New York|NC North Carolina|ND North Dakota|OH Ohio|OK Oklahoma|OR Oregon|PA Pennsylvania|RI Rhode Island|SC South Carolina|SD South Dakota|TN Tennessee|TX Texas|UT Utah|VT Vermont|VA Virginia|WA Washington|WV West Virginia|WI Wisconsin|WY Wyoming'
    .split('|').map((s) => [s.slice(0, 2), s.slice(3)]);

  const form = document.getElementById('co');
  const country = document.getElementById('country');
  const prov = document.getElementById('prov');
  const PROMOS = { BLISS10: 0.10, TRADE15: 0.15 };
  let promo = BLISS.store.get('bliss_promo', null);
  document.getElementById('coNote').value = BLISS.store.get('bliss_note', '');

  function fillRegions() {
    const isCA = country.value === 'CA';
    prov.innerHTML = '<option value="">Select…</option>' + (isCA ? Object.entries(CA).map(([k, v]) => [k, v[0]]) : US)
      .map(([k, n]) => `<option value="${k}"${isCA && k === 'ON' ? ' selected' : ''}>${n}</option>`).join('');
    document.getElementById('provLabel').textContent = isCA ? 'Province' : 'State';
    document.getElementById('postLabel').textContent = isCA ? 'Postal code' : 'ZIP code';
    form.postal.placeholder = isCA ? 'L3R 0G3' : '10001';
    const wrongCur = (isCA && BLISS.currency === 'USD') || (!isCA && BLISS.currency === 'CAD');
    const notice = document.getElementById('curNotice');
    notice.hidden = !wrongCur;
    if (wrongCur) {
      const to = isCA ? 'CAD' : 'USD';
      document.getElementById('curNoticeText').innerHTML = `Prices are shown in ${BLISS.currency}. <button type="button" data-set-cur="${to}" style="color:var(--gold-text);text-decoration:underline">Switch to ${to}</button>`;
    }
    render();
  }

  function shipping() {
    if (form.delivery.value === 'pickup') return { cad: 0, label: 'Pickup', note: 'Markham warehouse' };
    const m = form.querySelector('[name=ship]:checked')?.value || 'standard';
    if (BLISS.cart.hasFreight()) return m === 'expedited' ? { cad: null, label: 'Expedited freight', note: 'Quoted' } : { cad: null, label: 'Freight · curbside', note: 'Quoted before processing' };
    return m === 'expedited' ? { cad: 49, label: 'Expedited (2-Day)' } : { cad: 0, label: 'Free standard ground' };
  }

  function renderShipMethods() {
    const freight = BLISS.cart.hasFreight();
    const cur = form.querySelector('[name=ship]:checked')?.value || 'standard';
    document.getElementById('shipMethods').innerHTML = freight ? `
      <label class="radio"><input type="radio" name="ship" value="standard" ${cur === 'standard' ? 'checked' : ''}><span>Freight: curbside / driveway delivery<small>Carrier calls to book a 2–4 hour window. We'll confirm the freight charge by email before your order is processed.</small></span><span class="r-price">Quoted</span></label>
      <label class="radio"><input type="radio" name="ship" value="expedited" ${cur === 'expedited' ? 'checked' : ''}><span>Expedited freight<small>Reduces transit time only, not manufacturer lead time</small></span><span class="r-price">Quoted</span></label>` : `
      <label class="radio"><input type="radio" name="ship" value="standard" ${cur === 'standard' ? 'checked' : ''}><span>Free standard ground<small>2–5 business days after shipping</small></span><span class="r-price">Free</span></label>
      <label class="radio"><input type="radio" name="ship" value="expedited" ${cur === 'expedited' ? 'checked' : ''}><span>Expedited (2-Day)<small>Select products only</small></span><span class="r-price">${price(49)}</span></label>`;
  }

  function totals() {
    const sub = BLISS.cart.subtotal();
    const disc = promo && PROMOS[promo] ? Math.round(sub * PROMOS[promo] * 100) / 100 : 0;
    const sh = shipping();
    const isCA = form.delivery.value === 'pickup' || country.value === 'CA';
    const code = form.delivery.value === 'pickup' ? 'ON' : prov.value;
    const rate = isCA ? (CA[code]?.[1] ?? null) : null;
    const taxable = sub - disc + (sh.cad || 0);
    const tax = rate != null ? Math.round(taxable * rate * 100) / 100 : null;
    return { sub, disc, sh, tax, taxLabel: isCA ? (CA[code] ? `${CA[code][2]}` : 'Select province') : 'Calculated after address', total: taxable + (tax || 0) };
  }

  function render() {
    const items = BLISS.cart.items();
    const t = totals();
    document.getElementById('coSideBody').innerHTML = `
      <ul class="sum-lines">${items.map((l) => `<li class="sum-line">
        <div class="thumb"><img loading="lazy" decoding="async" src="img/${l.product.img}.webp"${imgSet(l.product.img, '96px')} alt=""><b>${l.qty}</b></div>
        <div><span class="brand">${l.product.brand}</span><span class="name">${l.product.name}</span>${l.variant ? `<span class="variant">${esc(l.variant)}</span>` : ''}</div>
        <span class="sum-price">${priceOf(l.product, l.qty)}</span></li>`).join('')}</ul>
      <form class="promo" id="promoForm"><input id="promoIn" placeholder="Discount code or gift card" aria-label="Discount code" value="${promo || ''}"><button class="btn ghost">Apply</button></form>
      <p class="promo-msg ${promo ? 'ok' : ''}" id="promoMsg">${promo ? `${promo}: ${Math.round(PROMOS[promo] * 100)}% off applied` : ''}</p>
      <div class="sum-row"><span>Subtotal · ${BLISS.cart.count()} items</span><span>${price(t.sub)}</span></div>
      ${t.disc ? `<div class="sum-row" style="color:#4f7a48"><span>Discount</span><span>−${price(t.disc)}</span></div>` : ''}
      <div class="sum-row"><span>Shipping <small class="muted">${t.sh.label}</small></span><span>${t.sh.cad === null ? t.sh.note : t.sh.cad === 0 ? 'Free' : price(t.sh.cad)}</span></div>
      <div class="sum-row"><span>Taxes <small class="muted">${t.taxLabel}</small></span><span>${t.tax == null ? '—' : price(t.tax)}</span></div>
      <div class="sum-row total"><span>Total</span><strong><small data-currency-suffix>${BLISS.currency === 'CAD' ? 'CAD' : ''}</small>${price(t.total)}</strong></div>
      ${t.sh.cad === null ? `<div class="co-notice"><i data-icon="truck" class="sm"></i><span>Your order includes freight items. Our team will email your freight quote for approval before the order is processed.</span></div>` : ''}`;
    renderIcons(document.getElementById('coSideBody'));
    document.getElementById('mTotal').innerHTML = price(t.total);
    document.getElementById('promoForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const code = document.getElementById('promoIn').value.trim().toUpperCase();
      if (PROMOS[code]) { promo = code; BLISS.store.set('bliss_promo', code); render(); toast(`Code ${code} applied`); }
      else { const m = document.getElementById('promoMsg'); m.className = 'promo-msg bad'; m.textContent = code ? 'That code isn\'t valid. Try BLISS10 for this demo.' : 'Enter a code.'; }
    });
  }

  form.addEventListener('change', (e) => {
    if (e.target.name === 'delivery') {
      const pickup = form.delivery.value === 'pickup';
      document.getElementById('shipSec').hidden = pickup;
      document.getElementById('addressBlock').querySelectorAll('input:not([name=company]):not([name=address2]), select').forEach((el) => {
        if (['address', 'city', 'prov', 'postal'].includes(el.name)) el.required = !pickup;
      });
      ['address', 'address2', 'city', 'postal'].forEach((n) => form[n].closest('.field').hidden = pickup);
      prov.closest('.field').hidden = pickup; country.closest('.field').hidden = pickup;
    }
    if (e.target === country) { fillRegions(); return; }
    render();
  });
  document.addEventListener('currency:change', fillRegions);
  document.getElementById('coNote').addEventListener('input', (e) => BLISS.store.set('bliss_note', e.target.value));

  // Card input formatting
  form.card.addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})(?=.)/g, '$1 '); });
  form.exp.addEventListener('input', (e) => { const v = e.target.value.replace(/\D/g, '').slice(0, 4); e.target.value = v.length > 2 ? v.slice(0, 2) + ' / ' + v.slice(2) : v; });
  form.cvc.addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, ''); });

  // Mobile summary toggle
  document.querySelector('.co-summary-toggle').addEventListener('click', (e) => {
    const side = document.getElementById('coSide'); side.classList.toggle('open');
    const open = side.classList.contains('open');
    e.currentTarget.setAttribute('aria-expanded', open);
    e.currentTarget.querySelector('span').innerHTML = `${icon('bag', 'sm')} ${open ? 'Hide' : 'Show'} order summary`;
  });
  document.querySelectorAll('[data-demo]').forEach((b) => b.addEventListener('click', () => toast('Express wallets connect once the payment gateway is set up in WooCommerce')));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalid = [...form.querySelectorAll('input, select')].filter((el) => !el.closest('[hidden]') && !el.checkValidity());
    if (invalid.length) {
      invalid.forEach((el) => el.dispatchEvent(new Event('blur')));
      invalid[0].focus(); invalid[0].reportValidity();
      return;
    }
    const btn = document.getElementById('payBtn');
    btn.classList.add('placing'); btn.innerHTML = '<span class="spinner"></span> Processing…';
    const t = totals();
    const order = {
      no: 'BL-' + Math.floor(100000 + Math.random() * 900000), email: form.email.value, name: `${form.first.value} ${form.last.value}`.trim(),
      pickup: form.delivery.value === 'pickup',
      address: [form.address.value, form.address2.value, `${form.city.value} ${prov.value} ${form.postal.value}`, country.options[country.selectedIndex].text].filter((x) => x.trim()),
      items: BLISS.cart.items().map((l) => ({ id: l.id, qty: l.qty, variant: l.variant })), totals: t, currency: BLISS.currency,
      pay: form.pay.value, date: new Date().toISOString(),
    };
    try { sessionStorage.setItem('bliss_order', JSON.stringify(order)); } catch {}
    setTimeout(() => { BLISS.cart.clear(); BLISS.store.set('bliss_promo', null); BLISS.store.set('bliss_note', ''); location.href = 'order-confirmed.html'; }, 1400);
  });

  document.addEventListener('cart:change', () => { renderShipMethods(); render(); });
  renderShipMethods();
  fillRegions();
  // Signed-in customers: pre-fill email and saved shipping address (WooCommerce does this from the account)
  (function prefill() {
    const u = BLISS.store.get('bliss_user', null);
    if (!u) return;
    form.email.value = u.email;
    const link = document.getElementById('coSignIn');
    link.textContent = `Signed in as ${u.first}`; link.href = 'account.html';
    const a = BLISS.store.get('bliss_addresses', null)?.shipping;
    if (!a || !a.address) { form.first.value = u.first || ''; form.last.value = u.last || ''; return; }
    ['first', 'last', 'company', 'address', 'address2', 'city', 'postal', 'phone'].forEach((k) => { if (form[k]) form[k].value = a[k] || ''; });
    country.value = a.country || 'CA'; fillRegions(); prov.value = a.prov || ''; render();
  })();
