const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const Application = require('../models/Application');
const Candidate = require('../models/Candidate');
const Job = require('../models/Jobs');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, JPEG, and PNG are allowed.'));
        }
    }
});

// Apply for a job
router.post('candidate/apply', upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 },
    { name: 'documents', maxCount: 10 }
]), async (req, res) => {
    const { candidateId, jobId, personalDetails, educationDetails, contactDetails } = req.body;

    try {
        // Check if candidate or job exists
        const candidate = await Candidate.findById(candidateId);
        const job = await Job.findById(jobId);

        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        // Handle uploaded files
        const uploadedFiles = {};
        if (req.files) {
            if (req.files.resume) uploadedFiles.resume = req.files.resume[0].path;
            if (req.files.coverLetter) uploadedFiles.coverLetter = req.files.coverLetter[0].path;
            if (req.files.documents) {
                uploadedFiles.documents = req.files.documents.map(file => file.path);
            }
        }

        // Create a new application
        const application = new Application({
            candidateId,
            jobId,
            personalDetails: JSON.parse(personalDetails), // Parse JSON strings from form data
            educationDetails: JSON.parse(educationDetails),
            contactDetails: JSON.parse(contactDetails),
            documents: uploadedFiles,
            status: 'Pending' // Default status for a new application
        });

        const savedApplication = await application.save();

        // Update Candidate and Job models with the application reference
        await Candidate.findByIdAndUpdate(candidateId, { $push: { applications: savedApplication._id } });
        await Job.findByIdAndUpdate(jobId, { $push: { applications: savedApplication._id } });

        res.status(201).json({ message: 'Application submitted successfully', application: savedApplication });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to submit application' });
    }
});

// Get all applications for a candidate
router.get('/candidate/:candidateId', async (req, res) => {
    const { candidateId } = req.params;

    try {
        const applications = await Application.find({ candidateId })
            .populate('jobId', 'title company') // Populate job details for better context
            .select('status jobId createdAt updatedAt'); // Select relevant fields

        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for this candidate' });
        }

        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

module.exports = router;
