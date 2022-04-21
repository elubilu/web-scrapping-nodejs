const puppeteer = require('puppeteer-extra')
const csvParse = require('csv-parse')
const csvParser = require('csv-parser')
const fs =  require('fs.promises')
const fsC =  require('fs')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())



// puppeteer usage as normal
puppeteer.launch({ headless: false }).then(async browser => {
    console.log('Running tests..')
    try {
        fsC.createReadStream("patentList/ListOfPatent2.csv")
        .pipe(csvParser())
        .on('data', async function(data){
            try {
                console.log("Link is: "+data.CitedLink);
                console.log("Patent Number is: "+data.PatentNo);
                // var url = 'https://www.lens.org/lens/search/patent/list?q=reference_cited.patent.lens_id:'+data.LensId;
                const page = await browser.newPage();
                await page.goto(data.CitedLink);
                await page.waitForSelector('.btn.btn-xs.analysis-toolbar-item.ng-binding');
                await page.evaluate(() => {
                    document.querySelectorAll(".btn.btn-xs.analysis-toolbar-item.ng-binding")[3].click();
                });
                await page.waitForSelector('[name="filename"]');
                await page.evaluate(() => {
                    document.querySelector('[name="filename"]').value = data.PatentNo;
                });
                await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: './myAwesomeDownloadFolder'});
                await page.waitForSelector('.btn.btn-sm.btn-pri.ng-binding');
                await page.evaluate(() => {
                    document.querySelector(".btn.btn-sm.btn-pri.ng-binding").click();
                });
                // await page.waitFor(Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000)
            }
            catch(err) {
                //error handler
            }
        })
        .on('end',async function(){
            //some final operation
                // const page = await browser.newPage();
                // await page.goto("https://www.lens.org/lens/search/patent/list?q=reference_cited.patent.lens_id:068-887-823-650-053");
                // await page.waitFor(5000);
                // await page.waitForSelector('.btn.btn-xs.analysis-toolbar-item.ng-binding');
                // await page.evaluate(() => {
                //     document.querySelectorAll(".btn.btn-xs.analysis-toolbar-item.ng-binding")[3].click();
                // });
                // await page.waitForSelector('[name="filename"]');
                // await page.evaluate(() => {
                //     document.querySelector('[name="filename"]').value = data.PatentNo;
                // });
                // await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: './myAwesomeDownloadFolder'});
                // await page.waitForSelector('.btn.btn-sm.btn-pri.ng-binding');
                // await page.evaluate(() => {
                //     document.querySelector(".btn.btn-sm.btn-pri.ng-binding").click();
                // });
                // await page.waitFor(Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000)
        });  
        
       
        // await page.screenshot({ path: new Date().getTime().toString()+".png"});
        console.log('Ended test..')
    } catch (e) {
        console.log(e)
    }



//   await browser.close()
  console.log(`All done, check the file ✨`)
})