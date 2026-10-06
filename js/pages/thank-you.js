/* thank-you.html: confirmation after a contact, inquiry, project, trade, appointment or return form.
   The form type comes from ?type=; the first name and product come from sessionStorage (see goThanks in main.js). */
(function thankYou() {
  const PAGES = {
    contact: {
      eyebrow: 'Message received', title: 'Thank you for getting in touch',
      lead: 'A Bliss Bath and Kitchen specialist will reply within one business day, usually much sooner.',
      steps: [['We read your message', 'Your note goes straight to the right specialist on our team.'],
        ['We reply within one business day', 'By email, or by phone if you left a number and prefer a call.'],
        ['We help you decide', 'Product advice, availability, finishes and delivery: whatever you need.']],
      cta: [['Continue Shopping', 'search.html', 'btn'], ['Back to Home', 'index.html', 'btn ghost']],
    },
    inquiry: {
      eyebrow: 'Inquiry received', title: 'Thank you for your inquiry',
      lead: 'A product specialist will reply within one business day with availability, lead time and pricing.',
      steps: [['We check availability', 'We confirm stock, lead time and finish options with the manufacturer.'],
        ['We reply within one business day', 'With pricing, options and any trade or project pricing that applies.'],
        ['Reserve or order', 'Order online, or let us place the order for you over the phone.']],
      cta: [['View Product', 'product.html', 'btn'], ['Continue Shopping', 'search.html', 'btn ghost']],
    },
    project: {
      eyebrow: 'Project inquiry received', title: 'Thank you for your project inquiry',
      lead: 'A project specialist will review your details and contact you within one business day.',
      steps: [['We review your project', 'Scope, quantities, timeline and the categories you need.'],
        ['We schedule a call', 'To confirm specifications, finishes and delivery phasing.'],
        ['You receive a quotation', 'An itemised quote with project pricing across every category.']],
      cta: [['Explore Brands', 'brands.html', 'btn'], ['Back to Home', 'index.html', 'btn ghost']],
    },
    trade: {
      eyebrow: 'Application received', title: 'Thank you for applying to the Trade Program',
      lead: 'Our trade team reviews every application and replies within 1–2 business days.',
      steps: [['We verify your business', 'We review the details and any documents you shared.'],
        ['Your account is set up', 'With your trade pricing tier and benefits.'],
        ['Meet your specialist', 'A dedicated contact for quotes, samples and project support.']],
      cta: [['Explore the Trade Program', 'trade.html', 'btn'], ['Shop All Products', 'search.html', 'btn ghost']],
    },
    appointment: {
      eyebrow: 'Appointment requested', title: 'Thank you, we look forward to your visit',
      lead: 'We’ll confirm your showroom appointment by email shortly.',
      steps: [['We confirm your time', 'You’ll receive an email confirmation with directions and parking details.'],
        ['We prepare for your visit', 'Tell us what you’re planning and we’ll have samples and options ready.'],
        ['Visit the showroom', '5 Shields Court, Unit 104, Markham, Ontario.']],
      cta: [['Showroom Details', 'showroom.html', 'btn'], ['Shop the Look', 'shop-the-look.html', 'btn ghost']],
    },
    return: {
      eyebrow: 'Return request received', title: 'Thank you, we’ve received your return request',
      lead: 'We’ll review it and email you within one business day with next steps.',
      steps: [['We review your request', 'We check the order details and the reason for the return.'],
        ['You receive instructions', 'Including your return authorisation and how to send the item back.'],
        ['Refund or replacement', 'Processed once the item arrives and is inspected.']],
      cta: [['Read the Return Policy', 'returns.html', 'btn'], ['Contact Us', 'contact.html', 'btn ghost']],
    },
  };

  const type = new URLSearchParams(location.search).get('type');
  const page = PAGES[type] || PAGES.contact;
  let info = {};
  try { info = JSON.parse(sessionStorage.getItem('bliss_thanks') || '{}'); } catch {}
  if (info.type !== type) info = {};

  const $ = (id) => document.getElementById(id);
  $('tyEyebrow').textContent = page.eyebrow;
  $('tyTitle').textContent = info.name ? `Thank you, ${info.name}` : page.title;
  $('tyLead').textContent = page.lead;
  document.title = `${page.eyebrow} | Bliss Bath and Kitchen`;

  // a short reference people can quote if they call (prototype: derived from the submission time)
  const at = Number(info.at);
  if (Number.isFinite(at) && at > 0) {
    $('tyRef').hidden = false;
    $('tyRef').innerHTML = `Reference <b>BL-${at.toString(36).slice(-6).toUpperCase()}</b> · Sent ${esc(new Date(at).toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' }))}`;
  }

  // inquiry: show the product they asked about
  const product = info.product && BLISS.byId(info.product);
  if (product) {
    $('tyProduct').innerHTML = `<a class="thanks-product" href="product.html">
      <img src="img/${product.img}.webp"${imgSet(product.img, '120px')} alt="" width="120" height="90">
      <span><small>${esc(product.brand)}</small><b>${esc(product.name)}</b>${priceOf(product)}</span>
      <span class="link-arrow">View product ${icon('arrow', 'sm')}</span></a>`;
  }

  $('tySteps').innerHTML = page.steps.map(([t, d]) => `<li><b>${t}</b><span>${d}</span></li>`).join('');
  $('tyCta').innerHTML = page.cta.map(([t, h, c]) => `<a class="${c}" href="${h}">${t}${c === 'btn' ? ` ${icon('arrow', 'sm')}` : ''}</a>`).join('');

  // product suggestions: same category as the inquiry, otherwise best sellers
  const pool = BLISS.products.filter((p) => p.id !== product?.id);
  const picks = (product ? pool.filter((p) => p.cat === product.cat) : pool.filter((p) => p.rating >= 4.8)).concat(pool).filter((p, i, a) => a.indexOf(p) === i).slice(0, 4);
  if (product) { $('tyMoreTitle').textContent = `More ${product.cat === 'Bath' ? 'for the Bath' : 'in ' + product.cat}`; $('tyMoreText').textContent = 'Similar pieces you may also like.'; }
  $('tyMore').innerHTML = picks.map(productCard).join('');
  syncWish();

  document.querySelector('[data-open-chat]')?.addEventListener('click', () => window.openChat?.());
})();
