const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const Product = require('../models/product-model')

exports.findProduct = async (req, res) => {
    try {

        let url = req.body.url //take url
        if(!url.includes(req.params.shop)) throw "Not valid URL"
       
        let product = {}//instanciate product
        if(await checkIfProductIsInDB(url)){//if product is in db, save and return to view
            product = await Product.findOne({link: url})


        }else{

            let page = await axios.get(url)//load page
            if(page === null || page==='') throw "Error Loading WebPage"

            const $ = cheerio.load(page.data)//load cheerio with page
            product.title = $('meta[name = og:title]').attr('content') || $('meta[property = og:title]').attr('content') || ''//scrap og:title
            product.description = $('meta[name = og:description]').attr('content') || $('meta[property = og:description]').attr('content') ||''//scrap og:description
            product.image = $('meta[name = og:image]').attr('content') || $('meta[property = og:image]').attr('content') || ''//scrap og:img
            product.price = ''//we dont know price
            product.currency = 'EUR'//by default

            product = await saveProductToDB(product, url)
            
        }

        res.json({//return success response
            status: 'success',
            product: product
        }).end()

    } catch (error) {



        res.json({//return failed response
            status: 'failed',
            product: req.params.shop
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

    let product = await Product.findOne({ link: url })//we search the product

    if (!product) {
        return false
    } else {

        let timeInMs = Math.abs(product.updatedAt - new Date().getTime())
        let timeInHs = timeInMs / (3600 * 1000)
        if (timeInHs > 12) return false//if more than 12h, return false


        return true
    }


}