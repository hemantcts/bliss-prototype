# Bliss Bath and Kitchen: Rebrand Prototype

Clickable HTML prototype of the rebranded blissbathandkitchen.com, for client review and approval. It will be rebuilt in WooCommerce. See [WOOCOMMERCE-NOTES.md](WOOCOMMERCE-NOTES.md) for the developer handoff.

**Not a live store.** No payments are taken and no forms send data. Every page carries `noindex, nofollow` so it stays out of search engines.

## View
- Online: GitHub Pages link for this repository
- Locally: open `index.html`, or serve the folder (e.g. `python -m http.server`)

Use the **Prototype pages** menu (bottom-left) to jump to any page. The final direction is the brown and gold palette with the boxed BLISS logo (`img/logo.webp`, light version `img/logo-light.webp` for the dark footer).

## Pages
Home · Collection · Product (variations, reviews with photo upload, PDF downloads) · Brand page · Search/Shop · Wishlist · My Account (login, register, lost/reset password, dashboard, orders, addresses, account details) · Cart · Checkout · Order confirmed · Brands · Shop the Look · Look detail · Journal · Article · Our Story · Contact · Trade Program · Project Inquiries · Showroom · Returns · Shipping · Privacy · Terms

## Notes
- Product photos are AI-upscaled crops from the design mockups; replace with final photography.
- Prices, products, reviews and articles are sample content.
- Privacy and Terms pages are drafts pending legal review.

## Build (performance)

Pages load minified bundles, not the source files. After editing:

```
npm install            # first time only
python tools/images.py # after adding/replacing photos: responsive copies + srcset
npm run build          # css/ + js/ sources -> css/bliss.min.css, js/app*.min.js, js/pages/*.min.js
```

- `css/fonts.css`, `css/style.css`, `css/components.css` are bundled into `css/bliss.min.css`.
- `js/data.js` + `js/main.js` (+ `js/content.js` on blog/look pages) become `js/app.min.js` / `js/app-content.min.js`; larger page scripts live in `js/pages/<page>.js`.
- Photos have `-400/-560/-700/-840/-1000/-1400` copies; `imgSet()` in `js/main.js` adds `srcset` to images rendered from JavaScript.
- Critical-CSS inlining was tested and rejected: with ~1,900 DOM nodes, restyling after the async stylesheet arrived raised Total Blocking Time from ~100 ms to ~600 ms. A single blocking stylesheet (30 KB gzipped) is faster here.
- Category pages are generated: the tree lives in `js/data.js` (CAT_ROWS), copy and FAQs in `content/categories.json`, the layout in `templates/category.html`. `npm run build` regenerates `bathroom/`, `kitchen/` and the other category folders.
