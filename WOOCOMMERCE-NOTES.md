# Bliss prototype → WooCommerce build notes

This folder is a static, clickable prototype for client approval. Everything below is simulated in the browser (no server, no payments). This is how each piece maps to WooCommerce.

## Page → template

| Prototype page | WooCommerce / WordPress |
|---|---|
| `index.html` | Front page (block theme template or page builder) |
| `collection.html` | Product category archive (`archive-product.php` / `taxonomy-product_cat`) with category description + SEO copy blocks |
| `search.html` | Product search results + shop page (`?s=…&post_type=product`), category chips = product categories, brand chips = brand taxonomy/attribute |
| `product.html` | Single product (`single-product.php`), colour = variation attribute, tabs = product tabs |
| Cart drawer (every page) | Side cart / mini-cart via cart fragments (e.g. FunnelKit Cart, XootiX Side Cart, or custom `woocommerce_add_to_cart_fragments`) |
| `cart.html` | Cart page (Cart block) |
| `checkout.html` | Checkout block (one-page) or FunnelKit/CheckoutWC for the Shopify-style layout |
| `order-confirmed.html` | Order received endpoint (`/checkout/order-received/`) |
| `about`, `contact`, `trade`, `projects`, `showroom`, `returns`, `shipping` | Standard pages. Forms → Gravity Forms / WPForms / Fluent Forms (file uploads needed on Trade, Projects, Returns) |

## Features

- **Currency (CAD default, USD switch):** prototype uses a fixed demo rate (0.73) in `js/data.js`. In production use a multi-currency plugin (WOOCS, Aelia Currency Switcher or CURCY) with live rates, or set fixed USD prices per product.
- **Search overlay:** live results by name, brand, category and finish. In production use FiboSearch (AJAX Search for WooCommerce) or a custom REST endpoint; keep the same overlay UI.
- **Shipping rules (from client's policy):** free standard shipping on eligible orders < 70 lbs (Canada & USA); items ≥ 70 lbs / oversized = freight, *quoted before processing*; local pickup at the Markham warehouse; expedited by request. Set up with WooCommerce shipping classes (`parcel`, `freight`) + Local Pickup. Freight could be a "quote" method (e.g. $0 with a note, then invoice) or a plugin such as Request a Quote.
- **Taxes:** checkout shows Canadian GST/HST/PST by province (ON 13%, QC 14.975%, BC 12%, NS 14%, etc.). Use WooCommerce Tax with Canadian rates, and a US tax service (WooCommerce Tax / TaxJar / Avalara) for US states.
- **Sale pricing:** WooCommerce "Sale price" on each product. The prototype shows a "Sale −X%" badge, the sale price in red with the regular price struck through (cards, product page, cart, checkout), "You're saving $X" in the cart, an "On Sale" filter on category pages, and the Sale menu item lists all sale products.
- **Make an Inquiry:** every Add to Cart has an Inquire button that opens a product enquiry form (product pre-filled). Use a quote/enquiry plugin (e.g. YITH Request a Quote, or Gravity Forms with the product passed in) so enquiries email the team and land in the CRM.
- **Brands:** `brands.html` lists all 59 brands from the current `/manufacturers/` page (featured + A–Z directory, search and category filter). Use a product brand taxonomy (WooCommerce Brands) and **keep each brand's current URL `/brands/<slug>/`**; slugs are stored in `js/data.js`. Brand categories in the prototype are best guesses; confirm with the client. Real brand logos can replace the text tiles.
- **My Account:** `account.html` mirrors WooCommerce's `myaccount` endpoints. Logged out: side-by-side Login and Register (with "Enable registration on My Account page"), `?view=lost-password` and `?view=reset-password` (WooCommerce's lost-password flow; the message never reveals whether an email is registered). Logged in: Dashboard, Orders, View order, Addresses (billing/shipping edit), Account details (with password change), Log out. Style the default `woocommerce/myaccount/*` templates to match; Downloads is hidden. Social login buttons need a plugin (e.g. Nextend Social Login). Checkout "Sign in" returns to checkout and pre-fills email and saved shipping address. The prototype stores only a name/email in the browser, never passwords.
- **Variable products:** the Barcelona 2 is set up as a WooCommerce variable product with attributes Bathtub Size, Bathtub Colour, Faucet Hole, Feet Color, Feet (required) and Waste and Overflow (optional). Each option has its own price, SKU and availability; price shows a range until all required options are chosen, and Add to Cart asks for the missing ones. Use a swatches plugin (e.g. Variation Swatches for WooCommerce) for the colour swatches; "Feet Color" is only required when feet are chosen (conditional logic).
- **Product meta:** SKU, linked Categories (e.g. Cast Iron / Clawfoot / Freestanding Bathtubs), Brand and Tags under the buttons (WooCommerce `product_meta`), good for internal linking and SEO.
- **Brand on the product page:** brand logo tile and name linking to the brand archive (`brand.html?b=<slug>` in the prototype, live URL `/brands/<slug>/`). Upload each brand's logo to the brand taxonomy.
- **Downloads:** Specification sheet, installation guide, care guide and warranty PDFs listed under Specifications (sample PDFs in `/files`). Use a product documents field/plugin so each product has its own files.
- **Reviews with photos:** rating summary and bars, customer photo gallery with lightbox, "with photos" filter, helpful votes, and a Write a Review form with star rating and up to 5 photo uploads (moderated before publishing). Plugin: Customer Reviews for WooCommerce (supports photo uploads and review reminders).
- **Mobile:** form fields are 16px (no iOS zoom), tap targets ≥ 44px, sticky Add to Cart bar and swipeable gallery on the product page, safe-area padding. Keep these in the theme.
- **Sticky Buy Now bar (phones):** product thumbnail, name, sale and regular price and a Buy Now button, pinned to the bottom of product pages whenever the main Add to Cart is off screen. Buy Now adds the chosen configuration and goes straight to checkout; with options missing it takes the shopper to them.
- **"People viewing this product" (sample only):** the "126 people are viewing" line is a design placeholder with a fixed number. **Before launch it must show a real live count** (e.g. from a plugin that counts active sessions per product) **or be removed**: an invented count is a false or misleading representation under Canada's Competition Act and the US FTC Act.
- **Chat assistant:** floating "Chat with us" button (round icon on phones, raised above the sticky Buy Now bar and cookie banner) opening a chat panel with quick replies (track order, product advice, shipping, returns, trade, showroom, talk to a person), answers taken from the site's policies, catalogue product suggestions and a hand-off that collects an email. The prototype is scripted; in production use a real service such as **Tidio**, **LiveChat**, **Gorgias** or **WhatsApp Business**, ideally one with a WooCommerce integration for order lookups and an AI assistant trained on the policies, with hand-off to the team. `page.html#chat` opens it directly for demos.
- **Wishlist:** hearts on every product card and the product page, header count, `wishlist.html` (move to cart, add all, inquire, remove, clear, share link `?items=…` with a read-only shared view and "Save all"). Use YITH WooCommerce Wishlist or TI WooCommerce Wishlist; guests keep a browser-saved list, logged-in customers keep it on their account.
- **Trade pricing:** Trade application form → user role `trade` with role-based pricing (e.g. B2BKing, Wholesale Suite). Demo codes in the prototype: `BLISS10`, `TRADE15`.
- **Payments:** Stripe or Moneris (cards, Apple Pay, Google Pay), PayPal. No financing (client does not offer it).
- **Hero slider:** 3 slides, Ken Burns zoom, auto-advance with progress bars, pause button, swipe, cursor parallax, respects "reduce motion". Rebuild as a block/section, not a heavy slider plugin.

