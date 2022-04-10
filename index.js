const puppeteer = require('puppeteer-extra')
const fs =  require('fs.promises')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// puppeteer usage as normal
puppeteer.launch({ headless: true }).then(async browser => {
    console.log('Running tests..')
    try {
        const page = await browser.newPage()
        await page.goto('https://www.lens.org/lens/search/patent/list?q=reference_cited.patent.lens_id:134-208-029-138-815')
        await page.waitForTimeout(5000)
        await page.screenshot({ path: new Date().getTime().toString()+".png", fullPage: true })
        console.log("Initial Screenshot Taken...")
        console.log("Clicking to Export....")
        await page.waitForTimeout(5000)
        await Promise.all([page.click(".analysis-toolbar-item") ])
        await page.screenshot({ path: "hello.png", fullPage: true })
        console.log("Second Screenshot Taken...")
        
        console.log("Clicking to Export Final....")
        await page.waitForTimeout(5000)
        await page.click(".btn-pri");
        
    } catch (e) {
        console.log(e)
    }



  await browser.close()
  console.log(`All done, check the screenshot. ✨`)
})