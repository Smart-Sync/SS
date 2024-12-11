import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UpdateJob = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { jobId, advt, jobType, lastDate, description, positionsAvailable, status } = location.state || {};

    const [jobDetails, setJobDetails] = useState({
        advt: advt || '',
        jobType: jobType || '',
        lastDate: lastDate || '',
        description: description || '',
        positionsAvailable: positionsAvailable || '',
        status: status || 'Open',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5001/api/jobs/${jobId}`, jobDetails);
            console.log('Job updated successfully:', response.data);
            navigate('/admin/jobs'); // Redirect to job list page
        } catch (error) {
            console.error('Error updating job:', error);
            alert('Failed to update job. Please try again.');
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Update Job</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Advertisement Title</label>
                    <input
                        type="text"
                        name="advt"
                        value={jobDetails.advt}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Job Type</label>
                    <input
                        type="text"
                        name="jobType"
                        value={jobDetails.jobType}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Last Date</label>
                    <input
                        type="date"
                        name="lastDate"
                        value={jobDetails.lastDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={jobDetails.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        rows="4"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-gray-700">Positions Available</label>
                    <input
                        type="number"
                        name="positionsAvailable"
                        value={jobDetails.positionsAvailable}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Status</label>
                    <select
                        name="status"
                        value={jobDetails.status}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Update Job
                </button>
            </form>
        </div>
    );
};
