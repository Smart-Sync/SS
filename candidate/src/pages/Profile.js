import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState("");
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/profile`, {
          headers: { Authorization: token },
        });
        setUser(res.data);
        setUsername(res.data.name);
        setEmail(res.data.email);
        setResumeUrl(res.data.resume);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch profile");
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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    if (resume) {
      formData.append('resume', resume);
    }

    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:5000/api/update-profile`, formData, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
      });
      setUser(res.data);
      setResumeUrl(res.data.resume);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setResume(null);
    setResumePreview('');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>
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
        <div className="space-y-4">
          <p className="text-lg">
            <strong>Username:</strong> {user.name || username}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {user.email || email}
          </p>
          <p className="text-lg">
            <strong>Resume:</strong>{" "}
            {resumeUrl ? (
              <a
                href={user.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Resume
              </a>
            ) : (
              "No resume uploaded"
            )}
          </p>
          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
