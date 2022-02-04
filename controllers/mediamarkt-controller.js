const axios = require('axios')
const cheerio = require('cheerio')
const {getContent} = require('../puppeteer/controllers/mediamarkt-browser-controller')

exports.findProduct = async (req, res) => {
    try {//try

        //HERE WE GET CONTENT
        let url = req.body.url//save url
        let content = await getContent(url)//return page content
        $ = cheerio.load(content)//load content into cheerio

        //HERE WE PROCESS OUR INFO
        const product = {}//create product
        product.title = $.html('h1').text()
        
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

const fetchScraperAPI = (apiKey, url) => {
    let scraperAPIURL = `http://api.scraperapi.com?api_key=${apiKey}&url=${url}`;//we prepare the url

    return axios.get(scraperAPIURL)//return axios promise
}