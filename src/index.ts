import {getRandomAthleteScreenshot} from "./screenshotRandomAthlete";
import { getRandomMeetScreenshot } from "./screenshotRandomMeet";
import {sendMail}  from "./sendMail";

async function run() {
    // https://liftoracle.com/api/v1/athletes?pageSize=12000
    try{
        const randomAthlete = await getRandomAthleteScreenshot();
        console.log(randomAthlete);
        const randomMeet = await getRandomMeetScreenshot();
        console.log(randomMeet);
        await sendMail(randomMeet, randomAthlete )
        
    }catch(error){
        console.error(error);
    }
}

run().catch(console.error);