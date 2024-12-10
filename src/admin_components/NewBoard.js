import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
export const NewBoard = () => {
  const [reqt, setReqt] = useState('');
  const [date, setDate] = useState('');
  const [score, setScore] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { jobType, advt, lastDate } = location.state || {};  

  console.log(jobType, advt)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post('http://localhost:5001/api/profile-score', {
        requirement: reqt,
      });
      setScore(response.data || {}); // Set score or default to empty object if undefined
      console.log(response.data);

      const res = await axios.post('http://localhost:5001/api/save-details', {
        requirement: reqt,
        date: date,
        experts: response.data
      });
      console.log(res)
      console.log(res.data._id)
      navigate(`/admin/schedule-boards/${res.data._id}`, { state: { score: response.data } }); // Pass the score list directly
    } catch (error) {
      console.error("Error fetching profile score", error);
      setScore({}); // Reset score on error
    }
  };
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-12">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">{advt} Board Requirements </h2>

          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base text-lg font-semibold leading-7 text-gray-900">Type: {jobType}</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Technical Domain
                </label>

                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    value={reqt}
                    autoComplete="given-name"
                    onChange={(e) => setReqt(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


              <div className="col-span-full">
                <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
                  Date of interview
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* <div className="col-span-full">
                <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
                  Last Date to schedule interview
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    // value={formData.endDate}
                    // onChange={handleInputChange}
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div> */}

            </div>

          </div>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
