import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
 
  const navigate = useNavigate();
  const expertId = localStorage.getItem("expertId"); // Assuming expertId is stored
  const [profileData, setProfileData] = useState({
    expertId: "",
    name: "",
    email: "",
    qualifications: "",
    skills: "",
    experience: "",
    availability: "",
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

 
  if (loading) return <p>Loading profile...</p>;

  
 

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      

      {/* Profile Information */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
      <div className="mt-6 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-900">Full Name</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
              {profileData.name}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-900">Email Address</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
              {profileData.email}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-900">Qualification</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
              {profileData.qualifications}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-900">Skills</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
              {profileData.skills}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-900">Years of Experience</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
              {profileData.years_of_experience}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-900">Date of Availability</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
              {profileData.date_of_availability}
            </dd>
          </div>
        </dl>
      </div>
      
{/* Back Button */}
<div className="flex justify-center items-center mb-6">
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="px-4 mr-2 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Back
        </button>

        {/* Edit Button */}
        <Link
          // Navigate to edit profile page
          to={`/expert/edit-profile/${expertId}`}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Edit Profile
        </Link>
      </div>
     
    </div>
  );
};
