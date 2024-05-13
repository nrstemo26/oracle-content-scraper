import { config } from 'dotenv';
config();
const nodemailer = require('nodemailer');

export async function sendMail(meetScreenshotPath: string, athleteScreenshotPath: string) {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: ['murph@milwaukeebarbell.com','nate@milwaukeebarbell.com'],
            subject: 'Lift Oracle Screenshots',
            text: 'Here are the random screenshots',
            attachments: [
                { path: meetScreenshotPath },
                { path: athleteScreenshotPath }
            ]
        }

        transporter.sendMail(mailOptions, function(error:any, info: any){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }catch(error){  
        console.error(error);
    }
}