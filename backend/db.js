const mongoose = require("mongoose");
const mongoUrl =  "mongodb+srv://khushichoudhary1107:Khushi123@cluster0.n31bj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function mongoDB(){
try{
    await mongoose.connect(mongoUrl,{useNewUrlParser:true});
    console.log("Connected to the database");

}
catch(error){
    console.error("Error connectin gto the database, error");
}

}

module.exports = mongoDB;