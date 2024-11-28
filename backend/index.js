const express = require('express')
const axios = require('axios');
const cors = require('cors');
const saveDetails = require('./routes/SaveDetails')
const acceptance = require('./routes/ExpertAcceptance')
const result = require('./routes/MappingResults')
const boards = require('./routes/Boards')
const mail = require('./routes/SendMail')
const eachExpert = require('./routes/EachExpert')
const app = express();
const port = 5000;
const mongoDB = require('./db')
const mongoEx = require('./dbExpert')
const FASTAPI_URL = 'http://localhost:8000';
app.use(cors({origin: '*'}));
app.use(express.json());
mongoDB();
mongoEx();


// API route to get profile score from FastAPI
app.post('/api/profile-score', async (req, res) => {
    try {
        const { requirement } = req.body;
        console.log("calling api/match")
        // Send request to FastAPI service
        const response = await axios.post(`${FASTAPI_URL}/compute_profile_score/`, {
                requirement
        });
        console.log("Yes")
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: 'Error connecting to FastAPI service' });
    }
});

app.use('/api',acceptance)
app.use('/api', result)
app.use('/api', boards)
app.use('/api', mail)
app.use('/api', eachExpert)
app.use('/api',require("./routes/Expert"))

app.get('/',(req,res)=>{
    res.send('Hello World');
})
// Add this line to include your new route
app.use('/api', require("./routes/SaveDetails"));

app.use('/api',require("./routes/UserValidation"))
// app.use('/api',require("./routes/Board"))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })