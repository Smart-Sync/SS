const express = require('express');
const router = express.Router();
const Job = require('../models/Jobs');

// Get all jobs
router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Add a new job
router.post('/addJob', async (req, res) => {
    const { title, description, company, location } = req.body;
    try {
        const job = new Job({ title, description, company, location });
        await job.save();
        res.json(job);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
