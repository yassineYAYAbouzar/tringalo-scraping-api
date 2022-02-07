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
        if(checkIfProductIsInDB(url)){//if product exist in DB, we return data from db to user
            
        }else{
            let content = await getContent(url)//load content
            if(content === null || content==='') throw "Error Loading Webcontent"
            const $ = cheerio.load(content)//load cheerio with page

            switch(topLevelDomain){//switch between cases
                case '.com'://.com
                    product = processPageDotCom($)//return product
                break;
                case '.es'://.es

                break;

                case '.fr'://.fr

                break;
            }
        }


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

const checkIfProductIsInDB = (url) => {//true if product is in db, false if is not
    return false
}

const saveProductToDB = (product) => {//saves product to db

}

const checkIfProductHasAllProperties = (product) => {//check if product has all properties before sending it to view

}

const processPageDotCom = ($) => {
    const product = {}//create product
    product.title = $('meta[property = og:title]').attr('content')//scrap og:title
    product.description = $('meta[property = og:description]').attr('content')//scrap og:description
    product.image = $('img.css-1rovmyu.eanm77i0').attr('src')//scrap og:img
    product.price = $('span.css-1oz9qb>.css-0').text()
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