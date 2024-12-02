const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CandidateSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: {type: Date, required : true},
    mobile:{type: Number, required:true},
    address:{type:String, required:true},
    job_position: { type: String, required: true }, // Job position field
    skills: { type: String, required: true }, // Skills as a comma-separated string
    qualifications: { type: String, required: true }, // Educational qualifications
    years_of_experience: { type: Number, required: true }, // Number of years of experience
    ID: { type: Number, required: true, unique: true }, // Unique ID for the candidate
    date: { type: Date, default: Date.now }, // Default timestamp
    applications: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Application' } 
    ],
    resume: { type: String, required: true } 
});
const Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;
