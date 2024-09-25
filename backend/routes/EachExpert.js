const express = require('express');
const router = express.Router();
const Expert = require('../models/Expert'); // Import the Expert model
const Detail = require('../models/Detail'); // Import your save details controller

// GET /api/expert/:id - Fetch expert details by ID
router.get('/expert/:id', async (req, res) => {
  try {
    const expertId = req.params.id;

    // Fetch the expert from the database
    const expert = await Expert.findById(expertId);

    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }

    // Return the expert's details (excluding password for security)
    const expertDetails = {
      name: expert.name,
      email: expert.email,
      qualifications: expert.qualifications,
      skills: expert.skills,
      years_of_experience: expert.years_of_experience,
      date_of_availability: expert.date_of_availability,
      
    };

    res.json(expertDetails);
  } catch (error) {
    console.error('Error fetching expert:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/expert/:email/interviews', async (req, res) => {
  const expertEmail = req.params.email;

  try {
    // Fetch interviews where the expert is involved and the status is "accepted" or "pending"
    const details = await Detail.find({
      experts: { $elemMatch: { email: expertEmail } },
    }).sort({ date: 1 });

    res.json(details);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});



module.exports = router;
