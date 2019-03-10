const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const extractGameList = async url => {
    const page = await browser.newPage();
    await page.goto(url);
    console.log(`scraping: ${url}`);

    const gameListOnPage = await page.evaluate(() => 
    Array.from(document.querySelectorAll('div.responsive_search_name_combined'))
      .map(data => ({
        title: data.querySelector('span.title').innerText.trim(),
        price: data.querySelector('div.search_price').innerText.replace(/(?:\r\n|\r|\n)/g, '-')
      }))
    )
    await page.close()
  
    if(gameListOnPage.length < 1) {
      console.log(`terminate recursion on: ${url}`);
      return gameListOnPage
    } else {
      const nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1
      const nextUrl = `https://store.steampowered.com/search/?specials=1&page=${nextPageNumber}`;

      return gameListOnPage.concat(await extractGameList(nextUrl))
    }
  }

  const browser = await puppeteer.launch();
  
  const firstUrl = `https://store.steampowered.com/search/?specials=1&page=1`;
  const GameList = await extractGameList(firstUrl)

  fs.writeFile(`game_list.json`, JSON.stringify(GameList), err => {
    if (err) throw err;
  })
  console.log(`save at: game_list.txt`);

  await browser.close();
})();