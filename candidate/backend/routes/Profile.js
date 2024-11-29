const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const jwt = require("jsonwebtoken");
// Route: Get Profile
const JWT_SECRET = " kjgruleij9dklii9domkk845509#($* 8mjdfu$$";
router.get('/profile', async (req, res) => {
    const token = req.headers['authorization'];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await Candidate.findById(decoded.user.id).select('-password'); // Exclude the password
      res.json(user);
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });
  
  // Route: Update Profile
  router.put('/update-profile', async (req, res) => {
    const token = req.headers['authorization'];
    const { username, email } = req.body;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const updatedCandidate = await Candidate.findByIdAndUpdate(
        decoded.user.id,
        { username, email },
        { new: true }
      ).select('-password'); // Exclude the password in response
      res.json({ message: 'Profile updated successfully', user: updatedCandidate });
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }a
  });
module.exports = router;