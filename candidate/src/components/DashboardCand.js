import React, { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from '../UserContext';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import JobListing from './JobList';

const DashboardCand = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleSignOut = () => {
    logout(); // Remove user from context
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
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

  
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-xl font-bold">DRDO</div>
          <div className="flex items-center gap-4">
            <Link to="/view-jobs" className="text-gray-600 hover:text-blue-600">Open Vacancies</Link>
            <Link to="/application-history" className="text-gray-600 hover:text-blue-600">Application Hisrory</Link>

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
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p className="mt-2">Browse and apply for open positions</p>
      </header>

      {/* Job Listings */}
      <JobListing jobs={jobs} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};

export default DashboardCand;
