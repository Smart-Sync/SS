import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const JobPosting = () => {
  const [formData, setFormData] = useState({
    title: "",
    advt: "",
    jobType: "",
    lastDate: "",
    description: "",
    positionsAvailable: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/jobs/add", {
        title: formData.title,
        advt: formData.advt,
        jobType: formData.jobType,
        lastDate: formData.lastDate,
        desc: formData.description,
        pos: formData.positionsAvailable,
      });
      alert("Job posted successfully!");
      setFormData({
        title: "",
        advt: "",
        jobType: "",
        lastDate: "",
        description: "",
        positionsAvailable: "",
      });
      navigate('/admin/jobs')
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-semibold text-gray-700">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Advertisement</label>
          <input
            type="text"
            name="advt"
            value={formData.advt}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Job Type</label>
          <input
            type="text"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Last Date</label>
          <input
            type="date"
            name="lastDate"
            value={formData.lastDate}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Positions Available</label>
          <input
            type="number"
            name="positionsAvailable"
            value={formData.positionsAvailable}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="text-sm font-semibold text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
          rows="4"
          required
        ></textarea>
      </div>

      <div className="mt-6 text-right">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Job
        </button>
      </div>
    </form>
  );
};

