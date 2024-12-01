const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: 'dfuvqlev7',
  api_key: '787693751926713',
  api_secret: 'hI6AzPCC2AlSnywBz1iUC31inCM',
})
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to the "uploads/resumes" folder
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
    // Exclude the password
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Route: Update Profile
router.put('/update-profile', upload.single('resume'), async (req, res) => {
  const token = req.headers['authorization'];
  const { username, email } = req.body;

  // Validate the file
  if (req.file && req.file.mimetype !== 'application/pdf') {
    return res.status(400).json({ message: 'Please upload a valid PDF file' });
  }

  let resumeUrl = null;
  if (req.file) {
    try {
      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'raw',
      });
      resumeUrl = result.secure_url;

      // Clean up the local file
      fs.unlinkSync(req.file.path);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to upload file' });
    }
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
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

module.exports = router