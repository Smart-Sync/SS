const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },
  qualifications: {
    gateScore: { type: Number, required: false },
    highSchool: { type: Number, required: true },
    higherSecondary: { type: Number, required: true },
    degree: { type: String, required: true },
    skills: { type: [String], required: true },
    experienceYears: { type: Number, required: false },
  },
  documents: {
    scoreCard: { type: String, required: true },
    proofOfDob: { type: String, required: true },
    photo: { type: String, required: true },
    signature: { type: String, required: true },
  },
  status: { type: String, default: 'Pending' }, // Pending, Accepted, Rejected
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', ApplicationSchema);
