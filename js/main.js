/* BLISS prototype — shared layout + interactions (no build step, works from file://)
   Requires js/data.js to be loaded first. */

const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
  cart: '<path d="M3 4h2l2.2 11h11l2-8H6.2"/><circle cx="9" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/>',
  bag: '<path d="M5 8h14l-1 13H6Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  menu: '<path d="M3 7h18M3 12h18M3 17h18"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
  left: '<path d="m15 5-7 7 7 7"/>',
  right: '<path d="m9 5 7 7-7 7"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  up: '<path d="m6 15 6-6 6 6"/>',
  truck: '<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  store: '<path d="M3 9h18M4 9l1-5h14l1 5M5 9v11h14V9M9 20v-6h6v6"/><path d="M8 4v5M12 4v5M16 4v5"/>',
  diamond: '<path d="M6 4h12l3 5-9 11L3 9Z"/><path d="M3 9h18M9 4l-1.5 5L12 20l4.5-11L15 4"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8"/>',
  pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  grid: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/>',
  grid3: '<rect x="3" y="4" width="4.5" height="7"/><rect x="9.75" y="4" width="4.5" height="7"/><rect x="16.5" y="4" width="4.5" height="7"/><rect x="3" y="13" width="4.5" height="7"/><rect x="9.75" y="13" width="4.5" height="7"/><rect x="16.5" y="13" width="4.5" height="7"/>',
  filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
  zoom: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  upload: '<path d="M12 16V5M7 10l5-5 5 5M5 20h14"/>',
  leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 14 10"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/>',
  ruler: '<path d="M3 17 17 3l4 4L7 21Z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  hand: '<path d="M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V12M16 9a1.5 1.5 0 0 1 3 0v4a8 8 0 0 1-8 8h-1a6 6 0 0 1-5-3l-2.5-4a1.5 1.5 0 0 1 2.5-1.6L7 15"/>',
  bath: '<path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z"/><path d="M6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2 0-1.5-1-2-1-3s1-2 2.5-2H18a3 3 0 0 0 3-3c0-4.5-4-8-9-8Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8Z"/><circle cx="7.5" cy="8" r="1.3"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-2.5 5 2.5-1.5-7"/>',
  recycle: '<path d="M7 19H4l3-5M17 19h3l-3-5M12 4l-2 3.5M12 4l2 3.5M9 19h6M6 13 9 8M18 13l-3-5"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8Z"/>',
  pinterest: '<circle cx="12" cy="12" r="9"/><path d="M10.5 20 12 13.5M11 9.5a2.5 2.5 0 1 1 1.5 4.5c-1 0-1.5-.5-1.5-.5"/>',
  youtube: '<rect x="2.5" y="6" width="19" height="12" rx="3.5"/><path d="m10.5 9.5 4 2.5-4 2.5Z"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  return: '<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  note: '<path d="M5 4h14v16H5z"/><path d="M8 9h8M8 13h8M8 17h5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .7 3.2 2.6 3.5 5.5"/>',
  building: '<path d="M4 21V5l8-2v18M12 8h8v13M8 8v.01M8 12v.01M8 16v.01M16 12v.01M16 16v.01M2 21h20"/>',
  percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
  box: '<path d="m12 3 9 4.5v9L12 21l-9-4.5v-9Z"/><path d="m3 7.5 9 4.5 9-4.5M12 12v9"/>',
  file: '<path d="M6 3h8l5 5v13H6Z"/><path d="M14 3v5h5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5Z"/>',
  play: '<path d="M8 5v14l11-7Z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>',
};
const icon = (n, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;
window.icon = icon;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
window.esc = esc;

/* Responsive images: photos also exist as name-400/600/800/1000/1400.webp (tools/images.py); imgSet() adds the srcset
   so phones and small cards download a smaller file. In WordPress, wp_get_attachment_image() does this. */
const IMG_VARIANTS = {"blog-finish":[1200,400,560,700,840,1000],"blog-range":[1200,400,560,700,840,1000],"blog-tub":[1200,400,560,700,840,1000],"brands-faucet":[972,400,560,700,840],"cat-appliances":[1400,400,560,700,840,1000],"cat-bath":[1400,400,560,700,840,1000],"cat-home":[1391,400,560,700,840,1000],"cat-kitchen":[1400,400,560,700,840,1000],"col-intro":[1800,400,560,700,840,1000,1400],"hero-1":[1376,400,560,700,840,1000],"hero-2":[1672,400,560,700,840,1000,1400],"hero-3":[1672,400,560,700,840,1000,1400],"hero-collection":[1180,400,560,700,840,1000],"hero-home":[1400,400,560,700,840,1000],"ig-1":[576,400],"ig-2":[800,400,560,700],"ig-3":[800,400,560,700],"ig-6":[580,400],"look-kitchen":[1800,400,560,700,840,1000,1400],"look-retreat":[1500,400,560,700,840,1000],"mega-appliances":[900,400,560,700],"mega-brands":[900,400,560,700],"mega-furniture":[900,400,560,700],"mega-lighting":[900,400,560,700],"mega-outdoor":[900,400,560,700],"nn-faucet-black":[1100,400,560,700,840,1000],"nn-faucet-nickel":[1100,400,560,700,840,1000],"nn-faucet":[1100,400,560,700,840,1000],"nn-toilet":[1100,400,560,700,840,1000],"nn-tub":[1100,400,560,700,840,1000],"pc-bathtubs":[1100,400,560,700,840,1000],"pc-faucets-black":[1100,400,560,700,840,1000],"pc-faucets-nickel":[1100,400,560,700,840,1000],"pc-faucets":[1100,400,560,700,840,1000],"pc-showers-black":[1100,400,560,700,840,1000],"pc-showers-nickel":[1100,400,560,700,840,1000],"pc-showers":[1100,400,560,700,840,1000],"pc-vanities":[1100,400,560,700,840,1000],"pd-blend":[1424,400,560,700,840,1000],"pd-c1":[904,400,560,700],"pd-c2":[908,400,560,700],"pd-c3":[908,400,560,700],"pd-dim":[708,400,560],"pd-main":[1248,400,560,700,840,1000],"pd-room":[1116,400,560,700,840,1000],"plant":[820,400,560,700],"showroom-hero":[2048,400,560,700,840,1000,1400],"story":[1460,400,560,700,840,1000],"tub-01":[684,400,560],"tub-02":[600,400],"tub-03":[600,400],"tub-04":[632,400,560],"tub-05":[684,400,560],"tub-06":[600,400],"tub-07":[600,400],"tub-08":[632,400,560],"tub-09":[684,400,560],"tub-10":[600,400],"tub-11":[600,400],"tub-12":[632,400,560],"why-tub":[1672,400,560,700,840,1000,1400],"ym-1":[688,400,560],"ym-2":[684,400,560],"ym-3":[684,400,560],"ym-4":[680,400,560]};
const imgSet = (n, sizes = '(max-width: 680px) 92vw, 33vw') => {
  const v = IMG_VARIANTS[n];
  return v ? ` srcset="${v.slice(1).map((w) => `img/${n}-${w}.webp ${w}w`).join(', ')}, img/${n}.webp ${v[0]}w" sizes="${sizes}"` : '';
};
window.imgSet = imgSet;

const PAGE = document.body.dataset.page || 'home';

/* Social brand glyphs (filled, Simple Icons) for the footer */
const SOCIAL = {
  facebook: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
  instagram: 'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077',
  x: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
};
const social = (k) => `<svg class="so-ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${SOCIAL[k]}"/></svg>`;
/* Payment method badges (simplified marks; swap for official artwork from each provider's brand kit) */
const MARK = {
  applePay: 'M2.15 4.318a42.16 42.16 0 0 0-.454.003c-.15.005-.303.013-.452.04a1.44 1.44 0 0 0-1.06.772c-.07.138-.114.278-.14.43-.028.148-.037.3-.04.45A10.2 10.2 0 0 0 0 6.222v11.557c0 .07.002.138.003.207.004.15.013.303.04.452.027.15.072.291.142.429a1.436 1.436 0 0 0 .63.63c.138.07.278.115.43.142.148.027.3.036.45.04l.208.003h20.194l.207-.003c.15-.004.303-.013.452-.04.15-.027.291-.071.428-.141a1.432 1.432 0 0 0 .631-.631c.07-.138.115-.278.141-.43.027-.148.036-.3.04-.45.002-.07.003-.138.003-.208l.001-.246V6.221c0-.07-.002-.138-.004-.207a2.995 2.995 0 0 0-.04-.452 1.446 1.446 0 0 0-1.2-1.201 3.022 3.022 0 0 0-.452-.04 10.448 10.448 0 0 0-.453-.003zm0 .512h19.942c.066 0 .131.002.197.003.115.004.25.01.375.032.109.02.2.05.287.094a.927.927 0 0 1 .407.407.997.997 0 0 1 .094.288c.022.123.028.258.031.374.002.065.003.13.003.197v11.552c0 .065 0 .13-.003.196-.003.115-.009.25-.032.375a.927.927 0 0 1-.5.693 1.002 1.002 0 0 1-.286.094 2.598 2.598 0 0 1-.373.032l-.2.003H1.906c-.066 0-.133-.002-.196-.003a2.61 2.61 0 0 1-.375-.032c-.109-.02-.2-.05-.288-.094a.918.918 0 0 1-.406-.407 1.006 1.006 0 0 1-.094-.288 2.531 2.531 0 0 1-.032-.373 9.588 9.588 0 0 1-.002-.197V6.224c0-.065 0-.131.002-.197.004-.114.01-.248.032-.375.02-.108.05-.199.094-.287a.925.925 0 0 1 .407-.406 1.03 1.03 0 0 1 .287-.094c.125-.022.26-.029.375-.032.065-.002.131-.002.196-.003zm4.71 3.7c-.3.016-.668.199-.88.456-.191.22-.36.58-.316.918.338.03.675-.169.888-.418.205-.258.345-.603.308-.955zm2.207.42v5.493h.852v-1.877h1.18c1.078 0 1.835-.739 1.835-1.812 0-1.07-.742-1.805-1.808-1.805zm.852.719h.982c.739 0 1.161.396 1.161 1.089 0 .692-.422 1.092-1.164 1.092h-.979zm-3.154.3c-.45.01-.83.28-1.05.28-.235 0-.593-.264-.981-.257a1.446 1.446 0 0 0-1.23.747c-.527.908-.139 2.255.374 2.995.249.366.549.769.944.754.373-.014.52-.242.973-.242.454 0 .586.242.98.235.41-.007.667-.366.915-.733.286-.417.403-.82.41-.841-.007-.008-.79-.308-.797-1.209-.008-.754.615-1.113.644-1.135-.352-.52-.9-.578-1.09-.593a1.123 1.123 0 0 0-.092-.002zm8.204.397c-.99 0-1.606.533-1.652 1.256h.777c.072-.358.369-.586.845-.586.502 0 .803.266.803.711v.309l-1.097.064c-.951.054-1.488.484-1.488 1.184 0 .72.548 1.207 1.332 1.207.526 0 1.032-.281 1.264-.727h.019v.659h.788v-2.76c0-.803-.62-1.317-1.591-1.317zm1.94.072l1.446 4.009c0 .003-.073.24-.073.247-.125.41-.33.571-.711.571-.069 0-.206 0-.267-.015v.666c.06.011.267.019.335.019.83 0 1.226-.312 1.568-1.283l1.5-4.214h-.868l-1.012 3.259h-.015l-1.013-3.26zm-1.167 2.189v.316c0 .521-.45.917-1.024.917-.442 0-.731-.228-.731-.579 0-.342.278-.56.769-.593z',
  apple: 'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701',
  gG: 'M3.963 7.235A3.963 3.963 0 00.422 9.419a3.963 3.963 0 000 3.559 3.963 3.963 0 003.541 2.184c1.07 0 1.97-.352 2.627-.957.748-.69 1.18-1.71 1.18-2.916a4.722 4.722 0 00-.07-.806H3.964v1.526h2.14a1.835 1.835 0 01-.79 1.205c-.356.241-.814.379-1.35.379-1.034 0-1.911-.697-2.225-1.636a2.375 2.375 0 010-1.517c.314-.94 1.191-1.636 2.225-1.636a2.152 2.152 0 011.52.594l1.132-1.13a3.808 3.808 0 00-2.652-1.033z',
  gPay: 'M10.464 7.785v6.9h.886V11.89h1.465c.603 0 1.11-.196 1.522-.588a1.911 1.911 0 00.635-1.464 1.92 1.92 0 00-.635-1.456 2.125 2.125 0 00-1.522-.598zm2.427.85a1.156 1.156 0 01.823.365 1.176 1.176 0 010 1.686 1.171 1.171 0 01-.877.357H11.35V8.635h1.487a1.156 1.156 0 01.054 0zm4.124 1.175c-.842 0-1.477.308-1.907.925l.781.491c.288-.417.68-.626 1.175-.626a1.255 1.255 0 01.856.323 1.009 1.009 0 01.366.785v.202c-.34-.193-.774-.289-1.3-.289-.617 0-1.11.145-1.479.434-.37.288-.554.677-.554 1.165a1.476 1.476 0 00.525 1.156c.35.308.785.463 1.305.463.61 0 1.098-.27 1.465-.81h.038v.655h.848v-2.909c0-.61-.19-1.09-.568-1.44-.38-.35-.896-.525-1.551-.525zm2.263.154l1.946 4.422-1.098 2.38h.915L24 9.963h-.965l-1.368 3.391h-.02l-1.406-3.39zm-2.146 2.368c.494 0 .88.11 1.156.33 0 .372-.147.696-.44.973a1.413 1.413 0 01-.997.414 1.081 1.081 0 01-.69-.232.708.708 0 01-.293-.578c0-.257.12-.47.363-.647.24-.173.54-.26.9-.26Z',
};
/* Google "G" in its four brand colours: wedges clipped to the G outline */
let gN = 0;
const gLetter = (id = 'gclip' + (++gN)) => `<clipPath id="${id}"><path d="${MARK.gG}"/></clipPath><g clip-path="url(#${id})"><path fill="#ea4335" d="M3.96 11.2-1 8.5V6h10v2.2z"/><path fill="#fbbc04" d="M3.96 11.2-1 13.6V8.5z"/><path fill="#34a853" d="M3.96 11.2-1 13.6V16h10v-2.5z"/><path fill="#4285f4" d="M3.96 11.2 9 8.2v5.3z"/></g>`;
const PAY = {
  visa: '<svg viewBox="0 0 48 30" aria-label="Visa" role="img"><rect width="48" height="30" rx="4" fill="#fff"/><text x="24" y="20" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="13" font-weight="900" font-style="italic" fill="#1a1f71" letter-spacing=".5">VISA</text></svg>',
  mastercard: '<svg viewBox="0 0 48 30" aria-label="Mastercard" role="img"><rect width="48" height="30" rx="4" fill="#fff"/><circle cx="19.5" cy="15" r="8.5" fill="#eb001b"/><circle cx="28.5" cy="15" r="8.5" fill="#f79e1b"/><path d="M24 7.8a8.5 8.5 0 0 1 0 14.4 8.5 8.5 0 0 1 0-14.4Z" fill="#ff5f00"/></svg>',
  amex: '<svg viewBox="0 0 48 30" aria-label="American Express" role="img"><rect width="48" height="30" rx="4" fill="#2e77bc"/><text x="24" y="19" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="10" font-weight="900" fill="#fff" letter-spacing=".6">AMEX</text></svg>',
  paypal: '<svg viewBox="0 0 48 30" aria-label="PayPal" role="img"><rect width="48" height="30" rx="4" fill="#fff"/><text x="24" y="19" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="10.5" font-weight="800" font-style="italic"><tspan fill="#003087">Pay</tspan><tspan fill="#009cde">Pal</tspan></text></svg>',
  applepay: `<svg viewBox="0 0 48 30" aria-label="Apple Pay" role="img"><rect x="1" y="1" width="46" height="28" rx="4" fill="#fff"/><path transform="translate(.6 -8.4) scale(1.95)" d="${MARK.applePay}"/></svg>`,
  gpay: () => `<svg viewBox="0 0 48 30" aria-label="Google Pay" role="img"><rect width="48" height="30" rx="4" fill="#fff"/><g transform="translate(6.4 -2.8) scale(1.45)">${gLetter()}<path fill="#5f6368" d="${MARK.gPay}"/></g></svg>`,
};
/* Express checkout buttons (cart + checkout): brand marks instead of plain text */
document.querySelectorAll('.xp-apple').forEach((b) => { b.setAttribute('aria-label', 'Apple Pay'); b.innerHTML = `<svg viewBox="0 0 24 24" class="xp-apple-logo" aria-hidden="true"><path fill="currentColor" d="${MARK.apple}"/></svg><span>Pay</span>`; });
document.querySelectorAll('.xp-gpay').forEach((b) => { b.setAttribute('aria-label', 'Google Pay'); b.innerHTML = `<svg viewBox="0 7 24 10.6" class="xp-gpay-logo" aria-hidden="true">${gLetter()}<path fill="#5f6368" d="${MARK.gPay}"/></svg>`; });
const payIcons = (keys = Object.keys(PAY)) => `<div class="pay-badges" aria-label="Accepted payment methods">${keys.map((k) => (typeof PAY[k] === 'function' ? PAY[k]() : PAY[k])).join('')}</div>`;
window.payIcons = payIcons;
const { money } = BLISS;
const price = (cad, whole) => `<span class="notranslate" translate="no" data-price="${cad}"${whole ? ' data-whole' : ''}>${money(cad, whole)}</span>`;
window.price = price;
/* Product price: sale price + struck-through regular price when on sale */
const priceOf = (p, qty = 1) => BLISS.onSale(p)
  ? `<span class="sale-price">${price(p.cad * qty)}</span> <del class="was-price" aria-label="Regular price">${price(p.was * qty)}</del>`
  : price(p.cad * qty);
const badgeOf = (p) => BLISS.onSale(p) ? `<span class="badge sale">Sale −${BLISS.pctOff(p)}%</span>` : p.tag ? `<span class="badge">${p.tag}</span>` : '';
window.priceOf = priceOf;
window.badgeOf = badgeOf;

/* ---------- Header ---------- */
const NAV = [
  ['Bath', 'collection.html'], ['Kitchen', 'search.html?cat=Kitchen'], ['Appliances', 'search.html?cat=Appliances'],
  ['Lighting', 'search.html?cat=Lighting'], ['Furniture', 'search.html?cat=Furniture'], ['Outdoor', 'search.html?cat=Outdoor'],
  ['Brands', 'brands.html'], ['Sale', 'search.html?q=sale'],
];
const navActive = { collection: 'Bath', product: 'Bath', brands: 'Brands', brand: 'Brands', };
const navLink = ([n, href]) => `<a href="${href}" class="${n === 'Sale' ? 'sale' : ''}${navActive[PAGE] === n ? ' active' : ''}">${n}</a>`;

/* Category link lists: shared by the mega menu, mobile menu and footer (keep every SEO link) */
const sq = (t) => `search.html?q=${encodeURIComponent(t)}`;
const L = (t, h) => [t, h || sq(t)];
const LINKS = {
  bathroom: [L('Bathroom Faucets'), L('Bathroom Vanities'), L('Bathroom Fixtures'), L('Floor Mounted Tub Fillers'), L('Freestanding Tub Fillers'), L('LED Mirrors'), L('LED Medicine Cabinets'), L('Towel Warmers')],
  showers: [L('Shower Bases'), L('Shower Doors'), L('Sliding Shower Doors'), L('Shower Kits'), L('Thermostatic Shower Systems'), L('Smart Toilets'), L('Wall Hung Toilets')],
  bathtubs: [L('Bathtubs', 'collection.html'), L('Freestanding Bathtubs', 'collection.html'), L('Clawfoot Bathtubs'), L('Corner Bathtubs'), L('Cast Iron Bathtubs'), L('Non Standard Bathtubs'), L('Oval Bathtubs'), L('Japanese Bathtubs')],
  kFaucets: [L('Kitchen Faucets'), L('Single Hole Kitchen Faucets'), L('Pot Fillers'), L('Touchless Kitchen Faucets'), L('Bridge Kitchen Faucets')],
  kSinks: [L('Kitchen Sinks'), L('Apron Kitchen Sinks'), L('Farmhouse Kitchen Sinks'), L('Undermount Kitchen Sinks'), L('Workstation Sinks'), L('Granite Undermount Kitchen Sinks')],
  kMore: [L('Kitchen Appliances', 'search.html?cat=Appliances'), L('Soap Dispensers')],
  cooking: [L('Ranges'), L('Cooktops'), L('Wall Ovens'), L('Outdoor Grills')],
  refrig: [L('Refrigerators'), L('French Door Refrigerators'), L('Wine Storage')],
  vent: [L('Range Hoods'), L('Downdraft Ventilation')],
  outdoor: [L('Outdoor Grills'), L('Built-in Grills'), L('Outdoor Kitchens'), L('Smokers & Kamado Grills'), L('Pizza Ovens'), L('Outdoor Refrigeration')],
  outdoorMore: [L('Blaze', 'brand.html?b=blaze'), L('Kamado Joe', 'brand.html?b=kamado-joe'), L('Grill Accessories'), L('Outdoor Lighting')],
  lighting: [L('Chandeliers'), L('Pendants'), L('Vanity Lights'), L('Wall Sconces')],
  furniture: [L('Living', 'search.html?cat=Furniture'), L('Dining', 'search.html?cat=Furniture'), L('Bedroom', 'search.html?cat=Furniture'), L('Mirrors')],
  brands: BLISS.brands.filter((b) => b.featured).map((b) => L(b.name, `brand.html?b=${b.slug}`)),
};
const linkList = (items) => `<ul>${items.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>`;
const megaCol = (title, items) => `<div class="mega-col"><h4>${title}</h4>${linkList(items)}</div>`;
const megaFeature = (img, eyebrow, title, href) => `
  <a class="mega-feature" href="${href}"><span class="mf-img"><img src="img/${img}.webp"${imgSet(img, '280px')} alt="" loading="lazy"></span><span class="eyebrow">${eyebrow}</span><b>${title}</b><span class="link-arrow">Shop now ${icon('arrow', 'sm')}</span></a>`;
const MEGA = {
  Bath: [megaCol('Bathroom', LINKS.bathroom), megaCol('Showers &amp; Toilets', LINKS.showers), megaCol('Bathtubs', LINKS.bathtubs),
    megaFeature('cat-bath', 'Featured', 'Freestanding Bathtubs', 'collection.html')],
  Kitchen: [megaCol('Kitchen Faucets', LINKS.kFaucets), megaCol('Kitchen Sinks', LINKS.kSinks), megaCol('More for the Kitchen', LINKS.kMore),
    megaFeature('cat-kitchen', 'Shop the look', 'The Contemporary Kitchen', 'search.html?cat=Kitchen')],
  Appliances: [megaCol('Cooking', LINKS.cooking), megaCol('Refrigeration', LINKS.refrig), megaCol('Ventilation', LINKS.vent),
    megaFeature('mega-appliances', 'Italian excellence', 'ILVE Ranges', sq('ILVE'))],
  Lighting: [megaCol('Lighting', LINKS.lighting), megaCol('Shop by Finish', [L('Warm Brass', sq('brass')), L('Polished Nickel', sq('nickel')), L('Matte Black', sq('black'))]),
    megaFeature('mega-lighting', 'New arrivals', 'Lighting for Every Room', 'search.html?cat=Lighting')],
  Furniture: [megaCol('Furniture', LINKS.furniture), megaCol('Need Help?', [L('Design Services', 'contact.html?topic=design'), L('Visit Our Showroom', 'showroom.html')]),
    megaFeature('mega-furniture', 'Coming soon', 'The Furniture Collection', 'search.html?cat=Furniture')],
  Brands: [`<div class="mega-col wide"><h4>Featured Brands</h4><ul class="mega-brands">${LINKS.brands.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul><a class="link-arrow" href="brands.html" style="margin-top:16px">View all ${BLISS.brands.length} brands ${icon('arrow', 'sm')}</a></div>`,
    megaFeature('mega-brands', 'The brands you love', 'All in One Place', 'brands.html')],
  Outdoor: [megaCol('Outdoor Cooking', LINKS.outdoor), megaCol('Brands &amp; More', LINKS.outdoorMore), megaCol('Get Inspired', [L('Shop the Look', 'shop-the-look.html'), L('The Journal', 'blog.html'), L('Design Services', 'contact.html?topic=design')]),
    megaFeature('mega-outdoor', 'New season', 'Outdoor Kitchens', 'search.html?cat=Outdoor')],
};
const navItem = ([n, href]) => MEGA[n] ? `
  <div class="nav-item" data-mega>
    <a href="${href}" class="nav-link${navActive[PAGE] === n ? ' active' : ''}" aria-haspopup="true" aria-expanded="false">${n}</a>
    <div class="mega" role="region" aria-label="${n} menu"><div class="wrap mega-inner">${MEGA[n].join('')}</div>
      <div class="mega-foot"><div class="wrap"><a href="${href}" class="link-arrow">Shop all ${n} ${icon('arrow', 'sm')}</a><span>${icon('truck', 'sm')} Free shipping on eligible orders · Canada &amp; USA</span></div></div></div>
  </div>` : `<div class="nav-item">${navLink([n, href])}</div>`;
const mobileItem = ([n, href]) => MEGA[n]
  ? `<details class="m-group"><summary>${n}${icon('down', 'sm')}</summary><div>${MEGA[n].filter((c) => c.includes('mega-col')).join('')}<a class="m-all" href="${href}">Shop all ${n} ${icon('arrow', 'sm')}</a></div></details>`
  : navLink([n, href]);

const currencyMenu = (id) => `
<div class="cur" data-cur>
  <button class="cur-btn" aria-haspopup="listbox" aria-expanded="false" aria-controls="${id}">
    <span class="cur-flag" data-currency-flag></span><span class="sr-only">Currency: </span><span data-currency-label>${BLISS.currency}</span>${icon('down', 'sm')}
  </button>
  <ul class="cur-menu" id="${id}" role="listbox" aria-label="Currency">
    <li role="option" data-set-cur="CAD"><span class="cur-flag ca"></span><b>CAD $</b><small>Canadian dollar</small></li>
    <li role="option" data-set-cur="USD"><span class="cur-flag us"></span><b>USD $</b><small>US dollar</small></li>
  </ul>
</div>`;

/* Languages offered through Google Translate (codes are Google's) */
const LANGS = [['en', 'EN', 'English'], ['ar', 'AR', 'العربية'], ['zh-CN', 'ZH-CN', '中文 (简体)'], ['nl', 'NL', 'Nederlands'], ['fr', 'FR', 'Français'],
  ['de', 'DE', 'Deutsch'], ['it', 'IT', 'Italiano'], ['pt', 'PT', 'Português'], ['ru', 'RU', 'Русский'], ['es', 'ES', 'Español']];
const curLang = () => { try { return localStorage.getItem('bliss_lang') || 'en'; } catch { return 'en'; } };
const langMenu = (id) => `
<div class="cur lang notranslate" data-cur translate="no">
  <button class="cur-btn" aria-haspopup="listbox" aria-expanded="false" aria-controls="${id}">
    ${icon('globe', 'sm')}<span class="sr-only">Language: </span><span data-lang-label>${(LANGS.find((l) => l[0] === curLang()) || LANGS[0])[1]}</span>${icon('down', 'sm')}
  </button>
  <ul class="cur-menu lang-menu" id="${id}" role="listbox" aria-label="Language">
    ${LANGS.map(([code, short, name]) => `<li role="option" data-set-lang="${code}" lang="${code}" aria-selected="${code === curLang()}"><b>${short}</b><small>${name}</small></li>`).join('')}
  </ul>
</div>`;

const headerHTML = `
<a class="skip" href="#main">Skip to content</a>
<div class="topbar"><div class="wrap">
  <div class="left"><span>Free shipping on eligible orders · Canada &amp; USA</span><span>Design services available</span></div>
  <div class="right"><a href="trade.html">Trade program</a><a href="showroom.html">Showroom</a><a href="contact.html">Contact</a>${langMenu('langTop')}${currencyMenu('curTop')}</div>
</div></div>
<header class="site-header"><div class="wrap">
  <button class="menu-toggle" aria-label="Open menu">${icon('menu')}</button>
  <a class="logo notranslate" translate="no" href="index.html" aria-label="Bliss Bath and Kitchen home"><img class="logo-img" src="img/logo-400.webp" srcset="img/logo-260.webp 260w, img/logo-400.webp 400w, img/logo.webp 1070w" sizes="(max-width: 680px) 127px, 165px" alt="Bliss Bath and Kitchen" width="1070" height="337" fetchpriority="high"></a>
  <nav class="main-nav" aria-label="Main">${NAV.map(navItem).join('')}</nav>
  <div class="header-actions">
    <button aria-label="Search (press /)" data-open-search>${icon('search')}</button>
    <a href="account.html" aria-label="My account" class="hide-sm acct-link">${icon('user')}<span class="acct-dot" data-acct-dot hidden></span></a>
    <a href="wishlist.html" aria-label="Wishlist" class="hide-sm">${icon('heart')}<span class="cart-count wish-count" data-wish-count hidden>0</span></a>
    <button data-open-cart>${icon('bag')}<span class="sr-only">Cart, </span><span class="cart-count" data-cart>0</span><span class="sr-only"> items</span></button>
  </div>
</div></header>
<div class="mobile-nav"><div class="scrim"></div><nav aria-label="Mobile">
  <button class="close" aria-label="Close menu">${icon('close')}</button>
  ${NAV.map(mobileItem).join('')}
  <a href="account.html">My Account</a><a href="wishlist.html">Wishlist <span class="m-count" data-wish-count hidden>0</span></a><a href="about.html">Our Story</a><a href="trade.html">Trade program</a><a href="showroom.html">Showroom</a><a href="contact.html">Contact</a>
  <div class="m-cur"><span>Language</span>${langMenu('langMobile')}</div>
  <div class="m-cur"><span>Currency</span>${currencyMenu('curMobile')}</div>
</nav></div>`;

/* Services bar — copy from the client content document */
const trustHTML = `
<section class="trust"><div class="wrap">
  <a class="trust-item" href="contact.html">${icon('compass')}<div><strong>Design Expertise</strong><span>Guidance from product &amp; design specialists</span></div></a>
  <a class="trust-item" href="trade.html">${icon('building')}<div><strong>Trade Program</strong><span>Exclusive benefits for industry professionals</span></div></a>
  <a class="trust-item" href="showroom.html">${icon('store')}<div><strong>Visit Our Showroom</strong><span>Experience our collections in Markham</span></div></a>
  <a class="trust-item" href="shipping.html">${icon('truck')}<div><strong>Canada &amp; USA Shipping</strong><span>Delivery across North America</span></div></a>
</div></section>`;

const newsletterHTML = `
<section class="newsletter"><div class="wrap">
  <div><span class="eyebrow">Stay inspired</span><h2>Join the Bliss List</h2>
  <p>Be the first to discover new collections, designer favourites, exclusive offers and inspiration for the home.</p></div>
  <form class="nl-form" onsubmit="event.preventDefault(); toast('Thanks — you\\'re on the Bliss List.'); this.reset();">
    <input type="email" required placeholder="Enter your email address" aria-label="Email address">
    <button class="btn" type="submit">Subscribe ${icon('arrow', 'sm')}</button>
  </form>
</div></section>`;

const col = (title, items) => `<h2 class="f-h">${title}</h2><ul>${items.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>`;
const PAGES = [
  ['Home', 'index.html', 'home'], ['Collection', 'collection.html', 'collection'], ['Product', 'product.html', 'product'],
  ['Search / Shop', 'search.html?q=tub', 'search'], ['Cart', 'cart.html', 'cart'], ['Wishlist', 'wishlist.html', 'wishlist'], ['Login / Register', 'account.html', 'account'], ['Forgot password', 'account.html?view=lost-password', 'account-lost'], ['Checkout', 'checkout.html', 'checkout'],
  ['Order confirmed', 'order-confirmed.html', 'confirmed'], ['Our Story', 'about.html', 'about'], ['Contact', 'contact.html', 'contact'],
  ['Trade Program', 'trade.html', 'trade'], ['Project Inquiries', 'projects.html', 'projects'], ['Showroom', 'showroom.html', 'showroom'],
  ['Brands', 'brands.html', 'brands'], ['Brand page', 'brand.html?b=victoria-albert', 'brand'], ['Shop the Look', 'shop-the-look.html', 'looks'], ['Look detail', 'look.html?look=dark-drama', 'look'], ['Blog', 'blog.html', 'blog'], ['Blog article', 'blog-post.html', 'blog-post'], ['Terms & Conditions', 'terms.html', 'terms'], ['Returns', 'returns.html', 'returns'], ['Shipping Policy', 'shipping.html', 'shipping'], ['Privacy Policy', 'privacy.html', 'privacy'],
];
const footerHTML = `
<footer class="site-footer"><div class="wrap">
  <div class="f-brand"><a class="logo notranslate" translate="no" href="index.html"><img class="logo-img" src="img/logo-light-400.webp" srcset="img/logo-light-260.webp 260w, img/logo-light-400.webp 400w, img/logo-light.webp 1070w" sizes="(max-width: 680px) 159px, 197px" alt="Bliss Bath and Kitchen" width="1070" height="337" loading="lazy" decoding="async"></a></div>
  <div class="f-cols f-one">
    <div>${col('Bathroom Products', [L('Bathroom Faucets'), L('Bathroom Vanities'), L('Bathroom Fixtures'), L('Floor Mounted Tub Fillers'), L('Smart Toilets'), L('Freestanding Tub Fillers'), L('LED Mirrors'), L('LED Medicine Cabinets'), L('Shower Bases'), L('Shower Doors'), L('Shower Kits'), L('Thermostatic Shower Systems'), L('Sliding Shower Doors'), L('Wall Hung Toilets'), L('Towel Warmers')])}</div>
    <div>${col('Bathtubs', LINKS.bathtubs)}${col('Lighting', LINKS.lighting)}</div>
    <div>${col('Kitchen Products', [L('Kitchen Faucets'), L('Single Hole Kitchen Faucets'), L('Pot Fillers'), L('Kitchen Sinks'), L('Apron Kitchen Sinks'), L('Farmhouse Kitchen Sinks'), L('Undermount Kitchen Sinks'), L('Workstation Sinks'), L('Granite Undermount Kitchen Sinks'), L('Kitchen Appliances', 'search.html?cat=Appliances'), L('Touchless Kitchen Faucets'), L('Bridge Kitchen Faucets'), L('Soap Dispensers')])}</div>
    <div>${col('Appliances', [...LINKS.cooking, LINKS.refrig[0], LINKS.vent[0]])}${col('Furniture', LINKS.furniture)}</div>
    <div>${col('Discover', [['Our Story', 'about.html'], ['Brands', 'brands.html'], ['Shop the Look', 'shop-the-look.html'], ['New Arrivals', 'search.html?q=new'], ['Best Sellers', 'search.html?q=best'], ['Sale', 'search.html?q=sale'], ['Design Services', 'contact.html?topic=design'], ['Visit Our Showroom', 'showroom.html'], ['Blogs', 'blog.html']])}</div>
    <div class="f-contact-col">${col('Customer Care', [['About Us', 'about.html'], ['Contact Us', 'contact.html'], ['Return Policy', 'returns.html'], ['Shipping Policy', 'shipping.html'], ['Terms &amp; Conditions', 'terms.html'], ['Trade Program', 'trade.html'], ['Project Inquiries', 'projects.html']])}
      <ul class="f-contact">
        <li>${icon('pin')}<span>5 Shields Court, Unit 104<br>Markham, Ontario</span></li>
        <li>${icon('phone')}<a href="tel:18553661001">1-855-366-1001</a></li>
        <li>${icon('mail')}<a href="mailto:admin@blissbathandkitchen.com">Email us</a></li>
      </ul></div>
  </div>
  <div class="f-social"><span>Follow us</span><div class="socials">
    <a href="#" aria-label="Facebook">${social('facebook')}</a><a href="#" aria-label="Instagram">${social('instagram')}</a><a href="#" aria-label="X (Twitter)">${social('x')}</a>
  </div></div>
  <div class="f-pay"><span>We accept</span>${payIcons()}</div>
  <div class="f-bottom">
    <div class="f-legal"><span>© 2026 Bliss Bath and Kitchen. All rights reserved.</span>
      <a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms &amp; Conditions</a><button type="button" data-cookie-prefs>Cookie Preferences</button><button type="button" data-cookie-prefs="optout">Do Not Sell or Share My Personal Information</button></div>
    <div class="region">${langMenu('langFoot')}${currencyMenu('curFoot')}</div>
  </div>
</div></footer>
<div class="toast" role="status" aria-live="polite">${icon('check')}<span></span></div>
<details class="proto-badge"><summary>Prototype pages ${icon('up', 'sm')}</summary>
  <nav>${PAGES.map(([t, h, k]) => `<a href="${h}" class="${PAGE === k ? 'on' : ''}">${t}</a>`).join('')}</nav>
</details>`;

/* ---------- Cart drawer + search overlay shells ---------- */
const drawerHTML = `
<div class="drawer-scrim" data-close-cart></div>
<aside class="drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-labelledby="cartTitle" aria-hidden="true">
  <header class="drawer-head"><h2 id="cartTitle">Your Cart <span data-cart-label></span></h2><button aria-label="Close cart" data-close-cart>${icon('close')}</button></header>
  <div class="drawer-ship" id="drawerShip"></div>
  <div class="drawer-body" id="drawerBody"></div>
  <footer class="drawer-foot" id="drawerFoot"></footer>
</aside>`;

const searchHTML = `
<div class="search-ov" id="searchOv" role="dialog" aria-modal="true" aria-label="Search" aria-hidden="true">
  <div class="search-top"><div class="wrap">
    <form class="search-bar" action="search.html" role="search">
      ${icon('search')}
      <input id="searchInput" name="q" type="search" autocomplete="off" spellcheck="false" placeholder="Search products, brands, finishes…" aria-label="Search" aria-controls="searchResults">
      <kbd class="hide-sm">ESC</kbd>
      <button type="button" class="search-close" data-close-search aria-label="Close search">${icon('close')}</button>
    </form>
  </div></div>
  <div class="search-body"><div class="wrap" id="searchResults"></div></div>
</div>`;

const mount = (sel, html) => { const el = document.querySelector(sel); if (el) el.outerHTML = html; };
mount('#site-header', headerHTML);
mount('#trust', trustHTML);
mount('#newsletter', newsletterHTML);
const MINIMAL = document.body.hasAttribute('data-minimal');
const minimalFooterHTML = `
<footer class="co-min-foot"><div class="wrap">
  <a href="returns.html">Returns</a><a href="shipping.html">Shipping policy</a><a href="privacy.html">Privacy policy</a><button type="button" data-cookie-prefs>Cookie preferences</button><a href="contact.html">Contact</a><a href="tel:18553661001">1-855-366-1001</a>
  <span>© 2026 Bliss Bath and Kitchen</span>
</div></footer>
<div class="toast" role="status" aria-live="polite">${icon('check')}<span></span></div>
<details class="proto-badge"><summary>Prototype pages ${icon('up', 'sm')}</summary>
  <nav>${PAGES.map(([t, h, k]) => `<a href="${h}" class="${PAGE === k ? 'on' : ''}">${t}</a>`).join('')}</nav>
</details>`;
mount('#site-footer', (MINIMAL ? minimalFooterHTML : footerHTML) + drawerHTML + searchHTML);
if (!document.querySelector('main')?.id) document.querySelector('main')?.setAttribute('id', 'main');

/* Render any <i data-icon="name"> placeholders */
function renderIcons(root = document) {
  root.querySelectorAll('i[data-icon]').forEach((el) => { el.outerHTML = icon(el.dataset.icon, el.className || ''); });
}
renderIcons();
window.renderIcons = renderIcons;
document.querySelectorAll('[data-pay]').forEach((el) => { el.outerHTML = payIcons(el.dataset.pay.split(',')); });

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg, action) {
  const t = document.querySelector('.toast');
  t.querySelector('span').textContent = msg;
  t.querySelector('.toast-act')?.remove();
  if (action) {
    const a = document.createElement('a');
    a.className = 'toast-act'; a.href = action.href; a.textContent = action.label;
    t.append(a);
  }
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), action ? 3600 : 2600);
}
window.toast = toast;

