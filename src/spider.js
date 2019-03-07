const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = "https://store.steampowered.com/search/?specials=1";
  await page.goto(url);

  const steamSales = await page.evaluate(() => ({
    title: Array.from(document.querySelectorAll('span.title'))
            .map((list) => list.innerText),
    price: Array.from(document.querySelectorAll('div.search_price'))
            .map((list) => list.innerText
            .replace(/(?:\r\n|\r|\n)/g, '|'))
  }));

  console.log(steamSales);

  await browser.close();
})();
