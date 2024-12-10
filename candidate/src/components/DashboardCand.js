import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import axios from "axios";
import JobListing from "./JobList";
import { useUser } from "../UserContext";
import { useApplications } from "../ApplicationContext";

const DashboardCand = () => {
  const { applications } = useApplications();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p className="mt-2">Browse and apply for open positions</p>
      </header>

      {/* Job Listings */}
      <JobListing
        jobs={jobs}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        applications={applications}
      />
    </div>
  );
};

export default DashboardCand;
