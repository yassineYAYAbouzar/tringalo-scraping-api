const axios = require('axios')
const cheerio = require('cheerio')

exports.findProduct = async (req, res) => {
    try {//try

        let url = req.body.url//save url
        if(!url.includes('wallapop')) throw "Not Valid URL"

        let page = await axios.get(url)//load page
        if(page === null || page==='') throw "Error Loading WebPage"

        const $ = cheerio.load(page.data)//load cheerio with page

        const product = {}//create product
        product.title = $('meta[property = og:title]').attr('content')//scrap og:title
        product.description = $('meta[property = og:description]').attr('content')//scrap og:description
        product.image = $('meta[property = og:image]').attr('content')//scrap og:img
        product.price = ''//we dont know price
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