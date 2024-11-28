import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardCand from '../components/DashboardCand';



export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      console.log("fetch user token", token)
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: token },
        });
        setUser(res.data);
      } catch (error) {
        console.error('Failed to fetch user data');
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.username}!</h1>
      
  <DashboardCand/>
    </div>
  );
}


