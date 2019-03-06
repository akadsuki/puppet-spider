const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = "https://store.steampowered.com/search/?specials=1";
  await page.goto(url);

  const titles = await page.evaluate(() => 
    Array.from(document.querySelectorAll('span.title'))
      .map((list) => list.innerText)
  );

  const prices = await page.evaluate(() => 
    Array.from(document.querySelectorAll('div.search_price'))
      .map((list) => list.innerText
      .replace(/(?:\r\n|\r|\n)/g, '|'))
  );

  console.log(prices);
  console.log(titles);

  await browser.close();
})();