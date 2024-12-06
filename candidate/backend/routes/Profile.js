const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { extractData } = require('../ResumeParser');
const pdfParse = require('pdf-parse'); // For PDF parsing
cloudinary.config({
  cloud_name: 'dfuvqlev7',
  api_key: '787693751926713',
  api_secret: 'hI6AzPCC2AlSnywBz1iUC31inCM',
})

// Multer setup for file upload

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
      const user = await Candidate.findById(decoded.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Format skills and qualifications if they are arrays
      const skills = Array.isArray(user.skills) ? user.skills.join(', ') : user.skills || 'No skills available';
      const qualifications = Array.isArray(user.qualifications) ? user.qualifications.join(', ') : user.qualifications || 'No qualifications available';
      const years_of_experience = user.years_of_experience || 'Not specified';
  
      // Return the user profile with saved details
      res.json({
        name: user.name,
        email: user.email,
        skills: skills,  // Show skills as comma-separated if array
        qualifications: qualifications,  // Show qualifications as comma-separated if array
        years_of_experience: years_of_experience,
        resume: user.resume  // Show resume URL if available
      });
  
      console.log("User data retrieved: ", user);
    } catch (error) {
      console.error('Error retrieving profile:', error);
  
      // Specific error handling for token verification failure
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
  
      res.status(500).json({ message: 'Error retrieving profile' });
    } 
  });
  
  // Route: Update Profile
  router.put('/update-profile',  upload.single('resume'),async (req, res) => {
    const token = req.headers['authorization'];
    const { username, email } = req.body;
    let resumeUrl = null;
    if (req.file) {
      console.log("file",req.file.path)
      try {
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: 'raw',
        });
        resumeUrl = result.secure_url;
  
        // Clean up the local file
        
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to upload file' });
      }
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const filePath = req.file.path;
      const fileBuffer = fs.readFileSync(filePath);
  
      let text;
    
        const parsed = await pdfParse(fileBuffer);
        text = parsed.text;
     
  
      // Extract data
      const parsedData = extractData(text);
        console.log("parsedData",parsedData)
        fs.unlinkSync(req.file.path);
      
    //   if (!username || !email) {
    //     return res.status(400).json({ message: 'Username and email are required' });
    // }

    // Find the candidate by their ID and update their profile
    const updatedCandidate = await Candidate.findByIdAndUpdate(
        decoded.user.id,
        {
            name: username,
            email,
            resume: resumeUrl || undefined, // If resume is provided, update it
            skills:parsedData.skills,
            qualifications:parsedData.qualifications
        },
        { new: true }
    ).select('-password'); // Exclude password from the response

    res.json({ message: 'Profile updated successfully', user: updatedCandidate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});
router.post('/candidate/add', async (req, res) => {
  const { name, email, password, dob, mobile, address, skills, qualifications, years_of_experience, ID, resume } = req.body;

  try {
      // Check if the candidate with the same email or ID already exists
      const existingCandidate = await Candidate.findOne({ $or: [{ email }, { ID }] });
      if (existingCandidate) {
          return res.status(400).json({ error: 'Candidate with this email or ID already exists' });
      }

      // Create a new candidate
      const newCandidate = new Candidate({
          name,
          email,
          password,
          dob,
          mobile,
          address,
          skills,
          qualifications,
          years_of_experience,
          ID,
          resume
      });

      // Save the candidate to the database
      const savedCandidate = await newCandidate.save();

      res.status(201).json({ message: 'Candidate added successfully', candidate: savedCandidate });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add candidate' });
  }
});
module.exports = router