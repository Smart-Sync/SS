import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditExpertProfile = () => {
  const navigate = useNavigate();
  const formatDateForInput = (dateString) => {
    if (!dateString) return ""; // Handle empty or undefined dates
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extract the date in yyyy-MM-dd format
  };
  const expertId = localStorage.getItem("expertId"); // Assuming expertId is stored
  const [profileData, setProfileData] = useState({
    expertId:  "",
    name:  "",
    email: "",
    qualifications: "",
    skills: "",
    years_of_experience: "",
    date_of_availability:  "",
   
  });

  const [loading, setLoading] = useState(true);

  // Fetch Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
       
    const response = await fetch(`http://localhost:5000/api/expert/profile/${expertId}`);
    
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
    
        const data = await response.json();
        setProfileData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    

    fetchProfile();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target)
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:5000/api/expert/profile/update/${expertId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        alert("Profile updated successfully!");
        console.log(updatedProfile)
        navigate(-1); // Redirect back to the Profile page
      } else {
        console.error("Error updating profile:", response.statusText);
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Qualification</label>
          <input
            type="text"
            name="qualifications"
            value={profileData.qualifications}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Skills</label>
          <textarea
            name="skills"
            value={profileData.skills}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
          <input
            type="text"
            name="years_of_experience"
            value={profileData.years_of_experience}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date of Availability</label>
          <input
            type="date"
            name="date_of_availability"
            value={formatDateForInput(profileData.date_of_availability)}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
