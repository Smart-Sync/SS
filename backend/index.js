const express = require('express')
const axios = require('axios');
const cors = require('cors');

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
app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.use('/api',require("./routes/CreateUser"))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })