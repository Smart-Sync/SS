const express = require('express');
const router = express.Router();
const Detail = require('../models/Detail'); // Import your save details controller
const crypto = require('crypto')


const createToken = (expertName, requirement, date) => {
  const validDate = new Date(date);

  if (isNaN(validDate.getTime())) {
    throw new Error('Invalid date format');
  }
  const data = `${expertName}-${requirement}-${validDate.toString()}`;
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Endpoint to save form details
router.post('/save', async (req, res) => {
  try {
    const { requirement, date, experts } = req.body;
    const expertArray = [];
    for (const [expertName, expertDetails] of Object.entries(experts)) {
      const token = createToken(expertName, requirement, date);

      // expertData[expertName] = {
      //   email: expertDetails.email,
      //   candidates: expertDetails.candidates.map(candidate => ({
      //     Candidate: candidate.Candidate,
      //     RelevancyScore: candidate['Relevancy Score']
      //   })),
      //   acceptanceStatus: expertDetails.acceptanceStatus || false, // Handle acceptanceStatus
      //   token: token,
      // };
      expertArray.push({
        name: expertName,
        email: expertDetails.email,
        candidates: expertDetails.candidates.map(candidate => ({
          Candidate: candidate.Candidate,
          RelevancyScore: candidate['Relevancy Score']
        })),
        acceptanceStatus: expertDetails.acceptanceStatus || false,
        token: token,
      });
    }

    const detail = new Detail({
      requirement,
      date,
      experts: expertArray
    });

    const savedBoard = await detail.save();
    res.status(200).json(savedBoard);
  } catch (error) {
    console.error('Error saving details:', error);
    res.status(500).json({ error: 'Error saving details' });
  }
});

module.exports = router;
