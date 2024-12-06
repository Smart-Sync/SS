import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import the useUser hook
import DashboardCand from '../components/DashboardCand';

export const Dashboard = () => {
  const { user, setUser, token } = useUser(); // Use user context
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token is available in the context
    if (!token) {
      navigate('/login'); // If no token, redirect to login
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: token }, // Make sure to pass token in the headers
        });
        // Store the user data from the response in the context
        setUser(res.data); // This will update the user context state
      } catch (error) {
        console.error(error);
        // Optionally, handle the error by redirecting to login or showing a message
        navigate('/login');
      }
    };

    fetchUser();
  }, [token, setUser, navigate]); // Add dependencies to trigger useEffect when token changes

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1> */}
      <DashboardCand />
    </div>
  );
};
