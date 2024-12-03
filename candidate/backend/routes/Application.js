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
})



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
        const allowedTypes = ['application/pdf', , 'image/jpeg', 'image/png', 'image/jpg'];
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

        
        const qualificationsFormatted = {
            gateScore: parseInt(qualifications.gateScore),
            highSchool: parseInt(qualifications.highSchool),
            higherSecondary: parseInt(qualifications.higherSecondary),
            degree: qualifications.degree,
            skills: Array.isArray(qualifications.skills)
                ? qualifications.skills // If it's already an array, use it
                : JSON.parse(qualifications.skills || '[]'),
            experienceYears: parseInt(qualifications.experienceYears),
        };


        const personalInfoFormatted = {
            dob: new Date(personalInfo.dob),
            mobile: parseInt(personalInfo.mobile),
            address: personalInfo.address,
        };

        const fileUrls = {};
        const files = ['scoreCard', 'proofOfDob', 'photo', 'signature'];

        //Upload files to Cloudinary and store URLs
        for (const field of files) {
            const file = req.files[field]?.[0];
            if (file) {
                const resourceType = file.mimetype.startsWith('image/') ? 'image' : 'raw'; // Determine resource type
                const result = await cloudinary.uploader.upload(file.path, { resource_type: resourceType }, (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        return res.status(500).json({ message: 'File upload failed' });
                    }
                    fileUrls[field] = result.secure_url;
                });
                fs.unlinkSync(file.path); // Cleanup local file
            }
        }
        const jobObjectId = new ObjectId(jobId);
        const candidateObjectId = new ObjectId(candidateId);

        // After uploading files, create the Application record
        const application = new Application({
            jobId: jobObjectId,
            candidateId: candidateObjectId,
            qualifications: qualificationsFormatted,
            documents: fileUrls, // Store the Cloudinary URLs
            appliedAt: Date.now(),
        });

        // Save the application
        const savedApplication = await application.save();

        // Update the Candidate's applications field (Reference to the Application)
        await Candidate.findByIdAndUpdate(candidateObjectId, {
            $push: { applications: savedApplication._id },
            $set: {
                dob: personalInfoFormatted.dob,
                mobile: personalInfoFormatted.mobile,
                address: personalInfoFormatted.address,
            },
        });

        // Update the Job's applications
        await Jobs.findByIdAndUpdate(jobObjectId, {
            $push: { applications: savedApplication._id },
        });

        // Respond with a success message
        res.status(200).json({ message: 'Application submitted successfully' });

    } catch (error) {
        console.error('Error submitting application:', error);
        // Cleanup files in case of error
        if (req.files) {
            Object.values(req.files).forEach(fieldFiles => {
                fieldFiles.forEach(file => {
                    if (file.path && fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                    }
                });
            });
        }
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
