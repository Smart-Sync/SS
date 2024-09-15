const mongoose = require("mongoose");
const mongoUrl =  "mongodb+srv://gofood:mern123@cluster0.ath82wk.mongodb.net/gofoodmern?retryWrites=true&w=majority";
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