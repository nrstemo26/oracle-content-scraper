import { chromium } from 'playwright';
import axios from "axios";
import * as fs from 'fs';


function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getRandomAthlete():Promise<string> {
    const response = await axios.get('https://liftoracle.com/api/v1/athletes?pageSize=12000');
    const allAthletes = response.data.data;
    let randomInt;
    let usedNumbers: number[] = [];


    // Read the used numbers from the file
    if (fs.existsSync('usedAthleteNumbers.txt')) {
        const data = fs.readFileSync('usedAthleteNumbers.txt', 'utf8');
        usedNumbers = data.split(',').map(Number);
    }

    do {
        randomInt = getRandomInt(0, allAthletes.length);
    } while (usedNumbers.includes(randomInt));

    // Write the used number to the file
    usedNumbers.push(randomInt);
    fs.writeFileSync('usedAthleteNumbers.txt', usedNumbers.join(','));

    return allAthletes[randomInt];
}

async function getAthleteScreenshot(randomAthlete:string){
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 428, height: 926 });
    
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

export async function getRandomAthleteScreenshot():Promise<string> {
    try{
        const randomAthlete = await getRandomAthlete();
        const screenshotPath = getAthleteScreenshot(randomAthlete);
        return screenshotPath
    }catch(error){
        console.error(error);
        return'error';
    }
}