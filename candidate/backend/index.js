const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoDB = require('./db');

const candidateValidation  = require("./routes/CandidateValidation");


const app = express();
const port = 5000;

mongoDB();

app.use(cors({origin:'*'}));
app.use(express.json());

app.use('/api', candidateValidation);
app.use('/api', require('./routes/Job'));
app.use('/api', require('./routes/Candidate'));
app.use('/api', require('./routes/Application'));
app.use('/api',require('./routes/Profile'))
app.listen(port , ()=>{
    console.log(`App listening on port ${port}`);
});