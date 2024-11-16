import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const profileData = {
  name:  localStorage.getItem("name"),
  email:  localStorage.getItem("email"),
  qualifications:  localStorage.getItem("qualifications"),
   skills: localStorage.getItem("skills"),
   experience: localStorage.getItem("years_of_expirience"),
   availability: localStorage.getItem("date_of_availability"),
    
   
  };
  console.log(localStorage.getItem("expertId"));

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={profileData.profilePic}
          alt="Profile"
          className="rounded-full h-20 w-20 object-cover"
        />
        <h1 className="text-2xl font-bold">{profileData.name}</h1>
      </div>
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Qualifications:</strong> {profileData.qualifications}</p>
        <p><strong>Skills:</strong> {profileData.skills}</p>
        <p><strong>Experience:</strong> {profileData.experience}</p>
        <p><strong>Availability:</strong> {profileData.availability}</p>
      </div>
      <Link
        to="/expert/edit-profile"
        className="mt-6 inline-block px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
      >
        Edit Profile
      </Link>
    </div>
  );
};

export default ProfilePage;
