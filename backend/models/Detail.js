const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const detailSchema = new Schema({
    requirement: String,
    date: Date,
    no_of_experts:Number,
    jobType: String,
    jobId: String,
    experts: {
        type: Schema.Types.Mixed // Allows for any type of data
    },
    
});

const Detail = mongoose.model("Detail", detailSchema, "details");

module.exports = Detail;
