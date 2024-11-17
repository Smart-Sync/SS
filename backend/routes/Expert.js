const express = require('express');
const router = express.Router();
const Expert = require('../models/Expert'); // Import your save details controller
const jwt = require('jsonwebtoken');
const jwtSecret = "fxswqouynmkljhgfdasw";


// Middleware to authenticate the user
const authenticateToken = (req, res, next) => {
  const token = req.header('authToken');
  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing!" });
  }

  try {
    const verified = jwt.verify(token,jwtSecret ); 
    req.expertId = verified.expertId; // Extract the expertId from the token
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token!" });
  }
};

// Route to get an expert's profile
router.get('/expert/profile/:expertId',  async (req, res) => {
  try {
    // Find the expert using the extracted expertId from the token
    const { expertId } = req.params;
    
    console.log("Error dfjfjfjfvmjvfj````````````````````````````````````````````````")
    const expert = await Expert.findById(expertId);

    if (!expert) {
      return res.status(404).json({ error: "Expert not found!" });
    }

    // Return the expert's profile
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
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, error: "Internal server error!" });
  }
});

// Update Expert Profile Route
router.put("/expert/profile/update/:expertId", async (req, res) => {
  try {
    const { name, email, qualifications, skills, experience, availability } = req.body;
    const { expertId } = req.params;
    // Find the expert by ID and update the profile
    const updatedExpert = await Expert.findByIdAndUpdate(
      expertId,
      {
        name,
        email,
        qualifications,
        skills,
        experience,
        availability,
      },
      { new: true } // Return the updated document
    );

    if (!updatedExpert) {
      return res.status(404).json({ message: 'Expert not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', expert: updatedExpert });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/experts/:{email}', async (req, res) => {
  try {
    const expert = await Expert.find(); // Assuming 'Expert' is your model name
    res.status(200).json(expert);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching experts' });
  }
});



module.exports = router;