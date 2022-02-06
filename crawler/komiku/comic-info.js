const puppeteer = require('puppeteer');
const fs = require('fs/promises');

(async () => {
    // let links = await fs.readFile('./crawler/komiku/data/manhwa-links.txt', 'utf-8');
    // links = links.split("\r\n");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('')
    await browser.close()
})();