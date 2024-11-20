const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    personalDetails: {
        name: { type: String, required: true },
        dateOfBirth: { type: String, required: true },
        gender: { type: String, required: true },
        nationality: { type: String, required: true }
    },
    educationDetails: {
        universityName: { type: String, required: true },
        yearOfPassing: { type: String, required: true }
    },
    contactDetails: {
        address: { type: String, required: true },
        mobile: { type: String, required: true }
    },
    documents: {
        resume: { type: String, required: true }, // Store file paths
        marksheets: { type: String, required: true },
        aadharCard: { type: String, required: true },
        coverLetter: { type: String } // Optional
    },
    status: { type: String, default: 'Pending' } // Pending, Approved, Rejected
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
