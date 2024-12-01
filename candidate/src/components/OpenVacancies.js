import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OpenVacancies = () => {
    const [jobs, setJobs] = useState([]);
    const candidateId = "YOUR_CANDIDATE_ID"; // Replace with logged-in candidate's ID

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await axios.get('http://localhost:5000/api/jobs');
            setJobs(res.data);
        };
        fetchJobs();
    }, []);

    const applyForJob = async (jobId) => {
        try {
            await axios.post('http://localhost:5000/api/candidates/apply', {
                candidateId,
                jobId
            });
            alert('Applied successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Job Listings</h1>
            <ul>
                {jobs.map(job => (
                    <li key={job._id}>
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                        <button onClick={() => applyForJob(job._id)}>Apply</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OpenVacancies;
