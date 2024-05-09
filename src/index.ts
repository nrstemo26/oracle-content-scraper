// import { chromium } from 'playwright';
import {getRandomAthleteScreenshot} from "./screenshotRandomAthlete";




async function run() {
    // https://liftoracle.com/api/v1/athletes?pageSize=12000
    try{
        const randomAthlete = await getRandomAthleteScreenshot();
        console.log(randomAthlete)
        
    }catch(error){
        console.error(error);
    }


    // const browser = await chromium.launch();
    // const page = await browser.newPage();
    // await page.goto('https://example.com');
    // await page.screenshot({ path: 'example.png' });
    // await browser.close();
}

run().catch(console.error);