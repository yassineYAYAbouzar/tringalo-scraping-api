const puppeteer = require('puppeteer')

exports.getContent = async (url) => {

    try {
        let numberOfTabs = (await global.browser.pages()).length
        if(numberOfTabs > 15) throw "To many tabs"//if to many tabs, we throw exception

        let page = await global.browser.newPage()//create new tab
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36, "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36", "Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/79.0.3945.73 Mobile/15E148 Safari/604.1')//user agent
        await page.goto(url)//go to page
        let content = await page.content()//load content into variable
        await page.close()//close tab
        global.tabs--;


        return content//we return page content

    } catch (error) {
        throw "Content could not be loaded"
    }

}