const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CandidateSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    job_position: { type: String, required: true },
    skills: { type: [String], required: true }, 
    qualifications: { type: [String], required: true }, 
    years_of_experience: { type: Number, required: true }, 
    specialisation: { type: [String], required: true }, 
    ID: { type: Number, required: true, unique: true },
    date: { type: Date, default: Date.now }, 
    applications: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Application' } 
    ],
    resume: { type: String, required: true } 
});
const Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;
