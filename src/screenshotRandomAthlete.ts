import { chromium } from 'playwright';
import axios from "axios";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getRandomAthlete():Promise<string> {
    const response = await axios.get('https://liftoracle.com/api/v1/athletes?pageSize=12000');
    const allAthletes = response.data.data;
    const randomInt = getRandomInt(0, allAthletes.length);
    return allAthletes[randomInt];
}

async function getAthleteScreenshot(randomAthlete:string){
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1080, height: 612 });
    
    console.log(randomAthlete)
    await page.goto(`https://liftoracle.com/athlete/${randomAthlete}`);
    await page.waitForSelector('.chart-wrapper');
    
    await page.evaluate(() => {
        window.scrollBy(0, 88);
    });

    await page.screenshot({ path: `./screenshots/${randomAthlete}.png` });
    await browser.close();
    return `./screenshots/${randomAthlete}.png`;

}

export async function getRandomAthleteScreenshot() {
    // https://liftoracle.com/api/v1/athletes?pageSize=12000
    try{
        const randomAthlete = await getRandomAthlete();
        const screenshot = getAthleteScreenshot(randomAthlete);
    }catch(error){
        console.error(error);
    }

//   const randomAthlete = getRandomAthlete();
//   const screenshot = getAthleteScreenshot(randomAthlete);
//   return screenshot;
}