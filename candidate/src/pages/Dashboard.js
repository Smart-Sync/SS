import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export const Dashboard = ()=> {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      console.log("fetch user token",token)
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <button
  className="p-4 bg-blue-500 text-white rounded-lg shadow-lg"
  onClick={() => navigate('/view-jobs')}
>
  View/Apply Jobs
</button>
<button
  className="p-4 bg-green-500 text-white rounded-lg shadow-lg"
  onClick={() => navigate('/profile-settings')}
>
  Profile Settings
</button>
<button
  className="p-4 bg-yellow-500 text-white rounded-lg shadow-lg"
  onClick={() => navigate('/application-history')}
>
  Application History
</button>
  </div>
    </div>
  );
}


