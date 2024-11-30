const mongoose = require('mongoose');

const JobPositionSchema = new mongoose.Schema({
  advt: { type: String, required: true },
  jobType: { type: String, required: true },
  publishDate: { type: Date, required: true },
  lastDate: { type: Date, required: true },
  description: { type: String, required: true },
  positionsAvailable: { type: Number, required: true },
  status: { type: String, required: true, default: 'Open' },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'  // References applications collection
  }],
});

module.exports = mongoose.model('Job', JobPositionSchema);
