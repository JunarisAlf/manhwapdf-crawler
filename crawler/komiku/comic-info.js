const puppeteer = require('puppeteer');
const fs = require('fs/promises');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const getLinks = async (url, fileName) => {
        await page.goto(url);
        const links = await page.$$eval('#history > .ls4 > .ls4j > h4 > a', (links) =>{
            return links.map(link => link.href);
        })
        await fs.writeFile('./crawler/komiku/data/' + fileName + '.txt', links.join("\r\n"));
    }
    await getLinks('https://komiku.id/daftar-komik/?tipe=manhwa', 'mahwa-links');
    await getLinks('https://komiku.id/daftar-komik/?tipe=manhua', 'manhua-links');
    await getLinks('https://komiku.id/daftar-komik/?tipe=manga', 'manga-links');

    await browser.close();

})();