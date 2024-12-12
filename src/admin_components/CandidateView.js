import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming Axios for API calls

export const CandidateView = () => {
  const [candidatesWithJobs, setCandidatesWithJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(('http://localhost:5001/api/candidates'));
         // Replace with your actual API endpoint
        setCandidatesWithJobs(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setError('Failed to load candidates.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Handle loading and error states appropriately (e.g., display loading indicator or error message)

  return (
    <div>
      {isLoading ? (
        <p>Loading candidates...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {candidatesWithJobs.map((candidateJob) => (
            <li key={candidateJob.candidate._id}>
              {/* Display candidate details (name, email, etc.) and job details (title, description, etc.) */}
              <p>{candidateJob.candidate.name} - {candidateJob.job.title}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

