const puppeteer = require("puppeteer")
// const fs = require("fs/promises")

async function start() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto("https://www.lens.org")

  //Take screenshot of a webpage
  await page.screenshot({path : "test.png"})
  await browser.close()
}

start()