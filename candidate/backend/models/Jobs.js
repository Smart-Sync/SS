const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: false }, // Optional field for salary
    applications: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Application' } // References Application model
    ],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);
