import { config } from 'dotenv';
config();
import * as nodemailer from 'nodemailer';

export async function sendMail(meetScreenshotPath: string, athleteScreenshotPath: string) {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: 'nate@milwaukeebarbell.com',
            subject: 'Lift Oracle Screenshots',
            text: 'Here are the screenshots',
            attachments: [
                { path: meetScreenshotPath },
                { path: athleteScreenshotPath }
            ]
        }

        transporter.sendMail(mailOptions, function(error, info){
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