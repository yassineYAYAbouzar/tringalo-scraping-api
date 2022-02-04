const puppeteer = require('puppeteer')

let startBrowser = async () => {
    let browser;

    try {
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        })

        return browser
    } catch (err) {
        console.log('Could not create a browser instance...')
    }
}

module.exports = {
    startBrowser
}