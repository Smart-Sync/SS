const nodemailer = require('nodemailer')
const express = require('express');
const router = express.Router();

router.post('/candidate-interview-notif', async (req, res) => {
    const { expertName, recipientEmail, token } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'tanviv8745@gmail.com',
                pass: 'udol rccp ksrc bqog',
            },
        });

        const mailOptions = {
            from: 'tanviv8745@gmail.com',
            to: recipientEmail,
            subject: 'Invitation for SmartSync',
            html: `
          <div style="width: 100%; background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
            <div style="max-width: 600px; background-color: white; padding: 20px; margin: 0 auto; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              
              // <!-- Logo or Image -->
              // <img src="https://github.com/Sanaghufan/smart-sync/blob/master/src/asset/drdoofficial-seeklogo.com.png" alt="Logo" style="max-width: 100px; margin-bottom: 20px;" />
  
              <!-- Heading with SmartSync -->
              <h1 style="color: indigo; font-weight: bold; font-size: 24px; margin-bottom: 20px;">SmartSync</h1>
              
              <!-- Message -->
              <p style="font-size: 16px; color: #333; line-height: 1.6;">
                Dear User,<br><br>
                Greetings from Smart-Sync. 
                We are pleased to inform that you have been invited for an interview for job id </strong>.
              </p>
  
              <p style="font-size: 16px; color: #333; line-height: 1.6;">
                Would you like to accept or decline the invitation to this scheduled meeting?
              </p>
  
              <!-- Accept and Decline Buttons -->
              <div style="margin-top: 30px;">
                <a href="http://localhost:5001/api/update-response?token=${token}&response=accepted" 
                   style="display: inline-block; padding: 10px 20px; background-color: #4caf50; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px;">
                  Accept
                </a>
                
                <a href="http://localhost:5001/api/update-response?token=${token}&response=declined" 
                   style="display: inline-block; padding: 10px 20px; background-color: #f44336; color: white; text-decoration: none; border-radius: 5px;">
                  Decline
                </a>
              </div>
  
              <p style="margin-top: 30px; color: #777; font-size: 14px;">
                Thank you!<br>The SmartSync Team
              </p>
  
            </div>
          </div>
        `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Sent mail");

        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email', error);
        res.status(500).send('Error sending email');
    }
});

module.exports = router