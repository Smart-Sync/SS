const express = require('express')
const axios = require('axios');
const cors = require('cors');
const nodemailer = require('nodemailer')


const app = express();
const port = 5000;
const mongoDB = require('./db')
const FASTAPI_URL = 'http://localhost:8000';
app.use(cors());
app.use(express.json());
mongoDB();


// API route to get profile score from FastAPI
app.post('/api/profile-score', async (req, res) => {
    try {
        const { requirement } = req.body;
        console.log("calling api/match")
        // Send request to FastAPI service
        const response = await axios.post(`${FASTAPI_URL}/compute_profile_score/`, {
                requirement
        });
        
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: 'Error connecting to FastAPI service' });
    }
});

app.post('/send-email', async (req, res) => {
    const { expertName, recipientEmail } = req.body;
  
    try {
      // Create a transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other email services
        host: "smtp.gmail.com",
        auth: {
          user: 'tanviv8745@gmail.com', // Replace with your email
          pass: 'udol rccp ksrc bqog',  // Replace with your email password (or use OAuth2)
        },
      });
  
      // Email options
      const mailOptions = {
        from: 'tanviv@8745@gmail.com', // Replace with your email
        to: recipientEmail,
        subject: 'Expert Notification',
        text: `Dear User, you have an appointment with ${expertName}. Testing SmartSync`,
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log("Sent mail")
  
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email', error);
      res.status(500).send('Error sending email');
    }
});

  
app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/api',require("./routes/CreateUser"))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })