// src/components/EditProfile.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"

export const EditExpertProfile = () => {
  const [formData, setFormData] = useState({
    name: 'Dr. Kamala Sharma',
    email: '',
    password: '',
    qualifications: '',
    skills: '', // Change from expertise to skills
    availability: '',
    experience: '',
    profilePic: '', // This will hold the uploaded image as a data URL
  });
  useEffect(() => {
    const fetchExpertProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/experts/:{email}'); // Change to your actual API endpoint
        setPeople(response.data); // Assuming the data is an array of experts
      } catch (error) {
        console.error('Error fetching experts:', error);
      }
    };

    fetchExpertProfile();
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === 'select-multiple') {
      const selectedValues = Array.from(selectedOptions).map(option => option.value);
      setFormData(prevState => ({
        ...prevState,
        [name]: selectedValues,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle profile picture file change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          profilePic: reader.result, // Set the base64 string of the image
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Profile Updated Successfully!');
  };

  const goBack = () => {
    navigate('/expert/homepage');
  };

  return (
    <div className="max-w-5xl mx-auto py-10 flex">
      {/* Left Side - Back Arrow, Profile Picture, and Name */}
      <button onClick={goBack} className="self-start mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-600 hover:text-gray-900"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div className="w-1/3 bg-gray-10 p-6 rounded-l-lg flex flex-col items-center h-50">
        <img
          src='https://cdn-icons-png.flaticon.com/512/4514/4514882.png'
          alt="Profile"
          className="rounded-full h-20 w-20 object-cover mb-4"
        />
        <h2 className="text-xl font-semibold">{formData.name}</h2>
      </div>

      {/* Right Side - Form */}
      <div className="w-2/3 bg-white p-6 rounded-r-lg">
        <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Qualifications */}
          <div>
            <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700">
              Qualifications
            </label>
            <textarea
              name="qualifications"
              id="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              rows="3"
              placeholder="Enter your qualifications"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          {/* Skills */}
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <input
              type="text"
              name="skills"
              id="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Enter your skills, separated by commas"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <small className="text-gray-500">Enter your skills separated by commas.</small>
          </div>
                    {/* Experience */}
                    <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Number of Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              id="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Enter your years of experience"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Availability */}
          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
              Availability
            </label>
            <input
              type="date"
              name="availability"
              id="availability"
              value={formData.availability}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Udate Profile
            </button>
           
            <button
              type="button"
              onClick={goBack}
              className="w-full py-2 px-4 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


