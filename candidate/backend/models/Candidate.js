const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    applications: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Application' } // References Application model
    ]
});

module.exports = mongoose.model('CandidateDatabase', CandidateSchema);
