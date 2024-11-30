import React, { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from '../UserContext';
import axios from 'axios'
const DashboardCand = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);

  console.log(user);
  const recruitmentData = [
    { id: 1, advt: "Scientist Recruitment", publishDate: "10-Aug-2023", lastDate: "29-Sep-2023", status: "Closed" },
    { id: 2, advt: "Engineer Recruitment", publishDate: "01-Oct-2023", lastDate: "15-Nov-2023", status: "Open" },
  ];

  const filteredData = recruitmentData.filter((item) =>
    item.advt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSignOut = () => {
    logout(); // Remove user from context
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);  // Store fetched jobs in the state
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Group jobs by their jobType
  const groupJobsByType = (jobs) => {
    return jobs.reduce((acc, job) => {
      if (!acc[job.jobType]) {
        acc[job.jobType] = [];
      }
      acc[job.jobType].push(job);
      return acc;
    }, {});
  };

  const jobsGroupedByType = groupJobsByType(jobs);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-xl font-bold">DRDO</div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">Open Vacancies</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Download Formats</a>

            {/* Profile Dropdown Menu */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <FaUserCircle className="w-10 h-10 rounded-full" />
                <span>{user.name}</span>
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/profile-settings"
                        className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                      >
                        Your Profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                      >
                        Sign out
                      </button>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>

          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <h1 className="text-3xl font-bold">Job Listings</h1>
        <p className="mt-2">Browse and apply for open positions</p>
      </header>

      {/* Recruitment Table */}
      <div className="container mx-auto mt-6 bg-white shadow rounded p-4">
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="container mx-auto mt-6 bg-white shadow rounded p-4">
          {Object.keys(jobsGroupedByType).map((jobType) => {
            const jobsOfType = jobsGroupedByType[jobType];

            return (
              <div key={jobType} className="mt-6">
                <h2 className="text-2xl font-bold">{jobType}</h2>
                <table className="table-auto w-full text-left border-collapse mt-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 border">Sr. No.</th>
                      <th className="p-2 border">Advertisement</th>
                      <th className="p-2 border">Publish Date</th>
                      <th className="p-2 border">Last Date to Apply</th>
                      <th className="p-2 border">Description</th>
                      <th className="p-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobsOfType.map((job, index) => (
                      <tr key={job._id} className="hover:bg-gray-100">
                        <td className="p-2 border">{index + 1}</td>
                        <td className="p-2 border">{job.advt}</td>
                        <td className="p-2 border">{new Date(job.publishDate).toLocaleDateString()}</td>
                        <td className="p-2 border">{new Date(job.lastDate).toLocaleDateString()}</td>
                        <td className="p-2 border">{job.description}</td>
                        <td className="p-2 border">
                          <button className={`text-white p-2 rounded ${job.status === 'Closed' ? 'bg-gray-400' : 'bg-blue-500'}`}>
                            {job.status === 'Closed' ? 'Closed' : 'Apply'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>

      </div>



    </div>
  );
};

export default DashboardCand;
