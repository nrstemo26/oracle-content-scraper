import { chromium } from 'playwright';
import axios from "axios";
import * as fs from 'fs';


function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


async function getRandomMeet():Promise<string> {
    const response = await axios.get('https://liftoracle.com/api/v1/meets?pageSize=12000');
    const allMeets = response.data.data;
    let randomInt;
    let usedNumbers: number[] = [];


    // Read the used numbers from the file
    if (fs.existsSync('usedMeetNumbers.txt')) {
        const data = fs.readFileSync('usedMeetNumbers.txt', 'utf8');
        usedNumbers = data.split(',').map(Number);
    }

    do {
        randomInt = getRandomInt(0, allMeets.length);
    } while (usedNumbers.includes(randomInt));

    // Write the used number to the file
    usedNumbers.push(randomInt);
    fs.writeFileSync('usedMeetNumbers.txt', usedNumbers.join(','));

    return allMeets[randomInt];
}

async function getMeetScreenshot(randomMeet:string): Promise<string>{
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 428, height: 926 });
    
    console.log(randomMeet)
    await page.goto(`https://liftoracle.com/meet/${randomMeet}`);
    await page.waitForSelector('.chart-wrapper');
    
    await page.evaluate(() => {
        window.scrollBy(0, 88);
    });

    await page.screenshot({ path: `./screenshots/${randomMeet}.png` });
    await browser.close();
    return `./screenshots/${randomMeet}.png`;

}

export async function getRandomMeetScreenshot():Promise<string> {
    try{
        const randomAthlete = await getRandomMeet();
        const screenshotPath = getMeetScreenshot(randomAthlete);
        return screenshotPath
    }catch(error){
        console.error(error);
        return 'error'
    }
}