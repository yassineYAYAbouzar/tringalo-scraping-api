const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

let startBrowser = async () => {
    let browser;

    try {
        browser = await puppeteer.launch({
            headless: true,
            ignoreDefaultArgs: ["--enable-automation"],
            args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--Mozilla/5.0 (Android 12; Mobile; rv:68.0) Gecko/68.0 Firefox/96.0'],
            ignoreHTTPSErrors: true,
        })

        return browser
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    startBrowser
}