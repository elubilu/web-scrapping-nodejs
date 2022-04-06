

// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// puppeteer usage as normal
puppeteer.launch({ headless: true }).then(async browser => {
  console.log('Running tests..')
  const page = await browser.newPage()
  await page.goto('https://www.lens.org/lens/search/patent/list?q=reference_cited.patent.lens_id:134-208-029-138-815')
  await page.waitForTimeout(5000)
  await page.screenshot({ path: 'testResult.png', fullPage: true })
  await browser.close()
  console.log(`All done, check the screenshot. ✨`)
})