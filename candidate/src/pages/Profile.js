import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: token },
        });
        setUser(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        'http://localhost:5000/api/update-profile',
        { username, email },
        { headers: { Authorization: token } }
      );
      setUser(res.data.user);
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={updateProfile}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
