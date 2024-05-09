// import { chromium } from 'playwright';
import axios from "axios";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


async function run() {
    // https://liftoracle.com/api/v1/athletes?pageSize=12000
    try{
        const response = await axios.get('https://liftoracle.com/api/v1/athletes?pageSize=80000');
        const allAthletes = response.data.data;
        const randomInt = getRandomInt(0, allAthletes.length);
        
        console.log(allAthletes[randomInt]);
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