const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')

/*product must include by now by only 5 fields: title, description, image, price, currency
    ex: product = {
            title: 'MAC | Glow Play Blush - Blush Soyeux',
            description: 'Avec le Blush Soyeux Glow Play soyez éclatante !\nÀ vous de définir les règles du jeu avec le Blush Glow Play qui apporte rebond et éclat à votre teint !\n\nLe Fard à joues Glow Play a une texture poids plume moelleuse qui glisse sur la peau et y dépose un soupçon de couleur pour un fini impeccable.\nUn blush soyeux à la texture coussinet innovante et infaillible et à la couleur modulable transparente à moyenne.\n\nLe résultat ?\nSoyeuse et intensifiable, sa formule teinte délicatement la peau pour créer un bel effet bonne mine.\nCette dernière paraît radieuse immédiatement et la couleur reste en place toute la journée sans pâlir pendant 8 heures.\n\n\nPourquoi on aime le Blush Glow Play?\n- Texture moelleuse légère\n- Longue tenue tout au long de la journée\n- Couleur fidèle\n- Effet bonne mine immédiat\n- Testé sous contrôle dermatologique\n- Non acnégène',
            image: 'https://www.sephora.fr/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dw0fea9daf/images/hi-res/SKU/SKU_2931/508458_swatch.jpg?sw=265&sh=265&sm=fit',
            price: '43',
            currency: 'USD',
        }
 */
exports.findProduct = (req, res) => {
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
                image = $('img .primary-image').attr('src')
                description = $('meta[property="og:description"]').attr('content')
                title = $('meta[property="og:title"]').attr('content')
                price = $('meta[itemprop="price"]').attr('content')
  
  
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