- **Mega menu:** Bath, Kitchen, Appliances, Lighting, Furniture, Brands and Inspiration open a full-width panel on hover (keyboard: Tab / Escape; tablets: first tap opens). Build as a WordPress menu with columns (e.g. Max Mega Menu or the theme's mega-menu block) so the client can edit links.
- **Footer & SEO:** every category link from the original footer is kept (Bathroom Products, Bathtubs, Kitchen Products, Lighting, Furniture) plus the content-doc columns. **Keep the exact URL slugs of the current live site** for these pages, and 301-redirect any that change.
- **Cookie consent (Canada + USA):** banner with equal Accept / Reject buttons, preferences panel, footer "Cookie Preferences" and "Do Not Sell or Share" links, honours Global Privacy Control. Only load GA4 / ad pixels after opt-in (Google Consent Mode v2). Use CookieYes, Complianz or similar in production. Needed for Quebec Law 25 (opt-in for non-essential cookies), PIPEDA, and CCPA/CPRA for California visitors. `privacy.html` is a structural draft: final wording and the named privacy officer must come from the client's legal advisor.
- **Performance:** images are WebP (1.6 MB total, was 3.3 MB). The hero's first image is preloaded with `fetchpriority="high"` and `srcset`; other slides load at low priority; below-the-fold images use `loading="lazy"`; images carry width/height to avoid layout shift. Keep this in the theme (WordPress generates srcset automatically; add the hero preload in `wp_head`).
- **Colour swatches on product cards:** hovering (or tapping) a swatch swaps the card photo to that colour. In WooCommerce, use the image set on each variation (Variations > Image) for the colour attribute, e.g. with a "variation swatches" plugin that supports archive/loop swatches, or a small custom loop template. The prototype uses stand-in photos for tubs and auto-recoloured black/nickel versions of the gold fixtures (`img/*-black.webp`, `img/*-nickel.webp`); replace these with real variation photography. Ranges currently have no white/grey photos, so those swatches do not change the image yet.
- **Payment icons:** simplified badges in the footer, cart drawer and checkout. Replace with the official marks from each provider's brand kit (Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay).

- **Shop the Look:** `shop-the-look.html` (filterable gallery) and `look.html?look=<id>` (room photo, list of the products in the room, Add all to cart, designer note, finishes, related looks). Build as a "Look" custom post type with a simple related-products field; no image hotspots to maintain. Look data lives in `js/content.js`.
- **Journal:** `blog.html` (featured post, category filter, search) and `blog-post.html?post=<slug>` (article, byline, share, Shop this article products, previous/next, related). Standard WordPress posts plus a related-products field. Keep existing blog URLs.
- **Terms & Conditions:** `terms.html` is a structured draft drawn from the shipping/return policies; needs legal review.

## Content still needed from the client
- Final photography (current images are AI-upscaled crops from the mockups), including the "Shop the Look" project photos / House of Rohl imagery.
- Brand logos (official artwork).
- Showroom opening hours.
- Privacy policy and Terms wording (legal review), privacy officer name.
- Real Shop the Look photos (projects / House of Rohl imagery) with the list of products in each, and real blog articles.
- Real product data, prices, weights (for the 70 lb rule) and lead times.

## Performance (carry over to the WordPress theme)

- **Fonts:** self-host Cormorant Garamond and Jost (variable WOFF2, Latin subset) and preload both; no Google Fonts request. Use `font-display: swap`.
- **CSS/JS:** enqueue one minified stylesheet and one minified script; load scripts with `defer` or in the footer. Avoid forced layout (reading offsetWidth/getBoundingClientRect) during page load.
- **Images:** always output `srcset`/`sizes` (`wp_get_attachment_image()` does this), serve WebP/AVIF, `loading="lazy"` below the fold, and `fetchpriority="high"` plus a preload for the hero image. Register image sizes around 600, 900 and 1600 px wide.
- **No layout shift:** render the header in PHP (not JavaScript) and give every image width/height.
- **Server:** enable Brotli/Gzip, HTTP/2 or HTTP/3, and long cache headers (1 year, immutable) for versioned CSS, JS, fonts and images; page cache (e.g. LiteSpeed Cache or WP Rocket) for HTML; a CDN (e.g. Cloudflare).
- **Navigation:** the prototype uses Speculation Rules to prerender internal pages on hover (exclude cart/checkout/account URLs).
- **Off-screen work:** `content-visibility: auto` on the footer and lower homepage sections.

## Category pages (product_cat archives)

- **URLs:** hierarchical, e.g. `/bathroom/`, `/bathroom/bathtubs/`, `/bathroom/bathtubs/freestanding-bathtubs/`. Set Permalinks > Product category base to remove `/product-category/` (e.g. with a "remove category base" setting or plugin) and keep the parent slugs in the path. Add 301 redirects from the live site's old category URLs.
- **One template for every level** (`taxonomy-product_cat.php`), as in `templates/category.html`:
  1. Compact header: breadcrumb, H1 (category name), 1–2 line intro.
  2. Sub-category strip: a parent shows its children; a final category shows its siblings with the current one marked.
  3. Products from the category **and all sub-categories**, with filters (a "Category" filter on parents), sort, product count and pagination. Use a filter plugin such as FiboFilters, FacetWP or WooCommerce Product Filters.
  4. Content area below the products: the category description, or an ACF WYSIWYG field.
  5. FAQ: an ACF repeater (question/answer), output as an accordion **and** as FAQPage JSON-LD.
- **SEO:** a unique title and meta description per category (Yoast/Rank Math); BreadcrumbList JSON-LD (Yoast/Rank Math add this); canonical URL for each category. Filtered and sorted URLs (`?filter_*`, `?orderby`) should be `noindex,follow` or canonicalised to the clean category URL. Paginated pages get self-referencing canonicals.
- **Content to supply per category:** intro (1–2 sentences), content area (300–600 words), 4–6 FAQs, and a header image. The prototype's `content/categories.json` shows the structure.

