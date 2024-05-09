import {getRandomAthleteScreenshot} from "./screenshotRandomAthlete";

async function run() {
    // https://liftoracle.com/api/v1/athletes?pageSize=12000
    try{
        const randomAthlete = await getRandomAthleteScreenshot();
        console.log(randomAthlete)
        
    }catch(error){
        console.error(error);
    }
}

run().catch(console.error);