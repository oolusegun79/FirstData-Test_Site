import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/segun/AppData/Roaming/npm/node_modules/puppeteer');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';

let n = 1;
while (fs.existsSync(path.join(screenshotsDir, `screenshot-${n}${label}.png`))) n++;
const outFile = path.join(screenshotsDir, `screenshot-${n}${label}.png`);

// Find Chrome executable
function findChrome() {
  const base = 'C:/Users/segun/.cache/puppeteer/chrome';
  for (const dir of fs.readdirSync(base)) {
    const full = path.join(base, dir);
    if (!fs.statSync(full).isDirectory()) continue;
    // Walk one more level
    for (const sub of fs.readdirSync(full)) {
      const candidate = path.join(full, sub);
      if (sub.endsWith('.exe')) return candidate;
      if (fs.statSync(candidate).isDirectory()) {
        for (const file of fs.readdirSync(candidate)) {
          if (file.endsWith('.exe')) return path.join(candidate, file);
        }
      }
    }
  }
  return null;
}

const executablePath = findChrome();
console.log('Chrome:', executablePath);

const browser = await puppeteer.launch({
  executablePath,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: outFile, fullPage: false });
await browser.close();

console.log(`Screenshot saved: ${outFile}`);
