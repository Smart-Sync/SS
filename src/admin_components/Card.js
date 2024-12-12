import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Card = ({ board }) => {
  const { requirement, date, _id } = board;
  const newD = new Date(date);
  const formatted = newD.toLocaleDateString('en-GB');
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/board-details/${_id}`);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching board details:', error);
        setError('Failed to load board details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [_id]); // Dependency array to ensure it runs only when `_id` changes

  return (
    <div className="border rounded-lg p-4 flex flex-col items-center text-center shadow-md space-y-4">
      {/* Title */}
      <h2 className="font-bold text-lg">{requirement}</h2>

      {/* Date */}
      <p className="text-sm font-bold text-gray-800">
        Interview On{' '}
        <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
          {formatted}
        </span>
      </p>

      {/* Loading or Error Message */}
      {loading && <p className="text-sm text-gray-500">Loading details...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Display fetched details */}
      {details && (
        <div className="mt-4 p-4 bg-gray-50 border rounded">
          <h3 className="font-bold">Board Details:</h3>
          <pre className="text-left">{JSON.stringify(details.jobId, null, 2)}</pre>
        </div>
      )}

      {/* Button */}
      <Link to={`/admin/schedule-boards/${_id}`}>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
          View Board
        </button>
      </Link>
      <Link to={`/admin/filter-candidates/${_id}`}>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
          View Candidate
        </button>
        </Link>
    </div>
  );
};
