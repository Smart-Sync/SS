// // Backend: Fetch all candidates who have applied
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb');
;
const router = express.Router();
// const Job = require('../models/Jobs'); // Job schema
// const Application = require('../models/Application'); // Application schema


// module.exports = router
const mongoose = require('mongoose');
const Candidate = require('../models/Candidate'); // Adjust the path to your models
const Job = require('../models/Jobs');
const Application = require('../models/Application');

async function getCandidatesWithJobs() {
  try {
    const applications = await Application.find({})
      .populate('candidateId jobId'); // Populate both candidate and job details

    const candidateJobDetails = applications.map(application => ({
      candidate: application.candidateId,
      job: application.jobId,
    }));

    console.log('Candidates and their job applications:', candidateJobDetails);

    return candidateJobDetails;
  } catch (error) {
    console.error('Error fetching candidates and job applications:', error);
  }
}


async function getCandidatesByJobId(jobId) {
  try {
    const jobIdString = typeof jobId === 'string' ? jobId : jobId.toString();

    console.log('jobId as string:', jobIdString);

    console.log(jobId)
    const jobApplications = await Application.find({jobId})
      .populate('candidateId'); // populate candidate details
      console.log(jobApplications)

    const candidateDetails = jobApplications.map(application => application.candidateId);

    console.log("Number of candidates",` ${candidateDetails.length}`);
    console.log('Candidate Details:', candidateDetails);
    
    return {
      count: candidateDetails.length,
      candidates: candidateDetails
    };
  } catch (error) {
    console.error('Error fetching candidates:', error);
  }
}

// Replace 'jobId' with your actual job ID



router.get('/candidates', async (req, res) => {
  try {
    getCandidatesWithJobs();
      }
    

    // Create a combined list of candidates with their job advt
   
    
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/candidates/:jobId", async (req, res) => {
  try {
    console.log("Job ID received:", req.params.jobId); // Log the job ID for debugging
    
    // Ensure the `getCandidatesByJobId` function is awaited if it returns a promise
    const candidates = await getCandidatesByJobId(req.params.jobId);
    
    if (!candidates) {
      return res.status(404).json({ message: "No candidates found for the given job ID." });
    }
    
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router