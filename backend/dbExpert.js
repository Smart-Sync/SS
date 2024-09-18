const mongoose = require("mongoose");
const Expert = require("./models/Expert"); // Import the Expert model

// Connection string for MongoDB
const mongoUrl =  "mongodb+srv://khushichoudhary1107:Khushi123@cluster0.n31bj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Function to connect to MongoDB
async function mongoDB(){
    try{
        await mongoose.connect(mongoUrl,{useNewUrlParser:true});
        console.log("Connected to the expert database");
    //     const experts = await Expert.find({});
    // console.log("Experts:", experts);
    }
    catch(error){
        console.error("Error connecting to the database, error");
    }
    }
    
    module.exports = mongoDB;