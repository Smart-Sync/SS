const express = require('express');
const multer = require('multer');
const router = express.Router();
const Application = require('../models/Application');
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Candidate = require("../models/Candidate");
const Jobs = require("../models/Jobs");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const path = require('path');

const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

cloudinary.config({
    cloud_name: 'dfuvqlev7',
    api_key: '787693751926713',
    api_secret: 'hI6AzPCC2AlSnywBz1iUC31inCM',
});

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type.'));
        }
        cb(null, true);
    }
});

// ----Application Submit---- 
router.post('/apply', upload.fields([
    { name: 'scoreCard', maxCount: 1 },
    { name: 'proofOfDob', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
    { name: 'signature', maxCount: 1 },
]), async (req, res) => {
    try {
        const { jobId, candidateId, personalInfo, qualifications } = req.body;

        // Check if personalInfo is provided in the request
        if (!personalInfo || !personalInfo.dob || !personalInfo.mobile || !personalInfo.address) {
            return res.status(400).json({ message: 'Personal information is incomplete or missing.' });
        }

        // Default qualifications data (in case frontend didn't send them)
        const qualificationsFormatted = {
            gateScore: qualifications?.gateScore || 0, // Default GATE score
            highSchool: qualifications?.highSchool || 0, // Default High School score
            higherSecondary: qualifications?.higherSecondary || 0, // Default Higher Secondary score
            degree: qualifications?.degree || 'N/A', // Default Degree
            skills: qualifications?.skills ? JSON.parse(qualifications.skills) : [], // Empty skills array if not provided
            experienceYears: qualifications?.experienceYears || 0, // Default experience years
        };

        // Format personalInfo
        const personalInfoFormatted = {
            dob: new Date(personalInfo.dob),
            mobile: parseInt(personalInfo.mobile),
            address: personalInfo.address,
        };

        // Process files
        const fileUrls = {};
        const files = ['scoreCard', 'proofOfDob', 'photo', 'signature'];

        // Upload files to Cloudinary if they are present
        for (const field of files) {
            const file = req.files[field]?.[0];
            if (file) {
                const result = await cloudinary.uploader.upload(file.path, { resource_type: 'auto' });
                fileUrls[field] = result.secure_url;
                fs.unlinkSync(file.path); // Cleanup local file
            }
        }

        // If no photo or signature files were uploaded, check if URLs were provided from frontend
        const photo = req.body.photo || fileUrls.photo || ''; // Take the photo URL from frontend or cloudinary result
        const signature = req.body.signature || fileUrls.signature || ''; // Take the signature URL from frontend or cloudinary result

        // Create Application
        const application = new Application({
            jobId: new ObjectId(jobId),
            candidateId: new ObjectId(candidateId),
            documents: {
                scoreCard: fileUrls.scoreCard || '',
                proofOfDob: fileUrls.proofOfDob || '',
                photo: photo, // Use photo URL or Cloudinary upload
                signature: signature, // Use signature URL or Cloudinary upload
            },
            personalInfo: personalInfoFormatted,
            qualifications: qualificationsFormatted, // Attach default qualifications
            appliedAt: Date.now(),
        });

        // Save application
        const savedApplication = await application.save();

        // Update Candidate and Job records
        await Candidate.findByIdAndUpdate(candidateId, {
            $push: { applications: savedApplication._id },
            $set: personalInfoFormatted,
        });

        await Jobs.findByIdAndUpdate(jobId, {
            $push: { applications: savedApplication._id },
        });

        res.status(200).json({ message: 'Application submitted successfully.' });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Get Candidate History 
router.get('/application/candidate/:candidateId', async (req, res) => {
    try {
        const { candidateId } = req.params;

        const applications = await Application.find({ candidateId }).populate('jobId', 'advt lastDate');
        if (!applications.length) {
            return res.status(404).json({ message: 'No applications for this candidate' });
        }

        res.status(200).json(applications);

    } catch (e) {
        console.error('Error: ', e);
        res.status(500).json({ message: 'Internal server error' });
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
