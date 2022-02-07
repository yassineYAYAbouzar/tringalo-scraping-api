const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const Product = require('../models/product-model')

const {getContent} = require('../puppeteer/controllers/sephora-browser-controller')


exports.findProduct = async (req, res) => {
    try {//try

        let url = req.body.url//save url
        if(!url.includes('sephora')) throw "Not Valid URL"
        let topLevelDomain = getTopLevelDomain(url)//we get the top level domain
        
        let product = {}
        if(await checkIfProductIsInDB(url)){//if product exist in DB, we return data from db to user
            global.tabs--
            product = await Product.findOne({productLink: url})
            

        }else{//if product doesn't exist in db, we scrap the data

            let content = await getContent(url)//load content
            if(content === null || content==='') throw "Error Loading Webcontent"
            const $ = cheerio.load(content)//load cheerio with page

            switch(topLevelDomain){//switch between cases
                case '.com'://.com
                    product = processPageDotCom($)//return THE product
                break;

                case '.es'://.es
                    product = processPageDotEs($)//return EL product
                break;

                case '.fr'://.fr
                    product = processPageDotFr($)//return LE product
                break;
            }
        }

        product = await saveProductToDB(product, url)//we save the product to the db

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

const getTopLevelDomain = (url) => {//returns TLD

    if(url.includes('.com')){//.com
        return '.com'
    }

    if(url.includes('.es')){//.es
        return '.es'
    }

    if(url.includes('.fr')){//.fr
        return '.fr'
    }

    if(url.includes('.ma')){//.ma
        return '.ma'
    }

    return '.com'

}

const checkIfProductIsInDB = async (url) => {//true if product is in db, false if is not

    let product = await Product.findOne({productLink: url})//we search the product

    if(!product){
        return false
    }else{
        

        console.log(new Date())
        console.log(product.updatedAt.getTime())
        return true
    }
     

}

const saveProductToDB = async (product, url) => {//saves product to db
    try {
        let productDB = {//new product
            productTitle: product.title,
            productDescription: product.description,
            productImage: product.image,
            productLink: url,
            productPrice: product.price,
            productPriceCurrency: product.currency,
            updatedAt: new Date()
        };

        let filter = {
            productLink: url
        }


        return await Product.findOneAndUpdate(filter, productDB, {
            new: true, upsert: true
        });
        
    } catch (error) {
        throw error
    }
}


const processPageDotCom = ($) => {
    const product = {}//create product
    product.title = $('meta[property = og:title]').attr('content') || ''//scrap og:title
    product.description = $('meta[property = og:description]').attr('content') || ''//scrap og:description
    product.image = $('img.css-1rovmyu.eanm77i0').attr('src') || ''//scrap og:img
    product.price = $('span.css-1oz9qb>.css-0').text() || ''
    product.currency = 'EUR'//by default
    return product
}

const processPageDotEs = ($) => {
    const product = {}//create product
    product.title = $('meta[property = og:title]').attr('content') || ''//scrap og:title
    product.description = $('img.primary-image').attr('content') || ''//scrap og:description
    product.image = $('div.').attr('src') || ''//scrap og:img
    product.price = $('span.css-1oz9qb>.css-0').text() || ''
    product.currency = 'EUR' || ''//by default
    return product
}

const processPageDotFr = ($) => {
    const product = {}//create product
    product.title = $('meta[property = og:title]').attr('content') || ''//scrap og:title
    product.description = $('meta[property = og:description]').attr('content') || ''//scrap og:description
    product.image = $('img.productthumbnail').attr('src') || ''//scrap og:img
    product.price = $('span.css-1oz9qb>.css-0').text() || ''
    product.currency = 'EUR'//by default
    return product
}

/*
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

} */