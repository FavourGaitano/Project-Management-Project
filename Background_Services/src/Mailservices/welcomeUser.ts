import mssql from 'mssql'
import dotenv from 'dotenv'
import { sqlConfig } from '../Config/sqlconfig'
import ejs from 'ejs'
import { sendMail } from '../Helpers/emailHelper'

dotenv.config()

export const welcomeUser = async()=>{
    const pool = await mssql.connect(sqlConfig)

    const users = (await pool.request().query('SELECT * FROM Users WHERE isWelcomed = 0 and isDeleted = 0')).recordset

    if (users.length === 0) {
        console.log('No new users to welcome.');
        return;
    }
    
    console.log(users);
    
    for(let user of users){

        if (!user.Email) {
            console.log(`No email defined for user: ${user.Name}`);
            continue; 
        }
        
        ejs.renderFile('Tempelates/welcomeUser.ejs', {name: user.Name}, async(error, data)=>{
            
            if (error) {
                console.error('Error rendering email template:', error);
                return; 
            }

                      
            let mailOptions = {
                from: "favourbuyanzi@gmail.com",
                to: user.Email,
                subject: "Welcome to Project Pulse",
                html: data
            }

            if (!mailOptions.to) {
                console.error(`The email address is undefined for user: ${user.Name}`);
                return;
            }

            console.log(`Sending email to ${mailOptions.to}`)

            

            try {
                await sendMail(mailOptions)

                await pool.request().query(`UPDATE Users SET isWelcomed = 1 WHERE User_id = '${user.User_id}'`)

                console.log(`Email sent to new user: ${user.Email}`);
                
            } catch (error) {
                console.error('Failed to send email:', error);
                
            }
        })
    }
}