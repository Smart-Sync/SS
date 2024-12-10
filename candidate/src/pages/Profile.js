import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../UserContext.js"; // Import the custom hook
import Navbar from "../components/NavBar.js";
function Profile() {
  const { user, setUser, token } = useUser(); // Access user and token from context
  const [username, setUsername] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      const fetchProfile = async () => {
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
          alert("Failed to fetch profile");
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    } else {
      setUsername(user.name);
      setEmail(user.email);
      setLoading(false);
    }
  }, [user, setUser, token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        return alert("Please upload a valid PDF file.");
      }
      setResume(file);
      setResumePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    if (resume) {
      formData.append("resume", resume);
    }

    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:5000/api/update-profile`, formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" },
      });
      setUser(res.data);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setResume(null);
    setResumePreview("");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div >
      <Navbar/>
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
            onClick={handleUpdateProfile}
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
            <strong>Username:</strong> {user ? user.name : username}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {user ? user.email : email}
          </p>
          <p className="text-lg">
            <strong>Mobile:</strong> {user ? user.mobile : "Not available"}
          </p>
          <p className="text-lg">
            <strong>Skills:</strong> {user ? user.skills : "Not available"}
          </p>
          <p className="text-lg">
            <strong>Qualifications:</strong> {user ? user.qualifications : "Not available"}
          </p>
          <p className="text-lg">
            <strong>Date of Birth:</strong>{" "}
            {user ? new Date(user.dob).toLocaleDateString() : "Not available"}
          </p>
          <p className="text-lg">
            <strong>Years of Experience:</strong>{" "}
            {user ? user.years_of_experience : "Not available"}
          </p>
          <p className="text-lg">
            <strong>Resume:</strong>{" "}
            {user && user.resume ? (
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
    </div>
  );
}

export default Profile;
