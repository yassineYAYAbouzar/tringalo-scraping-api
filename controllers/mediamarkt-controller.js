const axios = require('axios')
const cheerio = require('cheerio')
const params = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36'
    }
}

exports.findProduct = async (req, res) => {
    try {//try
        
        let url = req.body.url//save url
        if(!url.includes('mediamarkt')) throw "Not Valid URL"

        let page = await axios.get(url, params)//load page
        if(page === null || page==='') throw "Error Loading WebPage"

        const $ = cheerio.load(page.data)//load cheerio with page

        const product = {}//create product
        product.title = $('meta[property = og:title]').attr('content')//scrap og:title
        product.description = $('meta[property = og:description]').attr('content')//scrap og:description
        product.image = $('meta[property = og:image]').attr('content')//scrap og:img
        
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