/* Parent category landing (e.g. /bathroom/, /bathroom/bathtubs/): best sellers, all products and brands
   for the category and everything below it. Static parts (hero, sub-category tiles, guide) are generated
   by tools/pages.mjs from the category tree in js/data.js. */
(function categoryLanding() {
  const slug = document.body.dataset.cat;
  const cat = BLISS.catBySlug[slug];
  if (!cat) return;
  const list = BLISS.catProducts(slug);

  // best sellers: top rated, then most reviewed
  const best = [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 4);
  if (best.length) document.getElementById('catBest').innerHTML = best.map(productCard).join('');
  else document.getElementById('catBestWrap').hidden = true;

  // all products in this category and its sub-categories
  document.getElementById('catAll').innerHTML = list.map(productCard).join('');
  document.getElementById('catAllCount').textContent = list.length ? `${list.length} product${list.length === 1 ? '' : 's'} across every ${cat.name.toLowerCase()} category.` : '';
  document.getElementById('catEmpty').hidden = list.length > 0;

  // brands: from the products here, topped up with brands mapped to this department
  const TOP_CAT = { bathroom: 'Bath', kitchen: 'Kitchen', appliances: 'Appliances', lighting: 'Lighting', furniture: 'Furniture', outdoor: 'Outdoor' };
  const top = BLISS.catTrail(slug)[0].slug;
  const names = new Set(list.map((p) => p.brand).filter((b) => !/Collection$/.test(b)));
  BLISS.brands.filter((b) => (b.cats || []).includes(TOP_CAT[top])).slice(0, 14).forEach((b) => names.add(b.name));
  const brands = [...names].map((n) => BLISS.brands.find((b) => b.name === n) || { name: n }).slice(0, 14);
  if (brands.length) document.getElementById('catBrands').innerHTML = brands.map((b) => b.slug ? `<a href="brand.html?b=${b.slug}">${esc(b.name)}</a>` : `<span>${esc(b.name)}</span>`).join('');
  else document.getElementById('catBrandsWrap').hidden = true;

  syncWish();
})();
