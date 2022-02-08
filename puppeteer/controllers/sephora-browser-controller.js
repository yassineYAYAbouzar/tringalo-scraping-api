const puppeteer = require('puppeteer')
const cookiesJSON = null
exports.getContent = async (url) => {

    try {
        let numberOfTabs = (await global.browser.pages()).length
        if(numberOfTabs > 15) throw "To many tabs"//if to many tabs, we throw exception

        let page = await global.browser.newPage()//create new tab
        await page.goto(url)//go to page
        let content = await page.content()//load content into variable
        await page.close()//close tab
        global.tabs--;


        return content//we return page content

    } catch (error) {
        throw "Content could not be loaded"
    }

}

const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

const randomTimeOut = async (ms) => {
    let rand = Math.floor(Math.random() * (300))
    console.log(rand)
    await sleep(rand)
}