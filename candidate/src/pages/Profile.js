import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: token },
        });
        console.log(res)
        setUser(res.data);
        setUsername(res.data.name);
        setEmail(res.data.email);
        setResumeUrl(res.data.resume); // Assuming the resume URL is part of the response
      } catch (error) {
        console.error(error);
        alert('Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (resume) {
      formData.append('resume', resume); // Adding resume to the form data
    }

    try {
      const res = await axios.put(
        'http://localhost:5000/api/update-profile',
        formData,
        { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } }
      );
      setUser(res.data);
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
          <h2 className="text-xl font-bold">Upload Resume</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setResume(e.target.files[0])}
          className="w-full p-2 border rounded mt-2"
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
          <p><strong>Username:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p>
            <strong>Resume:</strong>{' '}
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Resume
              </a>
            ) : (
              'No resume uploaded'
            )}
          </p>
          
        
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
