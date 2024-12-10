const express = require('express');
const router = express.Router();
const Job = require('../models/Jobs'); 

router.post('/', async (req, res) => {
    const {advt, jobType, lastDate, desc, pos} = req.body;
    const publishDate = Date.now();

    const job = new Job({
        advt,
        jobType,
        publishDate,
        lastDate,
        description: desc,
        positionsAvailable: pos,
        status: 'Open',
    });

    try {
        const savedJob = await job.save();
        res.status(200).json(savedJob);
    }catch(e){
        res.status(400).json({message: e.message});
    }
})

router.get('/', async (req,res) => {
    try{
        const jobs = await Job.find();
        res.status(200).json(jobs);
    }catch(e){
        res.status(500).json({message: e.message})
    }
})
module.exports = router