const express = require('express');
const multer = require('multer');
const router = express.Router();
const Application = require('../models/Application');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Submit job application
router.post('/application', upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'marksheets', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 }
]), async (req, res) => {
    const { candidateId, jobId, personalDetails, educationDetails, contactDetails } = req.body;
    const files = req.files;

    try {
        const application = new Application({
            candidateId,
            jobId,
            personalDetails: JSON.parse(personalDetails),
            educationDetails: JSON.parse(educationDetails),
            contactDetails: JSON.parse(contactDetails),
            documents: {
                resume: files.resume[0].path,
                marksheets: files.marksheets[0].path,
                aadharCard: files.aadharCard[0].path,
                coverLetter: files.coverLetter?.[0]?.path || null
            }
        });

        await application.save();
        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit application' });
    }
});

// Get all applications for admin
router.get('/application', async (req, res) => {
    try {
        const applications = await Application.find().populate('candidateId jobId');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

// Update application status
router.put('/application/:id', async (req, res) => {
    const { status } = req.body;

    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(application);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update application status' });
    }
});

module.exports = router;
