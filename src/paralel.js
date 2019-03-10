const { Cluster } = require('puppeteer-cluster');

(async () => {
    // Create a cluster with 2 workers
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 4,
    });

    // Define a task (in this case: screenshot of page)
    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);

        const path = url.replace(/[^a-zA-Z]/g, '_') + '.png';
        await page.screenshot({ path });
        console.log(`Screenshot of ${url} saved: ${path}`);
    });

    // Add some pages to queue
    cluster.queue('https://www.google.com');
    cluster.queue('https://www.wikipedia.org');
    cluster.queue('https://medium.com/');
    cluster.queue('https://google.co.id/');
    cluster.queue('https://bukalapak.com/');
    cluster.queue('https://tokopedia.com/');
    cluster.queue('https://lazada.co.id/');
    cluster.queue('https://shopee.co.id/');

    // Shutdown after everything is done
    await cluster.idle();
    await cluster.close();
})();