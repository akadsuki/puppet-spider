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

  console.log(titles);

  await browser.close();
})();