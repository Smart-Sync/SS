import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Navbar } from './Navbar';

export const Filter = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/candidates/${id}`); // Replace with your actual API route
        console.log(response.data)
        setCandidates(response.data.candidates); // Assuming the response is an array of candidates
        console.log("****")
        console.log(candidates)
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setError('Failed to fetch candidates.');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div>
    <Navbar></Navbar>
    <div className="p-4">
      
      <h1 className="text-2xl font-bold text-center mb-4">Candidates</h1>
      {/* {loading && <p className="text-gray-500 text-center">Loading candidates...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>} */}

      {/* {!loading && !error && candidates.length === 0 && (
        <p className="text-center text-gray-700">No candidates found.</p>
      )} */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {candidates.map((candidate) => (
          <div
            key={candidate._id} // Assuming each candidate has a unique `id`
            className="border rounded-lg shadow-md p-4 flex flex-col items-center text-center"
          >
            <img
              src={candidate.profilePicture || `https://avatar.iran.liara.run/username?username=${candidate.name}`} // Placeholder if no profile picture
              alt={candidate.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-lg font-bold">{candidate.name}</h2>
            <p className="text-sm text-gray-700">{candidate.email}</p>
            <p className="text-sm text-gray-600">{candidate.skills}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};
