import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState('');
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/profile`, {
          headers: { Authorization: token },
        });
        setUser(res.data);
        setUsername(res.data.name);
        setEmail(res.data.email);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        return alert('Please upload a valid PDF file.');
      }
      setResume(file);
      setResumePreview(URL.createObjectURL(file)); // Show the local preview before upload
    }
  };

  const updateProfile = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (resume) {
      formData.append('resume', resume);
    }

    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:5000/api/update-profile`, formData, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
      });
      setUser(res.data);
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setResume(null);
    setResumePreview('');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
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
            onChange={handleFileChange}
            className="w-full p-2 border rounded mt-2"
          />
          {/* Local Preview in an iframe */}
          {resumePreview && (
            <iframe
              src={resumePreview}
              title="Resume Preview"
              width="100%"
              height="300px"
              className="border mt-4"
            />
          )}

          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={updateProfile}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={cancelEdit}
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
            {user.resume ? (
              <a
                href={user.resume}
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