/* ---------- Currency switcher ---------- */
function syncCurrencyUI() {
  document.querySelectorAll('[data-currency-flag]').forEach((f) => (f.className = 'cur-flag ' + (BLISS.currency === 'CAD' ? 'ca' : 'us')));
  document.querySelectorAll('[data-set-cur]').forEach((li) => li.setAttribute('aria-selected', li.dataset.setCur === BLISS.currency));
}
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.cur-btn');
  document.querySelectorAll('[data-cur].open').forEach((c) => { if (!btn || !c.contains(btn)) { c.classList.remove('open'); c.querySelector('.cur-btn').setAttribute('aria-expanded', false); } });
  if (btn) {
    const c = btn.closest('[data-cur]'); c.classList.toggle('open'); btn.setAttribute('aria-expanded', c.classList.contains('open'));
  }
  const opt = e.target.closest('[data-set-cur]');
  if (opt) {
    BLISS.setCurrency(opt.dataset.setCur);
    syncCurrencyUI();
    toast(opt.dataset.setCur === 'CAD' ? 'Prices now shown in Canadian dollars' : 'Prices now shown in US dollars');
  }
});
syncCurrencyUI();
BLISS.refreshPrices();

/* ---------- Cart drawer ---------- */
const drawer = document.getElementById('cartDrawer');
let lastFocus;
function openCart() {
  lastFocus = document.activeElement;
  renderDrawer();
  document.body.classList.add('cart-open');
  drawer.setAttribute('aria-hidden', 'false');
  setTimeout(() => drawer.querySelector('[data-close-cart]').focus(), 50);
}
function closeCart() {
  document.body.classList.remove('cart-open');
  drawer.setAttribute('aria-hidden', 'true');
  lastFocus?.focus?.();
}
window.openCart = openCart;

