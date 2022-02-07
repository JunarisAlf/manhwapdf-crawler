const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const { setTimeout } = require('timers/promises');
const axios = require('axios');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const getLinks = async (url) => {
        await page.goto(url, {
            waitUntil: 'load',
            timeout: 0,
        });
        const links = await page.$$eval(
            '.film-list > .animepost > .animposx > a',
            (links) => {
                return links.map((link) => link.href);
            }
        );
        // await fs.writeFile('./crawler/komikindo/data/all-comic.txt', links.join("\r\n"), {flag: 'a+'}, err => {
        //     console.log(err);
        // });
        console.log('succes : ' + url);

        for (const link of links) {
            axios
                .post('http://127.0.0.1:8000/api/crawler/tmp-link', {
                    data: [
                        {
                            link: link,
                            source: 'komikindo',
                        },
                    ],
                })
                .then((res) => {
                    console.log(link + '  ' + res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        if (page.$('.pagination > .next.page-numbers') == null) {
            return null;
        }
        return await page.$eval(
            '.pagination > .next.page-numbers',
            (link) => link.href
        );
    };

    let nextPageLink = await getLinks('https://komikindo.id/daftar-komik/');
    while (nextPageLink !== null) {
        nextPageLink = await getLinks(nextPageLink);
    }

    // await getLinks('https://komiku.id/daftar-komik/?tipe=manhwa', 'mahwa-links');
    // await getLinks('https://komiku.id/daftar-komik/?tipe=manhua', 'manhua-links');
    // await getLinks('https://komiku.id/daftar-komik/?tipe=manga', 'manga-links');

    await browser.close();
})();
