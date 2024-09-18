import React,  { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const NewBoard = () => {
  const [reqt, setReqt] = useState('');
  const [score, setScore] = useState({});
  const navigate = useNavigate();
  const [technicalDomain, setTechnicalDomain] = useState('');
  const [researchAreas, setResearchAreas] = useState('');
  const [education, setEducation] = useState('Bachelor\'s');
  const [experience, setExperience] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create form data object
    const formData = {
      technicalDomain,
      researchAreas,
      educationalQualification: education,
      yearsOfExperience: experience,
      startDate,
      endDate,
    };

    // Send form data to backend
    try {
      const response = await fetch('http://localhost:5000/api/requirements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form submitted successfully');
      } else {
        alert('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/profile-score', {
            requirement: reqt,
        });
        setScore(response.data || {}); // Set score or default to empty object if undefined
        console.log(score);
        navigate('/admin/schedule-boards', { state: { score: response.data } }); // Pass the score list directly
      } catch (error) {
        console.error("Error fetching profile score", error);
        setScore({}); // Reset score on error
    }
    
};
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-12">
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">Upload Requirements for candidate selection</h2>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Job Information</h2>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Technical Domain Field */}
            <div className="sm:col-span-3">
              <label htmlFor="technical-domain" className="block text-sm font-medium leading-6 text-gray-900">
                Technical Domain
              </label>
              <div className="mt-2">
                <input
                  id="technical-domain"
                  name="technicalDomain"
                  type="text"
                  value={technicalDomain}
                  onChange={(e) => setTechnicalDomain(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Research Areas Field */}
            <div className="sm:col-span-3">
              <label htmlFor="research-areas" className="block text-sm font-medium leading-6 text-gray-900">
                Research Areas
              </label>
              <div className="mt-2">
                <input
                  id="research-areas"
                  name="researchAreas"
                  type="text"
                  value={researchAreas}
                  onChange={(e) => setResearchAreas(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Educational Qualification Field */}
            <div className="sm:col-span-3">
              <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">
                Educational Qualification
              </label>
              <div className="mt-2">
                <select
                  id="education"
                  name="education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Bachelor's</option>
                  <option>Master's</option>
                  <option>PhD</option>
                </select>
              </div>
            </div>

            {/* Year's of Experience Field */}
            <div className="sm:col-span-full">
              <label htmlFor="experience" className="block text-sm font-medium leading-6 text-gray-900">
                Year's of Experience
              </label>
              <div className="mt-2">
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Start Date Field */}
            <div className="sm:col-span-full">
              <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                Start Date to schedule interview
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  id="start-date"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* End Date Field */}
            <div className="sm:col-span-full">
              <label htmlFor="end-date" className="block text-sm font-medium leading-6 text-gray-900">
                Last Date to schedule interview
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  id="end-date"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

      <Link to = "/admin/homepage">  <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick = {handleFormSubmit}
        >
          Save
        </button></Link>
      </div>
    </form>
  </div>  )
}