const qtyControl = (l) => `
  <div class="qty sm" data-line="${l.id}|${esc(l.variant)}">
    <button type="button" data-step="-1" aria-label="Decrease quantity">−</button>
    <input value="${l.qty}" inputmode="numeric" aria-label="Quantity">
    <button type="button" data-step="1" aria-label="Increase quantity">+</button>
  </div>`;
window.qtyControl = qtyControl;

function shipNote() {
  if (!BLISS.cart.count()) return '';
  return BLISS.cart.hasFreight()
    ? `${icon('truck', 'sm')}<span>Shipping for this order is <b>calculated at checkout</b>. We confirm delivery details by email before processing.</span>`
    : `${icon('check', 'sm')}<span>Your order qualifies for <b>free standard shipping</b> across Canada &amp; USA.</span>`;
}

function renderDrawer() {
  const items = BLISS.cart.items();
  const count = BLISS.cart.count();
  drawer.querySelector('[data-cart-label]').textContent = count ? `(${count})` : '';
  document.getElementById('drawerShip').innerHTML = shipNote();
  document.getElementById('drawerShip').hidden = !count;
  const body = document.getElementById('drawerBody');
  const foot = document.getElementById('drawerFoot');
  if (!items.length) {
    body.innerHTML = `<div class="drawer-empty">
      ${icon('bag', 'lg')}<h3>Your cart is empty</h3><p>Discover pieces curated for beautiful living.</p>
      <a class="btn" href="collection.html">Shop Bathtubs ${icon('arrow', 'sm')}</a>
      <div class="drawer-cats"><a href="search.html?cat=Kitchen">Kitchen</a><a href="search.html?cat=Appliances">Appliances</a><a href="search.html?cat=Lighting">Lighting</a><a href="search.html?q=new">New Arrivals</a></div>
    </div>`;
    foot.innerHTML = '';
    return;
  }
  const inCart = new Set(items.map((l) => l.id));
  const recs = BLISS.products.filter((p) => !inCart.has(p.id) && p.weight === 'parcel').slice(0, 3);
  body.innerHTML = `<ul class="lines">${items.map((l) => `
    <li class="line">
      <a href="product.html" class="line-img"><img src="img/${l.product.img}.webp"${imgSet(l.product.img, '96px')} alt=""></a>
      <div class="line-info">
        <span class="brand">${l.product.brand}</span>
        <a href="product.html" class="name">${l.product.name}</a>
        ${l.variant ? `<span class="variant">${esc(l.variant)}</span>` : ''}
        <div class="line-row">${qtyControl(l)}<button class="line-remove" data-remove="${l.id}|${esc(l.variant)}">Remove</button></div>
      </div>
      <div class="line-price">${priceOf(l.product, l.qty)}</div>
    </li>`).join('')}</ul>
    <div class="recs"><h4>Complete the look</h4>${recs.map((p) => `
      <div class="rec"><img src="img/${p.img}.webp"${imgSet(p.img, '80px')} alt=""><div><span class="brand">${p.brand}</span><span class="name">${p.name}</span>${priceOf(p)}</div>
      <button class="rec-add" data-add="${p.id}" aria-label="Add ${esc(p.name)} to cart">${icon('bag', 'sm')}+</button></div>`).join('')}
    </div>`;
  foot.innerHTML = `
    <details class="order-note"><summary>${icon('note', 'sm')} Add order note</summary><textarea rows="3" placeholder="Delivery instructions, project name, etc.">${esc(BLISS.store.get('bliss_note', ''))}</textarea></details>
    ${(() => { const save = BLISS.cart.items().reduce((t, l) => t + (BLISS.onSale(l.product) ? (l.product.was - l.product.cad) * l.qty : 0), 0); return save ? `<div class="save-row">${icon('tag', 'sm')} You're saving ${price(save)}</div>` : ''; })()}
    <div class="sub-row"><span>Subtotal</span><strong>${price(BLISS.cart.subtotal())} <small data-currency-suffix>${BLISS.currency === 'CAD' ? 'CAD' : ''}</small></strong></div>
    <p class="fine">Taxes and shipping calculated at checkout.</p>
    <a class="btn block" href="checkout.html">${icon('lock', 'sm')} Checkout</a>
    <a class="link-arrow center" href="cart.html">View cart ${icon('arrow', 'sm')}</a>
    ${payIcons()}`;
  foot.querySelector('textarea').addEventListener('input', (e) => BLISS.store.set('bliss_note', e.target.value));
}

function updateCartCount(animate) {
  document.querySelectorAll('[data-cart]').forEach((c) => {
    c.textContent = BLISS.cart.count();
    // restart the bump animation on the next frame instead of forcing a synchronous layout
    if (animate) { c.classList.remove('bump'); requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('bump'))); }
  });
}
document.addEventListener('cart:change', () => {
  updateCartCount(true);
  if (document.body.classList.contains('cart-open')) renderDrawer();
});
updateCartCount(false);

document.addEventListener('click', (e) => {
  if (e.target.closest('[data-open-cart]')) { e.preventDefault(); openCart(); }
  if (e.target.closest('[data-close-cart]')) closeCart();

  const add = e.target.closest('[data-add]');
  if (add) {
    e.preventDefault();
    let qty = 1, variant = '', cad = null;
    if (add.dataset.add === 'pdp') {
      qty = parseInt(document.querySelector('.buy .qty input')?.value, 10) || 1;
      if (window.PDP) {                       // variable product: every required option must be chosen
        const sel = window.PDP.selection();
        if (!sel.complete) { window.PDP.flagMissing(); toast('Please select all required product options before adding to your cart'); return; }
        variant = sel.label; cad = sel.cad;
      } else variant = document.getElementById('colourName')?.textContent || '';
    }
    const id = add.dataset.add === 'pdp' ? add.dataset.id : add.dataset.add;
    BLISS.cart.add(id, qty, variant, cad);
    add.classList.add('added');
    setTimeout(() => add.classList.remove('added'), 1200);
    if (!add.closest('.drawer')) openCart();
  }
  const rm = e.target.closest('[data-remove]');
  if (rm) { const [id, v] = rm.dataset.remove.split('|'); BLISS.cart.remove(id, v); }

  const step = e.target.closest('[data-line] [data-step]');
  if (step) {
    const wrap = step.closest('[data-line]');
    const [id, v] = wrap.dataset.line.split('|');
    const line = BLISS.cart.items().find((l) => l.id === id && l.variant === v);
    if (line) BLISS.cart.setQty(id, v, line.qty + +step.dataset.step);
  }

  const wish = e.target.closest('[data-wish]');
  if (wish) {
    e.preventDefault();
    const on = BLISS.wish.toggle(wish.dataset.wish);
    wish.classList.remove('pop'); void wish.offsetWidth; if (on) wish.classList.add('pop');
    toast(on ? 'Saved to your wishlist' : 'Removed from your wishlist', on ? { href: 'wishlist.html', label: 'View' } : null);
  }
});

/* ---------- Wishlist: keep every heart and the header count in sync ---------- */
function syncWish(root = document) {
  root.querySelectorAll('[data-wish]').forEach((b) => {
    const on = BLISS.wish.has(b.dataset.wish);
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on);
    b.setAttribute('aria-label', on ? 'Remove from wishlist' : 'Add to wishlist');
  });
  document.querySelectorAll('[data-wish-count]').forEach((c) => {
    const n = BLISS.wish.count();
    c.textContent = n; c.hidden = !n;
  });
}
window.syncWish = syncWish;
document.addEventListener('wish:change', () => syncWish());
// product grids are re-rendered by page scripts, so re-sync hearts whenever new ones appear
new MutationObserver((muts) => {
  if (muts.some((m) => [...m.addedNodes].some((n) => n.nodeType === 1 && (n.matches?.('[data-wish]') || n.querySelector?.('[data-wish]'))))) syncWish();
}).observe(document.body, { childList: true, subtree: true });
syncWish();
document.addEventListener('change', (e) => {
  const input = e.target.closest('[data-line] input');
  if (input) {
    const [id, v] = input.closest('[data-line]').dataset.line.split('|');
    BLISS.cart.setQty(id, v, parseInt(input.value, 10) || 0);
  }
});

/* ---------- Search overlay ---------- */
const searchOv = document.getElementById('searchOv');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const POPULAR = ['Freestanding tub', 'Brass kitchen faucet', 'Smart toilet', 'ILVE range', 'Matte black', 'Victoria + Albert'];
const SITE_PAGES = [
  ['Returns & Cancellations', 'returns.html', 'return refund cancel exchange damaged rga restocking'],
  ['Shipping Policy', 'shipping.html', 'shipping delivery freight pickup expedited international lead time'],
  ['Trade Program', 'trade.html', 'trade designer builder contractor pricing account'],
  ['Project Inquiries', 'projects.html', 'project quote volume pricing builder multi-unit'],
  ['Visit Our Showroom', 'showroom.html', 'showroom markham visit appointment directions hours'],
  ['My Wishlist', 'wishlist.html', 'wishlist saved favourites favorites'],
  ['My Account', 'account.html', 'account login sign in register sign up orders password'],
  ['Contact Us', 'contact.html', 'contact help phone email support'],
  ['Shop the Look', 'shop-the-look.html', 'shop the look inspiration rooms ideas'],
  ['The Journal (Blog)', 'blog.html', 'blog journal guide ideas articles'],
  ['Terms & Conditions', 'terms.html', 'terms conditions legal'],
  ['Our Brands (A–Z)', 'brands.html', 'brands manufacturers directory logos'],
  ['Our Story', 'about.html', 'about story bliss'],
  ['Privacy & Cookie Policy', 'privacy.html', 'privacy cookies personal information data consent'],
];
const SYN = { tub: 'bathtub', tubs: 'bathtub', bathtubs: 'bathtub', faucets: 'faucet', tap: 'faucet', taps: 'faucet', stove: 'range', oven: 'range', fridge: 'refrigerator', black: 'matte black b', brass: 'brass gold', gold: 'brass', light: 'lighting', lights: 'lighting' };

function haystack(p) {
  return [p.brand, p.name, p.cat, p.sub, p.material, p.finish, p.shape, p.tag,
    p.colors?.includes('#26221f') ? 'black matte black' : '', p.colors?.includes('#b8894a') ? 'brass gold' : '',
    p.colors?.includes('#c9c6c0') ? 'nickel chrome stainless' : '', p.colors?.includes('#fbfaf7') ? 'white' : '', p.tag === 'Best Seller' || p.rating >= 4.8 ? 'best seller' : ''].join(' ').toLowerCase();
}
function searchProducts(q) {
  const tokens = q.toLowerCase().replace(/[+]/g, ' ').split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  return BLISS.products
    .map((p) => {
      const h = haystack(p);
      let score = 0;
      for (const t of tokens) {
        const alts = [t, ...(SYN[t] || '').split(' ').filter(Boolean), t.replace(/s$/, '')];
        const hit = alts.find((a) => h.includes(a));
        if (!hit) return null;
        score += p.name.toLowerCase().includes(hit) ? 3 : p.brand.toLowerCase().includes(hit) ? 2 : 1;
      }
      return { p, score: score + p.rating / 10 };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}
window.searchProducts = searchProducts;
const hl = (text, q) => {
  const tokens = q.trim().split(/\s+/).filter((t) => t.length > 1).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return tokens.length ? esc(text).replace(new RegExp(`(${tokens.join('|')})`, 'ig'), '<mark>$1</mark>') : esc(text);
};
const resultCard = (p, q = '') => `
  <a class="sr-card" href="product.html" data-sr>
    <div class="ph"><img src="img/${p.img}.webp"${imgSet(p.img, '(max-width: 680px) 46vw, 22vw')} alt="" loading="lazy">${badgeOf(p)}</div>
    <span class="brand">${hl(p.brand, q)}</span><span class="name">${hl(p.name, q)}</span><span class="sr-price">${priceOf(p)}</span>
  </a>`;

function renderSearch() {
  const q = searchInput.value.trim();
  if (!q) {
    const trending = ['va-barcelona-2', 'riobel-kitchen-faucet', 'toto-neorest-nx', 'ilve-majestic-36'].map(BLISS.byId);
    searchResults.innerHTML = `
      <div class="sr-grid">
        <div class="sr-side">
          <h4>${icon('trend', 'sm')} Popular searches</h4>
          <div class="chips">${POPULAR.map((t) => `<button type="button" data-query="${t}">${t}</button>`).join('')}</div>
          <h4>Shop by space</h4>
          <ul class="sr-links">
            <li><a data-sr href="collection.html">Bath ${icon('arrow', 'sm')}</a></li>
            <li><a data-sr href="search.html?cat=Kitchen">Kitchen ${icon('arrow', 'sm')}</a></li>
            <li><a data-sr href="search.html?cat=Appliances">Appliances ${icon('arrow', 'sm')}</a></li>
            <li><a data-sr href="search.html?cat=Lighting">Lighting ${icon('arrow', 'sm')}</a></li>
          </ul>
        </div>
        <div><h4>Trending now</h4><div class="sr-products">${trending.map((p) => resultCard(p)).join('')}</div></div>
      </div>`;
    return;
  }
  const found = searchProducts(q);
  const ql = q.toLowerCase();
  const cats = [...new Set(BLISS.products.flatMap((p) => [p.sub]))].filter((c) => c.toLowerCase().includes(ql) || ql.split(' ').some((t) => t.length > 2 && c.toLowerCase().includes(t.replace(/s$/, ''))));
  const brands = [...new Set(BLISS.products.map((p) => p.brand))].filter((b) => b.toLowerCase().includes(ql));
  const pages = SITE_PAGES.filter(([t, , k]) => (t + ' ' + k).toLowerCase().split(/\s+/).some((w) => w.startsWith(ql.split(' ')[0])));
  const suggestions = [...new Set(found.slice(0, 8).map((p) => p.sub))].slice(0, 4);
  searchResults.innerHTML = `
    <div class="sr-grid">
      <div class="sr-side">
        ${suggestions.length ? `<h4>Suggestions</h4><ul class="sr-links">${suggestions.map((s) => `<li><a data-sr href="search.html?q=${encodeURIComponent(s)}">${icon('search', 'sm')}<span>${hl(s, q)}</span></a></li>`).join('')}</ul>` : ''}
        ${cats.length ? `<h4>Categories</h4><ul class="sr-links">${cats.slice(0, 4).map((c) => `<li><a data-sr href="search.html?q=${encodeURIComponent(c)}"><span>${hl(c, q)}</span>${icon('arrow', 'sm')}</a></li>`).join('')}</ul>` : ''}
        ${brands.length ? `<h4>Brands</h4><ul class="sr-links">${brands.map((b) => `<li><a data-sr href="search.html?q=${encodeURIComponent(b)}"><span>${hl(b, q)}</span>${icon('arrow', 'sm')}</a></li>`).join('')}</ul>` : ''}
        ${pages.length ? `<h4>Pages</h4><ul class="sr-links">${pages.slice(0, 3).map(([t, h]) => `<li><a data-sr href="${h}">${icon('file', 'sm')}<span>${hl(t, q)}</span></a></li>`).join('')}</ul>` : ''}
      </div>
      <div>
        <h4>Products <span class="muted">(${found.length})</span></h4>
        ${found.length
          ? `<div class="sr-products">${found.slice(0, 8).map((p) => resultCard(p, q)).join('')}</div>
             <a class="btn ghost sr-all" data-sr href="search.html?q=${encodeURIComponent(q)}">View all ${found.length} results for “${esc(q)}” ${icon('arrow', 'sm')}</a>`
          : `<div class="sr-empty"><p>No products match “${esc(q)}”.</p><p class="muted">Try a brand, a product type or a finish, or <a href="contact.html">ask a specialist</a>. We can source almost anything.</p>
             <div class="chips">${POPULAR.slice(0, 4).map((t) => `<button type="button" data-query="${t}">${t}</button>`).join('')}</div></div>`}
      </div>
    </div>`;
}
function openSearch(prefill = '') {
  lastFocus = document.activeElement;
  document.body.classList.add('search-open');
  searchOv.setAttribute('aria-hidden', 'false');
  searchInput.value = prefill;
  renderSearch();
  setTimeout(() => searchInput.focus(), 60);
}
function closeSearch() {
  document.body.classList.remove('search-open');
  searchOv.setAttribute('aria-hidden', 'true');
  lastFocus?.focus?.();
}
window.openSearch = openSearch;
let sTimer;
searchInput.addEventListener('input', () => { clearTimeout(sTimer); sTimer = setTimeout(renderSearch, 90); });
searchOv.addEventListener('click', (e) => {
  const chip = e.target.closest('[data-query]');
  if (chip) { searchInput.value = chip.dataset.query; renderSearch(); searchInput.focus(); }
  if (e.target === searchOv || e.target.closest('[data-close-search]')) closeSearch();
});
searchOv.addEventListener('keydown', (e) => {
  const links = [...searchResults.querySelectorAll('[data-sr]')];
  const i = links.indexOf(document.activeElement);
  if (e.key === 'ArrowDown') { e.preventDefault(); (links[i + 1] || links[0])?.focus(); }
  if (e.key === 'ArrowUp') { e.preventDefault(); i <= 0 ? searchInput.focus() : links[i - 1].focus(); }
});
document.addEventListener('click', (e) => { if (e.target.closest('[data-open-search]')) openSearch(); });
document.addEventListener('keydown', (e) => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName);
  if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) { e.preventDefault(); openSearch(); }
  if (e.key === 'Escape') {
    if (document.body.classList.contains('search-open')) closeSearch();
    if (document.body.classList.contains('cart-open')) closeCart();
    document.querySelector('.mobile-nav')?.classList.remove('open');
  }
});

/* ---------- Mega menu (hover intent, keyboard, touch) ---------- */
(function megaMenu() {
  const items = [...document.querySelectorAll('.nav-item[data-mega]')];
  if (!items.length) return;
  let openTimer, closeTimer, current = null;
  function setOpen(it, on) {
    it.classList.toggle('open', on);
    it.querySelector('.nav-link').setAttribute('aria-expanded', on);
    document.body.classList.toggle('mega-open', !!document.querySelector('.nav-item.open'));
  }
  const open = (it) => {
    clearTimeout(closeTimer);
    if (current && current !== it) setOpen(current, false);
    setOpen(it, true); current = it;
  };
  const close = () => { if (current) setOpen(current, false); current = null; };
  items.forEach((it) => {
    it.addEventListener('mouseenter', () => { clearTimeout(closeTimer); clearTimeout(openTimer); openTimer = setTimeout(() => open(it), current ? 0 : 90); });
    it.addEventListener('mouseleave', () => { clearTimeout(openTimer); closeTimer = setTimeout(close, 180); });
    it.addEventListener('focusin', () => open(it));
    // tablets: first tap opens the menu, second tap follows the link
    it.querySelector('.nav-link').addEventListener('click', (e) => {
      if (matchMedia('(hover: none)').matches && !it.classList.contains('open')) { e.preventDefault(); open(it); }
    });
  });
  document.addEventListener('focusin', (e) => { if (current && !current.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && current) { const l = current.querySelector('.nav-link'); close(); l.focus(); } });
  document.addEventListener('click', (e) => { if (current && !e.target.closest('.nav-item')) close(); });
  const deep = new URLSearchParams(location.search).get('mega'); // demo: ?mega=Bath
  if (deep) { const it = items.find((x) => x.querySelector('.nav-link').textContent.trim() === deep); if (it) open(it); }
})();

/* ---------- Mobile nav ---------- */
const mnav = document.querySelector('.mobile-nav');
document.querySelector('.menu-toggle')?.addEventListener('click', () => mnav.classList.add('open'));
mnav?.addEventListener('click', (e) => {
  if (e.target.closest('.close') || e.target.classList.contains('scrim')) mnav.classList.remove('open');
});

/* ---------- Header shadow on scroll ---------- */
const hdr = document.querySelector('.site-header');
if (hdr) addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 40), { passive: true });

/* ---------- Carousels: [data-scroll="target-id"] buttons with data-dir ---------- */
document.querySelectorAll('[data-scroll]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const track = document.getElementById(btn.dataset.scroll);
    if (!track) return;
    const step = track.clientWidth * 0.8 * (btn.dataset.dir === 'prev' ? -1 : 1);
    track.scrollBy({ left: step, behavior: 'smooth' });
  });
});

/* ---------- FAQ: one open at a time per group ---------- */
document.querySelectorAll('.faq').forEach((group) => {
  group.querySelectorAll('details').forEach((d) => {
    d.addEventListener('toggle', () => {
      if (d.open) group.querySelectorAll('details').forEach((o) => o !== d && (o.open = false));
    });
  });
});

/* ---------- Hero slider (home): auto crossfade, swipe, cursor parallax, pause control ---------- */
(function heroSlider() {
  const hero = document.querySelector('.hero-slider');
  if (!hero) return;
  const slides = [...hero.querySelectorAll('.slide')];
  const toggle = hero.querySelector('.hs-toggle');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DURATION = 7000;
  let i = 0, timer, paused = reduce, hovering = false;
  hero.style.setProperty('--dur', DURATION + 'ms');

  function go(n) {
    slides[i].classList.remove('on'); slides[i].setAttribute('aria-hidden', 'true');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('on'); slides[i].removeAttribute('aria-hidden');
    schedule();
  }
  function schedule() {
    clearTimeout(timer);
    const hold = paused || hovering;
    hero.classList.toggle('paused', hold);
    if (!hold && slides.length > 1) timer = setTimeout(() => go(i + 1), DURATION);
  }
  toggle?.addEventListener('click', () => {
    paused = !paused;
    toggle.innerHTML = icon(paused ? 'play' : 'pause', 'sm');
    toggle.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    schedule();
  });
  if (reduce && toggle) { toggle.innerHTML = icon('play', 'sm'); toggle.setAttribute('aria-label', 'Play slideshow'); }
  // pause while the visitor is reading / focused inside the banner
  hero.addEventListener('focusin', () => { hovering = true; schedule(); });
  hero.addEventListener('focusout', () => { hovering = false; schedule(); });

  let x0 = null; // swipe
  hero.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') x0 = e.clientX; });
  hero.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
  });
  if (!reduce && matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      hero.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    hero.addEventListener('pointerleave', () => { hero.style.setProperty('--px', 0); hero.style.setProperty('--py', 0); });
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearTimeout(timer); else schedule(); });
  slides.forEach((s, k) => k && s.setAttribute('aria-hidden', 'true'));
  schedule();
})();

/* ---------- Reveal on scroll ---------- */
function observeReveal(root = document) {
  const els = root.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
}
observeReveal();

/* ---------- Shared product-card renderer ---------- */
window.stars = (r, count) => {
  const full = Math.round(r);
  return `<div class="stars" aria-label="${r} out of 5">${'★'.repeat(full)}${'☆'.repeat(5 - full)}${count != null ? `<em>(${count})</em>` : ''}</div>`;
};
window.productCard = (p) => `
<article class="p-card">
  <a class="ph" href="product.html"><img src="img/${p.img}.webp"${imgSet(p.img, '(max-width: 680px) 46vw, (max-width: 1180px) 30vw, 22vw')} alt="${esc(p.brand + ' ' + p.name)}" loading="lazy" decoding="async">${badgeOf(p)}</a>
  <button class="wish" data-wish="${p.id}" aria-label="Add to wishlist" aria-pressed="false">${icon('heart', 'sm')}</button>
  <div class="body">
    <span class="brand">${p.brand}</span>
    <a class="name" href="product.html">${p.name}</a>
    <div class="meta-row">${stars(p.rating, p.reviews)}<div class="swatches" role="group" aria-label="Colours">${(p.colors || []).map((c, i) => { const v = BLISS.variantImg ? BLISS.variantImg(p, c) : null, nm = BLISS.colorName ? BLISS.colorName(c) : 'Colour'; return `<button type="button" class="sw${i === 0 ? ' on' : ''}" style="--c:${c}"${v ? ` data-sw-img="img/${v}.webp"` : ''} aria-label="${nm}" aria-pressed="${i === 0}" title="${nm}"></button>`; }).join('')}</div></div>
    <div class="price">${priceOf(p)}</div>
    <div class="actions">
      <button class="btn sm" data-add="${p.id}">Add to cart</button>
      <button class="btn ghost sm" data-inquire="${p.id}">Inquire</button>
    </div>
  </div>
</article>`;

/* ---------- Product cards: hovering a colour swatch shows that colour's photo ----------
   Hover (or keyboard focus) previews; click/tap selects, so it also works on touch screens. */
(function cardSwatches() {
  const cardImg = (sw) => sw.closest('.p-card')?.querySelector('.ph img');
  const preview = (sw) => {
    const img = cardImg(sw); if (!img) return;
    if (!img.dataset.base) { img.dataset.base = img.getAttribute('src'); img.dataset.baseSet = img.getAttribute('srcset') || ''; }
    const src = sw.dataset.swImg || img.dataset.base;
    if (img.getAttribute('src') === src) return;
    // a srcset would override src, so drop it for colour photos and restore it for the main photo
    if (src === img.dataset.base && img.dataset.baseSet) img.setAttribute('srcset', img.dataset.baseSet); else img.removeAttribute('srcset');
    img.src = src;
  };
  const restore = (box) => { const on = box.querySelector('.sw.on'); if (on) preview(on); };
  document.addEventListener('mouseover', (e) => { const sw = e.target.closest('.p-card .sw'); if (sw) preview(sw); });
  document.addEventListener('focusin', (e) => { const sw = e.target.closest('.p-card .sw'); if (sw) preview(sw); });
  document.addEventListener('mouseout', (e) => {
    const box = e.target.closest('.p-card .swatches');
    if (box && !box.contains(e.relatedTarget)) restore(box);
  });
  document.addEventListener('focusout', (e) => {
    const box = e.target.closest('.p-card .swatches');
    if (box && !box.contains(e.relatedTarget)) restore(box);
  });
  document.addEventListener('click', (e) => {
    const sw = e.target.closest('.p-card .sw'); if (!sw) return;
    sw.parentElement.querySelectorAll('.sw').forEach((x) => { x.classList.toggle('on', x === sw); x.setAttribute('aria-pressed', x === sw); });
    preview(sw);
  });
  // warm the cache so the swap is instant on hover
  const warm = () => document.querySelectorAll('.p-card .sw[data-sw-img]').forEach((sw) => { const i = new Image(); i.src = sw.dataset.swImg; });
  if ('requestIdleCallback' in window) requestIdleCallback(() => setTimeout(warm, 1500)); else setTimeout(warm, 2500);
})();

/* ---------- Demo forms: validate, then show a success state (no data is sent) ---------- */
document.querySelectorAll('form[data-demo-form]').forEach((f) => {
  f.noValidate = true;
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = [...f.elements].filter((el) => el.willValidate && !el.checkValidity());
    if (bad.length) { bad[0].focus(); bad[0].reportValidity(); return; }
    const btn = f.querySelector('[type=submit]');
    btn.classList.add('placing'); btn.innerHTML = '<span class="spinner"></span> Sending…';
    setTimeout(() => {
      const box = document.createElement('div');
      box.className = 'form-success';
      box.innerHTML = `<div class="tick">${icon('check')}</div><h3>${esc(f.dataset.successTitle || 'Thank you')}</h3><p>${esc(f.dataset.successText || 'A member of our team will be in touch within one business day.')}</p>`;
      f.replaceWith(box);
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 900);
  });
});

/* File drop zones */
document.querySelectorAll('.dropzone').forEach((dz) => {
  const input = dz.querySelector('input[type=file]');
  const list = document.getElementById(dz.dataset.list);
  const show = (files) => {
    if (!list) return;
    list.innerHTML = [...files].map((fl) => `<li><span>${esc(fl.name)}</span><span class="muted">${(fl.size / 1024 / 1024).toFixed(1)} MB</span></li>`).join('');
  };
  input.addEventListener('change', () => show(input.files));
  ['dragenter', 'dragover'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove('over'); }));
  dz.addEventListener('drop', (e) => { input.files = e.dataTransfer.files; show(input.files); });
});

/* Pre-select a topic from ?topic= (e.g. contact.html?topic=design) */
const topic = new URLSearchParams(location.search).get('topic');
if (topic) document.querySelector(`input[name=topic][value="${CSS.escape(topic)}"]`)?.click();

/* Table-of-contents highlight for policy pages */
const tocLinks = [...document.querySelectorAll('.toc nav a')];
if (tocLinks.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) tocLinks.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  tocLinks.forEach((a) => { const t = document.querySelector(a.getAttribute('href')); if (t) io.observe(t); });
}

/* Demo deep links: page.html#cart opens the cart drawer, ?search=term opens search */
if (location.hash === '#cart') openCart();
const autoSearch = new URLSearchParams(location.search).get('search');
if (autoSearch !== null) openSearch(autoSearch);


/* ---------- Cookie consent (PIPEDA / Quebec Law 25 opt-in · CCPA/CPRA opt-out + GPC) ----------
   Essential storage (cart, currency, checkout, this choice) runs without consent.
   Analytics and marketing tags must only load after opt-in. See applyConsent(). */
(function cookieConsent() {
  const KEY = 'bliss_consent';
  const gpc = navigator.globalPrivacyControl === true;
  let consent = BLISS.store.get(KEY, null);

  function applyConsent(c) {
    window.BLISS_CONSENT = c;
    // In WooCommerce: load GA4 when c.analytics, Meta/Google Ads pixels when c.marketing
    // (e.g. via Google Consent Mode v2 + CookieYes / Complianz).
    document.dispatchEvent(new CustomEvent('consent:change', { detail: c }));
  }
  function save(c) {
    consent = { necessary: true, analytics: !!c.analytics, marketing: !!c.marketing && !(gpc && c.marketing === 'default'), date: new Date().toISOString(), v: 1 };
    BLISS.store.set(KEY, consent);
    applyConsent(consent);
    hideBanner();
    toast('Your cookie preferences have been saved');
  }

  const banner = document.createElement('section');
  banner.className = 'cookie';
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = `
    <div class="cookie-text"><b>Your privacy matters to us.</b> We use essential cookies to run our store (your cart, currency and checkout).
      With your permission, we'd also like to use analytics and marketing cookies to improve our site and show you relevant ads.
      You can change your choice at any time. <a href="privacy.html#cookies">Cookie policy</a></div>
    <div class="cookie-actions">
      <button type="button" class="btn ghost sm" data-c="reject">Reject non-essential</button>
      <button type="button" class="btn ghost sm" data-c="custom">Customize</button>
      <button type="button" class="btn sm" data-c="accept">Accept all</button>
    </div>`;

  const modal = document.createElement('div');
  modal.className = 'consent-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'consentTitle');
  modal.hidden = true;
  const row = (key, title, text, locked) => `
    <div class="c-row">
      <div><h3>${title}</h3><p>${text}</p></div>
      ${locked ? '<span class="c-always">Always on</span>' : `<label class="switch"><input type="checkbox" data-cat="${key}"><span></span><em class="sr">${title}</em></label>`}
    </div>`;
  modal.innerHTML = `
    <div class="c-box">
      <header><h2 id="consentTitle">Cookie Preferences</h2><button type="button" class="c-x" data-c="close" aria-label="Close">${icon('close')}</button></header>
      <div class="c-body">
        <p class="muted">Choose which cookies we can use. Essential cookies are required for the store to work and can't be switched off.</p>
        ${gpc ? `<div class="co-notice">${icon('shield', 'sm')}<span>We detected a Global Privacy Control signal from your browser, so marketing cookies are off by default.</span></div>` : ''}
        ${row('necessary', 'Strictly necessary', 'Cart, checkout, security, your currency choice and remembering this preference.', true)}
        ${row('analytics', 'Analytics', 'Helps us understand how visitors use the site (e.g. Google Analytics) so we can improve it. Data is aggregated.')}
        ${row('marketing', 'Marketing', 'Lets us and our advertising partners (e.g. Google, Meta) show you relevant ads. Switching this off also opts you out of the “sale” or “sharing” of personal information under US state privacy laws.')}
      </div>
      <footer>
        <button type="button" class="btn ghost sm" data-c="reject">Reject all</button>
        <button type="button" class="btn ghost sm" data-c="save">Save choices</button>
        <button type="button" class="btn sm" data-c="accept">Accept all</button>
      </footer>
    </div>`;
  document.body.append(banner, modal);

  function showBanner() { banner.classList.add('show'); document.body.classList.add('has-cookie'); }
  function hideBanner() { banner.classList.remove('show'); document.body.classList.remove('has-cookie'); }
  function openModal(focusMarketing) {
    const c = consent || { analytics: false, marketing: false };
    modal.querySelector('[data-cat=analytics]').checked = !!c.analytics;
    modal.querySelector('[data-cat=marketing]').checked = !!c.marketing;
    modal.hidden = false;
    document.body.classList.add('consent-open');
    setTimeout(() => (focusMarketing ? modal.querySelector('[data-cat=marketing]') : modal.querySelector('.c-x')).focus(), 30);
  }
  function closeModal() { modal.hidden = true; document.body.classList.remove('consent-open'); }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-c]');
    if (b && (banner.contains(b) || modal.contains(b))) {
      const a = b.dataset.c;
      if (a === 'accept') { save({ analytics: true, marketing: gpc ? false : true }); closeModal(); }
      if (a === 'reject') { save({ analytics: false, marketing: false }); closeModal(); }
      if (a === 'custom') openModal();
      if (a === 'close') closeModal();
      if (a === 'save') { save({ analytics: modal.querySelector('[data-cat=analytics]').checked, marketing: modal.querySelector('[data-cat=marketing]').checked }); closeModal(); }
    }
    const pref = e.target.closest('[data-cookie-prefs]');
    if (pref) { e.preventDefault(); openModal(pref.dataset.cookiePrefs === 'optout'); }
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  if (consent) applyConsent(consent);
  else setTimeout(showBanner, 600);
})();


/* ---------- Footer link columns collapse into an accordion on phones ---------- */
(function footerAccordion() {
  const mq = window.matchMedia('(max-width: 680px)');
  document.querySelectorAll('.site-footer .f-cols .f-h').forEach((h, i) => {
    const list = h.nextElementSibling; if (!list) return;
    list.id = list.id || `fcol${i}`;
    h.innerHTML = `<button type="button" class="f-acc" aria-expanded="false" aria-controls="${list.id}">${h.innerHTML}</button>`;
    const btn = h.firstElementChild;
    btn.addEventListener('click', () => {
      if (!mq.matches) return;
      const open = !h.classList.contains('open');
      h.classList.toggle('open', open); btn.setAttribute('aria-expanded', open);
    });
  });
})();

/* ---------- Make an Inquiry (every add-to-cart has one) ---------- */
(function inquiry() {
  const m = document.createElement('div');
  m.className = 'consent-modal inquiry-modal';
  m.setAttribute('role', 'dialog');
  m.setAttribute('aria-modal', 'true');
  m.setAttribute('aria-labelledby', 'inqTitle');
  m.hidden = true;
  document.body.append(m);
  let back;
  function open(p) {
    back = document.activeElement;
    m.innerHTML = `
      <div class="c-box">
        <header><h2 id="inqTitle">Make an Inquiry</h2><button type="button" class="c-x" data-inq-close aria-label="Close">${icon('close')}</button></header>
        <form class="c-body form" data-inq-form novalidate>
          ${p ? `<div class="inq-product"><img src="img/${p.img}.webp"${imgSet(p.img, '80px')} alt=""><div><span class="brand">${p.brand}</span><b>${p.name}</b>${priceOf(p)}</div></div>` : ''}
          <p class="muted" style="font-size:13.5px;margin:0">Ask about availability, lead times, finishes or trade and project pricing. A product specialist replies within one business day.</p>
          <fieldset class="field" style="border:0;padding:0;margin:0"><span>I'd like to know about</span>
            <div class="pills">
              <label><input type="radio" name="about" value="availability" checked><span>Availability &amp; lead time</span></label>
              <label><input type="radio" name="about" value="pricing"><span>Trade / project pricing</span></label>
              <label><input type="radio" name="about" value="options"><span>Finishes &amp; options</span></label>
              <label><input type="radio" name="about" value="other"><span>Something else</span></label>
            </div>
          </fieldset>
          <div class="form-grid">
            <label class="field"><span>Name</span><input name="name" required autocomplete="name"></label>
            <label class="field"><span>Email</span><input type="email" name="email" required autocomplete="email"></label>
            <label class="field"><span>Phone <em>(optional)</em></span><input type="tel" name="phone" autocomplete="tel"></label>
            <label class="field"><span>Postal / ZIP code</span><input name="postal" required autocomplete="postal-code"></label>
            ${p ? `<label class="field"><span>Quantity</span><input name="qty" type="number" min="1" value="1" inputmode="numeric"></label>` : ''}
            <label class="field ${p ? '' : 'full'}"><span>I am a</span><select name="role"><option>Homeowner</option><option>Designer / Architect</option><option>Builder / Contractor</option><option>Other</option></select></label>
            <label class="field full"><span>Message</span><textarea name="msg" rows="3" placeholder="Anything we should know: finish, dimensions, project timeline…"></textarea></label>
          </div>
          <div><button class="btn" type="submit">Send Inquiry ${icon('arrow', 'sm')}</button></div>
        </form>
      </div>`;
    m.hidden = false;
    document.body.classList.add('consent-open');
    setTimeout(() => m.querySelector('input[name=name]')?.focus(), 40);
  }
  function close() { m.hidden = true; document.body.classList.remove('consent-open'); back?.focus?.(); }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-inquire]');
    if (b) { e.preventDefault(); open(BLISS.byId(b.dataset.inquire)); }
    if (e.target.closest('[data-inq-close]') || e.target === m) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !m.hidden) close(); });
  m.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    const bad = [...f.elements].filter((el) => el.willValidate && !el.checkValidity());
    if (bad.length) { bad[0].focus(); bad[0].reportValidity(); return; }
    const btn = f.querySelector('[type=submit]');
    btn.classList.add('placing'); btn.innerHTML = '<span class="spinner"></span> Sending…';
    setTimeout(() => {
      f.outerHTML = `<div class="c-body form-success"><div class="tick">${icon('check')}</div><h3>Inquiry sent</h3><p>Thank you. A Bliss Bath and Kitchen product specialist will reply within one business day.</p><button class="btn ghost" type="button" data-inq-close>Continue Browsing</button></div>`;
    }, 800);
  });
  window.openInquiry = open;
})();

/* ---------- Account state (prototype: name/email only, never passwords) ---------- */
function syncAccount() {
  const u = BLISS.store.get('bliss_user', null);
  document.querySelectorAll('[data-acct-dot]').forEach((d) => (d.hidden = !u));
  document.querySelectorAll('.acct-link').forEach((a) => a.setAttribute('aria-label', u ? `My account (signed in as ${u.first})` : 'Sign in or create an account'));
}
window.syncAccount = syncAccount;
syncAccount();


/* ---------- Language switcher (Google Translate website widget) ----------
   The Google script is only loaded after a visitor picks a language (and on later visits
   while a non-English choice is saved), so English visitors get no third-party download. */
(function languages() {
  const INCLUDED = LANGS.map((l) => l[0]).join(',');
  const cookieDomains = () => { const h = location.hostname; return ['', h, '.' + h.split('.').slice(-2).join('.')]; };
  function setCookie(code) {
    cookieDomains().forEach((d) => {
      const dom = d ? `;domain=${d}` : '';
      document.cookie = code === 'en'
        ? `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${dom}`
        : `googtrans=/en/${code};path=/${dom}`;
    });
  }
  let loading = null;
  function loadGoogle() {
    if (loading) return loading;
    loading = new Promise((resolve) => {
      const holder = document.createElement('div');
      holder.id = 'gt_el'; holder.hidden = true;
      document.body.append(holder);
      window.googleTranslateElementInit = () => {
        new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: INCLUDED, autoDisplay: false }, 'gt_el');
        resolve();
      };
      const sc = document.createElement('script');
      sc.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      sc.async = true;
      sc.onerror = () => { toast('Translation is unavailable right now. Please try again later'); resolve(); };
      document.head.append(sc);
    });
    return loading;
  }
  function applyWhenReady(code, tries = 0) {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) { combo.value = code; combo.dispatchEvent(new Event('change')); return; }
    if (tries < 40) setTimeout(() => applyWhenReady(code, tries + 1), 150);
  }
  function mark(code) {
    const l = LANGS.find((x) => x[0] === code) || LANGS[0];
    document.querySelectorAll('[data-lang-label]').forEach((el) => (el.textContent = l[1]));
    document.querySelectorAll('[data-set-lang]').forEach((li) => li.setAttribute('aria-selected', li.dataset.setLang === code));
    document.documentElement.lang = code === 'en' ? 'en' : code;
  }
  function choose(code) {
    try { localStorage.setItem('bliss_lang', code); } catch {}
    mark(code);
    setCookie(code);
    if (code === 'en') { location.reload(); return; }   // cleanest way back to the original English
    loadGoogle().then(() => applyWhenReady(code));
  }
  document.addEventListener('click', (e) => {
    const li = e.target.closest('[data-set-lang]');
    if (!li) return;
    li.closest('[data-cur]')?.classList.remove('open');
    if (li.dataset.setLang !== curLang()) choose(li.dataset.setLang);
  });
  // ?lang=fr style links open the page in that language (handy for sharing); otherwise re-apply a saved choice
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (fromUrl && LANGS.some((l) => l[0] === fromUrl)) { try { localStorage.setItem('bliss_lang', fromUrl); } catch {} }
  const saved = curLang();
  mark(saved);
  if (saved !== 'en') { setCookie(saved); loadGoogle().then(() => applyWhenReady(saved)); }
  else if (fromUrl === 'en') setCookie('en');
})();


/* ---------- Chat assistant (prototype: scripted answers from the site's own policies) ----------
   In WooCommerce replace with a real chat service (e.g. Tidio, LiveChat, Gorgias or WhatsApp Business)
   that can hand off to the team and read order status. The conversation persists for the browser session. */
(function chat() {
  const KEY = 'bliss_chat';
  const load = () => { try { return JSON.parse(sessionStorage.getItem(KEY)) || []; } catch { return []; } };
  const save = (m) => { try { sessionStorage.setItem(KEY, JSON.stringify(m.slice(-40))); } catch {} };
  let msgs = load();
  let awaiting = null; // 'order' | 'handoff-email'

  const QUICK = [['order', 'Track my order'], ['advice', 'Product advice'], ['ship', 'Shipping & delivery'], ['returns', 'Returns'], ['trade', 'Trade pricing'], ['showroom', 'Visit the showroom'], ['human', 'Talk to a person']];
  const link = (href, text) => `<a href="${href}">${text}</a>`;
  const A = {
    greet: `Hi! 👋 I'm the Bliss Bath and Kitchen assistant. I can help with orders, shipping, returns, products and more. What can I help you with?`,
    order: `Happy to help. What's your order number? It starts with <b>BL-</b> and is in your confirmation email.`,
    ship: `We ship across Canada and the USA. Orders under 70 lb ship <b>free</b> by standard ground (2–5 business days after dispatch). Tubs, vanities and large appliances go by freight, curbside, and we'll confirm the freight cost before processing. Free pickup is available from our Markham warehouse. ${link('shipping.html', 'Shipping policy')}`,
    returns: `Eligible products can be returned within <b>14 days</b> of delivery if unused, uninstalled and in original packaging. Returns need approval first (an RGA) and have a 25% restocking fee plus shipping. Damaged freight must be reported within 24 hours. ${link('returns.html#start', 'Start a return')}`,
    trade: `Designers, builders and contractors get preferred pricing, project quotes and a dedicated specialist. ${link('trade.html#apply', 'Apply for a trade account')} or ${link('projects.html', 'send us a project list')}.`,
    showroom: `Our showroom is at <b>5 Shields Court, Unit 104, Markham, Ontario</b>. Walk-ins are welcome, or ${link('showroom.html#book', 'book an appointment')} for one-on-one help. Call 1-855-366-1001 for today's hours.`,
    advice: `Tell me what you're shopping for, like "freestanding tub", "brass kitchen faucet" or a brand name, and I'll suggest a few options. For finishes, sizing or a full room, a specialist can help too.`,
    warranty: `Products carry the manufacturer's warranty (for example, many freestanding tubs have a 25-year limited warranty). We can help you register a product or make a claim.`,
    install: `We don't install, but we recommend a licensed, qualified installer and can refer trusted pros in your area. Please inspect everything before installing.`,
    sale: `Our current offers are here: ${link('search.html?q=sale', 'Shop the sale')}. Trade customers also get preferred pricing.`,
    currency: `Prices are in Canadian dollars by default. Switch to USD from the <b>CAD</b> menu at the top of the page.`,
    human: `I'll connect you with a specialist. What's the best email to reach you? You can also call <b>1-855-366-1001</b>.`,
    fallback: `I'm not sure I understood. I can help with orders, shipping, returns, trade pricing or finding a product, or connect you with a specialist.`,
  };
  const INTENTS = [
    ['order', /\b(track|order|where('?s| is) my|status|shipment)\b/i], ['returns', /\b(return|refund|exchange|rga|restock)/i],
    ['ship', /\b(ship|deliver|freight|pickup|pick up|lead time|arrive)/i], ['trade', /\b(trade|designer|builder|contractor|project|volume)/i],
    ['showroom', /\b(showroom|visit|address|hours|open|markham|appointment)/i], ['warranty', /warrant/i], ['install', /install/i],
    ['sale', /\b(sale|discount|deal|promo|coupon|offer)/i], ['currency', /\b(usd|cad|currency|dollar)/i],
    ['human', /\b(human|person|agent|someone|specialist|call|phone|talk)\b/i], ['greet', /^(hi|hello|hey|bonjour)\b/i],
  ];

  const root = document.createElement('div');
  root.className = 'chat';
  root.innerHTML = `
    <button class="chat-fab" type="button" aria-label="Open chat" aria-expanded="false" aria-controls="chatPanel">
      <svg viewBox="0 0 24 24" class="icon" aria-hidden="true"><path d="M4 5h16v11H9l-5 4Z"/><path d="M8 9.5h8M8 12.5h5"/></svg>
      <span class="chat-online" aria-hidden="true"></span>
      <span class="chat-fab-label">Chat with us</span>
    </button>
    <section class="chat-panel" id="chatPanel" role="dialog" aria-label="Chat with Bliss Bath and Kitchen" hidden>
      <header class="chat-head">
        <span class="chat-av" aria-hidden="true">B</span>
        <span class="chat-title"><b>Bliss Bath and Kitchen</b><small><i class="chat-dot"></i> Online · typically replies in minutes</small></span>
        <button class="chat-x" type="button" aria-label="Close chat">${icon('close')}</button>
      </header>
      <div class="chat-log" id="chatLog" aria-live="polite"></div>
      <div class="chat-quick" id="chatQuick"></div>
      <form class="chat-form" id="chatForm" autocomplete="off">
        <input id="chatInput" type="text" placeholder="Type your message…" aria-label="Message" maxlength="400">
        <button type="submit" aria-label="Send">${icon('arrow')}</button>
      </form>
      <p class="chat-note">Prototype assistant: answers come from our policies. For urgent help call 1-855-366-1001.</p>
    </section>`;
  document.body.append(root);
  const fab = root.querySelector('.chat-fab'), panel = root.querySelector('.chat-panel');
  const log = root.querySelector('#chatLog'), quick = root.querySelector('#chatQuick'), input = root.querySelector('#chatInput');

  const bubble = (m) => `<div class="msg ${m.from}">${m.from === 'bot' ? m.html : esc(m.text)}${m.cards ? `<div class="msg-cards">${m.cards}</div>` : ''}</div>`;
  function render() {
    log.innerHTML = msgs.map(bubble).join('');
    quick.innerHTML = QUICK.map(([k, t]) => `<button type="button" data-chat="${k}">${t}</button>`).join('');
    log.scrollTop = log.scrollHeight;
  }
  function bot(html, cards) {
    const typing = document.createElement('div');
    typing.className = 'msg bot typing'; typing.innerHTML = '<i></i><i></i><i></i>';
    log.append(typing); log.scrollTop = log.scrollHeight;
    setTimeout(() => { typing.remove(); msgs.push({ from: 'bot', html, cards }); save(msgs); render(); }, 650);
  }
  function productCards(q) {
    const found = (window.searchProducts ? searchProducts(q) : []).slice(0, 3);
    if (!found.length) return null;
    return found.map((p) => `<a class="msg-card" href="product.html"><img src="img/${p.img}.webp"${imgSet(p.img, '64px')} alt=""><span><small>${esc(p.brand)}</small>${esc(p.name)}<b>${BLISS.money(p.cad)}</b></span></a>`).join('');
  }
  function reply(text, intentKey) {
    if (awaiting === 'order' && !intentKey) {
      awaiting = null;
      const no = (text.match(/BL-?\s?(\d{4,})/i) || [])[1];
      if (no) return bot(`Order <b>BL-${no}</b> is being processed. Freight items are waiting on a delivery quote, which we'll email within one business day. Signed-in customers can see full details in ${link('account.html?tab=orders', 'My Account → Orders')}.`);
      return bot(`I couldn't find an order number in that. It looks like <b>BL-123456</b>. You can also check ${link('account.html?tab=orders', 'My Account → Orders')}.`);
    }
    if (awaiting === 'handoff-email' && !intentKey) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())) { awaiting = null; return bot(`Thanks! A specialist will email <b>${esc(text.trim())}</b> within one business day. Anything else I can help with?`); }
      return bot(`That doesn't look like an email address. Could you check it? Or call us at 1-855-366-1001.`);
    }
    const key = intentKey || (INTENTS.find(([, re]) => re.test(text)) || [])[0];
    if (key === 'order') awaiting = 'order';
    if (key === 'human') awaiting = 'handoff-email';
    if (key && A[key]) return bot(A[key]);
    const cards = productCards(text);
    if (cards) return bot(`Here are a few matches for “${esc(text)}”:`, cards + `<a class="msg-more" href="search.html?q=${encodeURIComponent(text)}">See all results →</a>`);
    bot(A.fallback);
  }
  function send(text, intentKey) {
    if (!text.trim()) return;
    msgs.push({ from: 'me', text }); save(msgs); render(); reply(text, intentKey);
  }
  function open() {
    panel.hidden = false; fab.setAttribute('aria-expanded', 'true'); document.body.classList.add('chat-open');
    if (!msgs.length) { msgs.push({ from: 'bot', html: A.greet }); save(msgs); }
    render(); setTimeout(() => input.focus(), 60);
  }
  function close() { panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); document.body.classList.remove('chat-open'); fab.focus(); }
  fab.addEventListener('click', () => (panel.hidden ? open() : close()));
  root.querySelector('.chat-x').addEventListener('click', close);
  root.querySelector('#chatForm').addEventListener('submit', (e) => { e.preventDefault(); const t = input.value; input.value = ''; send(t); });
  quick.addEventListener('click', (e) => { const b = e.target.closest('[data-chat]'); if (b) send(b.textContent, b.dataset.chat); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(); });
  window.openChat = open;
  if (location.hash === '#chat') open();   // demo link: page.html#chat opens the assistant
})();
