import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
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
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    if (resume) {
      formData.append("resume", resume);
    }

    try {
      const res = await axios.put(
        "http://localhost:5000/api/update-profile",
        formData,
        { headers: { Authorization: token, "Content-Type": "multipart/form-data" } }
      );
      setUser(res.data);
      setResumeUrl(res.data.resume);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>
      {isEditing ? (
        <form className="space-y-6" onSubmit={handleUpdateProfile}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Upload Resume</label>
            <input
              type="file"
              accept="application/pdf"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              onChange={(e) => setResume(e.target.files[0])}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
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
                href={resumeUrl}
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
