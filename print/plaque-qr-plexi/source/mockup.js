const { chromium } = require('playwright');
const fs = require('fs');
const [,, out] = process.argv;
const inner = (f) => fs.readFileSync(`${out}/${f}`, 'utf8').replace(/<\?xml[^>]*>/, '').replace(/<g id="guides"[\s\S]*?<\/g>/, '');
const wall = { clair: { bg: 'linear-gradient(135deg,#ece9e3,#d9d5cd)', name: 'mur clair' }, sombre: { bg: 'linear-gradient(135deg,#2b2d33,#16171b)', name: 'mur sombre' } };
(async () => {
  const b = await chromium.launch();
  for (const v of ['clair', 'sombre']) {
    const art = inner(`plaque-qr-${v}_apercu.svg`).replace(/width="150mm" height="200mm"/, 'width="100%" height="100%"');
    const html = `<html><body style="margin:0;width:1200px;height:1400px;background:${wall[v].bg};display:flex;align-items:center;justify-content:center;font-family:sans-serif">
      <div style="position:relative;width:750px;height:1000px">
        <!-- shadow of the print on the wall (plate stands 15mm off the wall) -->
        <div style="position:absolute;inset:0;transform:translate(26px,30px);filter:blur(7px) brightness(0);opacity:.28">${art}</div>
        <!-- acrylic sheet -->
        <div style="position:absolute;inset:0;border-radius:40px;background:linear-gradient(160deg,rgba(255,255,255,.22),rgba(255,255,255,.04) 45%,rgba(255,255,255,.12));box-shadow:inset 0 0 0 2px rgba(255,255,255,.55),inset 0 0 0 5px rgba(255,255,255,.12),0 2px 0 rgba(255,255,255,.4);"></div>
        <div style="position:absolute;inset:0">${art}</div>
        ${[[60,60],[690,60],[60,940],[690,940]].map(([x,y])=>`<div style="position:absolute;left:${x-36}px;top:${y-36}px;width:72px;height:72px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fafafa,#b9bcc2 45%,#7d8188 75%,#5c6067);box-shadow:3px 6px 10px rgba(0,0,0,.35)"></div>`).join('')}
      </div></body></html>`;
    const p = await b.newPage({ viewport: { width: 1200, height: 1400 }, deviceScaleFactor: 1 });
    await p.setContent(html);
    await p.screenshot({ path: `${out}/maquette-${v}.png` });
    // flat proof at print resolution for scan test (300 dpi ≈ 1772 x 2362 px)
    await p.setViewportSize({ width: 1772, height: 2362 });
    await p.setContent(`<html><body style="margin:0;background:${v === 'sombre' ? '#16171b' : '#e6e3dc'}">${inner(`plaque-qr-${v}_apercu.svg`).replace(/width="150mm" height="200mm"/, 'width="1772" height="2362"')}</body></html>`);
    await p.screenshot({ path: `${process.env.SP}/flat-${v}.png` });
    await p.close();
  }
  await b.close();
})();
