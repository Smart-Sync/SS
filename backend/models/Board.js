const mongoose = require('mongoose');

const RequirementSchema = new mongoose.Schema({
  technicalDomain: String,
  researchAreas: String,
  educationalQualification: String,
  yearsOfExperience: String,
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model('Requirement', RequirementSchema);
