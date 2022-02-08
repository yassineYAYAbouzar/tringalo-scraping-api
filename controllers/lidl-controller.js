const axios = require('axios')
const cheerio = require('cheerio')


exports.findProduct = async (req, res) => {
    try {//try
        
        let url = req.body.url//save url
        if(!url.includes('lidl')) throw "Not Valid URL"

        let page = await axios.get(url)//load page
        if(page === null || page==='') throw "Error Loading WebPage"

        const $ = cheerio.load(page.data)//load cheerio with page

        const product = {}//create product
        product.title = $('meta[name = title]').attr('content')//scrap og:title
        product.description = $('meta[name = description]').attr('content')//scrap og:description
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


const saveProductToDB = async (product, url) => {//saves product to db
  
    try {
        let productDB = {//new product
            title: product.title,
            description: product.description,
            image: product.image,
            link: url,
            price: product.price,
            currency: product.currency,
            updatedAt: new Date()
        };

        let filter = {
            link: url
        }

        
        return await Product.findOneAndUpdate(filter, productDB, {
            new: true, upsert: true
        });
        
    } catch (error) {
        throw error
    }
}

const checkIfProductIsInDB = async (url) => {//true if product is in db and proper date and format, false if is not

    let product = await Product.findOne({link: url})//we search the product

    if(!product){
        return false
    }else{

        let timeInMs = Math.abs(product.updatedAt - new Date().getTime())
        let timeInHs = timeInMs / (3600*1000)
        if(timeInHs > 12) return false//if more than 12h, return false


        return true
    }
     

}