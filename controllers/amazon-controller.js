const axios = require('axios')
const cheerio = require('cheerio')

exports.findProduct = async (req, res) => {
  (async () =>{ 
    try {
      for (const browserType of ['chromium', 'firefox']) {
          const browser = await playwright[browserType].launch();
          const context = await browser.newContext({locale: 'de-DE',
          timezoneId: 'Europe/Berlin' ,userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'});
          const page = await context.newPage();
          await page.goto(req.query.url);
          const html = await page.content();
          var $ = cheerio.load(await html);
            url = $('meta[property="og:url"]').attr('content')
            image = $('#landingImage').attr('src')
            description = $('#productDescription > p > span').text()
            title = $('#productTitle').text()
            price = $("span.a-text-price:nth-child(1) > span:nth-child(1)").text() || $("#kindle-price").text() 
            res.json({//if it scraps properly, returns status success + product
              status: 'success',
              product:{
                  title,
                  image,
                  description,
                  title,
                  price,
                  currency: 'USD'
              },
          }).end()
    await browser.close();
    }
    } catch (error) {
      res.json({//if something fails, return status failed + errors
          status: 'failed',
          product: error
      }).end()
    }
  })();
}
