const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => errors.push('CONSOLE:' + msg.type() + ': ' + msg.text()));
  page.on('pageerror', err => errors.push('PAGEERROR:' + err.message));
  page.on('requestfailed', req => errors.push('REQFAIL:' + req.url() + ' ' + req.failure().errorText));
  await page.setViewport({ width: 1600, height: 1000 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: '/tmp/shot1.png' });
  await page.evaluate(() => window.scrollBy(0, 900));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: '/tmp/shot2.png' });
  console.log(JSON.stringify(errors, null, 2));
  await browser.close();
})();
