const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const JWT_SECRET = " kjgruleij9dklii9domkk845509#($* 8mjdfu$$";
// Multer setup for file upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/resumes/'); // Save to the "uploads/resumes" folder
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`); // Rename the file to avoid collisions
  }
}); // Store file in memory temporarily
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(file.mimetype)) {
          return cb(new Error('Invalid file type. Only PDF is allowed.'));
      }
      cb(null, true);
  }
});

// Route: Get Profile
const JWT_SECRET = " kjgruleij9dklii9domkk845509#($* 8mjdfu$$";
router.get('/profile', async (req, res) => {
    const token = req.headers['authorization'];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await Candidate.findById(decoded.user.id).select('-password'); // Exclude the password
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
    const resumeUrl = req.file ? `/uploads/resumes/${req.file.filename}` : null;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!username || !email) {
        return res.status(400).json({ message: 'Username and email are required' });
    }

    // Find the candidate by their ID and update their profile
    const updatedCandidate = await Candidate.findByIdAndUpdate(
        decoded.user.id,
        {
            name: username,
            email,
            resume: resumeUrl || undefined, // If resume is provided, update it
        },
        { new: true }
    ).select('-password'); // Exclude password from the response

    res.json({ message: 'Profile updated successfully', user: updatedCandidate });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
}
  });

  