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

Pages load minified bundles, not the source files. After editing anything in `css/` or `js/`, rebuild:

```
npm install      # first time only (installs esbuild)
npm run build
```

This writes `css/bliss.min.css`, `js/app.min.js` and `js/app-content.min.js` (see `tools/build.mjs`). Fonts are self-hosted in `fonts/`. Large photos have `-600`/`-900` copies, which `imgSet()` in `js/main.js` adds as `srcset`.

