const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const detailSchema = new Schema({
    requirement: String,
    date: Date,
    experts: {
        type: Schema.Types.Mixed // Allows for any type of data
    },
    
});

const Detail = mongoose.model("Detail", detailSchema, "details");

module.exports = Detail;
