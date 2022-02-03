const axios = require('axios')
const cheerio = require('cheerio')

exports.findProduct = async (req, res) => {
    let url = req.body.url
    let page = await axios.get(url)
    const $ = cheerio.load(page.data)
    console.log($.html('body'))
    

    res.json({product: 'IN PROCESS'}).end()
}