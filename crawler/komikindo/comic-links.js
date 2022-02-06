const puppeteer = require('puppeteer');
const fs = require('fs/promises');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
   
    const getLinks = async (url) => {
        await page.goto(url, {
            waitUntil: 'load',
            timeout: 0
        });
        const links = await page.$$eval('.film-list > .animepost > .animposx > a', (links) =>{
            return links.map(link => link.href);
        })
        await fs.writeFile('./crawler/komikindo/data/all-comic.txt', links.join("\r\n"), {flag: 'a+'}, err => {
            console.log(err);
        });
        console.log("succes : " + url);

        if (page.$('.pagination > .next.page-numbers')  == null){
            return null;
        }
        return await page.$eval('.pagination > .next.page-numbers', link => link.href )
    }

    let nextPageLink = await getLinks('https://komikindo.id/daftar-komik/');
    while (nextPageLink !== null) {
        nextPageLink = await getLinks(nextPageLink);
    }
   
    // await getLinks('https://komiku.id/daftar-komik/?tipe=manhwa', 'mahwa-links');
    // await getLinks('https://komiku.id/daftar-komik/?tipe=manhua', 'manhua-links');
    // await getLinks('https://komiku.id/daftar-komik/?tipe=manga', 'manga-links');

    await browser.close();

})();