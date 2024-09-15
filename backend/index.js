const express = require('express')
const app = express();
const port = 5000;
const mongoDB = require('./db')

app.use(express.json());
mongoDB();
const cors = require('cors');
app.use(cors({origin:'http://localhost:3000',}))
app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.use('/api',require("./routes/CreateUser"))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })