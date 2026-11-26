const { chromium } = require('playwright');
const fs = require('fs');
const [,, out] = process.argv;
const svg = (f) => fs.readFileSync(`${out}/${f}`, 'utf8').replace(/<\?xml[^>]*>/, '').replace(/width="150mm" height="200mm"/, 'width="150mm" height="200mm" style="display:block"');
const page = (f, bg = 'transparent') => `<section style="width:150mm;height:200mm;page-break-after:always;background:${bg};overflow:hidden">${svg(f)}</section>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  for (const v of ['clair', 'sombre']) {
    const html = `<html><head><style>@page{size:150mm 200mm;margin:0}body{margin:0}</style></head><body>
      ${page(`plaque-qr-${v}_1-COULEUR-CMJN.svg`)}
      ${page(`plaque-qr-${v}_2-BLANC.svg`)}
      ${page('plaque-qr_3-DECOUPE.svg')}
    </body></html>`;
    await p.setContent(html);
    await p.pdf({ path: `${out}/plaque-qr-${v}_IMPRESSION.pdf`, width: '150mm', height: '200mm', printBackground: true, preferCSSPageSize: true });
  }
  await b.close();
})();
