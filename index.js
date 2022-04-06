const puppeteer = require("puppeteer")
// const fs = require("fs/promises")

async function start() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto("https://www.lens.org")

  //Take screenshot of a webpage
  await page.screenshot({path : "test.png"})

  //Take screenshot of a full webpage
  await page.screenshot({path : "test.png", fullPage: true})

  await browser.close()
}

start()