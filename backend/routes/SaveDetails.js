const express = require('express');
const router = express.Router();
const Detail = require('../models/Detail'); // Import your save details controller

// Endpoint to save form details
router.post('/save', async (req, res) => {
  try {
    const { requirement, date, experts } = req.body;

    const expertData = {};
        for (const [expertName, expertDetails] of Object.entries(experts)) {
            expertData[expertName] = {
                email: expertDetails.email,
                candidates: expertDetails.candidates.map(candidate => ({
                    Candidate: candidate.Candidate,
                    RelevancyScore: candidate['Relevancy Score']
                })),
                acceptanceStatus: expertDetails.acceptanceStatus || false // Handle acceptanceStatus

            };
        }
    
    const detail = new Detail({
        requirement,
        date,
        experts: expertData
    });

    await detail.save();
    res.status(200).json({ message: 'Details saved successfully' });
  } catch (error) {
    console.error('Error saving details:', error);
    res.status(500).json({ error: 'Error saving details' });
  }
});

module.exports = router;
