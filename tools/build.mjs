// Build: bundles + minifies CSS/JS for production. Edit the source files, then run `npm run build`.
//   css/fonts.css + css/style.css + css/components.css -> css/bliss.min.css
//   js/data.js + js/main.js                    -> js/app.min.js
//   js/data.js + js/content.js + js/main.js    -> js/app-content.min.js (blog, looks)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { transform } from 'esbuild';

const read = (f) => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
const write = (f, s) => writeFileSync(new URL(`../${f}`, import.meta.url), s);
const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(1)} KB`;

async function css(out, files) {
  const src = files.map(read).join('\n');
  const { code } = await transform(src, { loader: 'css', minify: true, target: ['chrome100', 'safari15', 'firefox100'] });
  write(out, code); console.log(`${out}  ${kb(src)} -> ${kb(code)}`);
}
async function js(out, files) {
  // plain scripts (not modules): top-level names stay global so inline page scripts can use them
  const src = files.map(read).join(';\n');
  const { code } = await transform(src, { loader: 'js', minify: true, target: 'es2020' });
  write(out, code); console.log(`${out}  ${kb(src)} -> ${kb(code)}`);
}

await css('css/bliss.min.css', ['css/fonts.css', 'css/style.css', 'css/components.css']);
await js('js/app.min.js', ['js/data.js', 'js/main.js']);
await js('js/app-content.min.js', ['js/data.js', 'js/content.js', 'js/main.js']);
// page scripts: js/pages/<page>.js -> js/pages/<page>.min.js
for (const f of readdirSync(new URL('../js/pages/', import.meta.url)).filter((x) => x.endsWith('.js') && !x.endsWith('.min.js'))) {
  await js(`js/pages/${f.replace(/\.js$/, '.min.js')}`, [`js/pages/${f}`]);
}
