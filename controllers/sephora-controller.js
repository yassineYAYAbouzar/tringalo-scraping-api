const axios = require('axios')
const cheerio = require('cheerio')
const {getContent} = require('../puppeteer/controllers/sephora-browser-controller')

exports.findProduct = async (req, res) => {
    try {//try

        let url = req.body.url//save url
        if(!url.includes('sephora')) throw "Not Valid URL"

        let content = await getContent(url)//load content
        if(content === null || content==='') throw "Error Loading Webcontent"
        const $ = cheerio.load(content)//load cheerio with page

        const product = {}//create product
        product.title = $('meta[property = og:title]').attr('content')//scrap og:title
        product.description = $('meta[property = og:description]').attr('content')//scrap og:description
        product.image = $('img.css-1rovmyu.eanm77i0').attr('src')//scrap og:img
        product.price = $('span.css-1oz9qb>.css-0').text()
        product.currency = 'EUR'//by default
        
        res.json({//send response with succes status
            status: 'success',
            product: product
        }).end()

    } catch (error) {//catch

        res.json({//send response with failed status
            status: 'failed',
            error: error
        }).end()
    }

}