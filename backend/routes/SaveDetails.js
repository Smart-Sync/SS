const express = require('express');
const router = express.Router();
const MappingDetail = require('../models/MappingBoard'); // Import your save details controller
const crypto = require('crypto')


const createToken = (expertName, requirement, date) => {
  const validDate = new Date(date);

  if (isNaN(validDate.getTime())) {
    throw new Error('Invalid date format');
  }
  const data = `${expertName}-${requirement}-${validDate.toString()}`;
  return crypto.createHash('sha256').update(data).digest('hex');
}
const Expert = require('../models/Expert');

// Endpoint to save form details
router.post('/save-details', async (req, res) => {
  try {
    const { requirement, date, experts,jobType,jobId } = req.body;
    console.log(experts)
    const expertArray = [];
    for (const [expertName, expertDetails] of Object.entries(experts)) {
      const token = createToken(expertName, requirement, date);

      expertArray.push({
        name: expertName,
        email: expertDetails.email,
        candidates: expertDetails.candidates.map(candidate => ({
          Candidate: candidate.Candidate,
          RelevancyScore: candidate['Relevancy Score']
        })),
        acceptanceStatus: expertDetails.acceptanceStatus || "pending",
        scored: false,
        token: token,
      });
    }

    const detail = new MappingDetail({
      requirement,
      date,
      experts:expertArray,
      jobType,
      jobId
    });
    console.log(detail)
    const savedBoard = await detail.save();
    res.status(200).json(savedBoard);
  } catch (error) {
    console.error('Error saving details:', error);
    res.status(500).json({ error: 'Error saving details' });
  }
});
// Endpoint to fetch all saved form details
router.get('/details', async (req, res) => {
  try {
    // Fetch all details from the database
    const details = await MappingDetail.find();

    // Respond with the fetched details
    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching details:', error);
    res.status(500).json({ error: 'Error fetching details' });
  }
});
// Backend API to fetch experts list
router.get('/experts', async (req, res) => {
  try {
    const expert = await Expert.find(); // Assuming 'Expert' is your model name
    res.status(200).json(expert);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching experts' });
  }
});



module.exports = router;
