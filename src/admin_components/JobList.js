import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

export const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState({});
  const [filterDate, setFilterDate] = useState("");
  const [disabledJobIds, setDisabledJobIds] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/jobs"); // Replace with your API endpoint
        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
    if (location.state?.refresh) {
      fetchJobs();
    }
  }, [location.state]);

  // Filter jobs based on selected month and year
  useEffect(() => {
    if (filterDate) {
      const [month, year] = filterDate.split("-");
      const filtered = jobs.filter((job) => {
        const jobDate = new Date(job.lastDate);
        return (
          jobDate.getMonth() + 1 === parseInt(month, 10) &&
          jobDate.getFullYear() === parseInt(year, 10)
        );
      });

      // Group the filtered jobs by jobType
      const groupedByJobType = groupByJobType(filtered);
      setFilteredJobs(groupedByJobType);
    } else {
      // If no date filter, group all jobs by jobType
      const groupedByJobType = groupByJobType(jobs);
      setFilteredJobs(groupedByJobType);
    }
  }, [filterDate, jobs]);

  // Function to group jobs by jobType
  const groupByJobType = (jobsArray) => {
    return jobsArray.reduce((grouped, job) => {
      if (!grouped[job.jobType]) {
        grouped[job.jobType] = [];
      }
      grouped[job.jobType].push(job);
      return grouped;
    }, {});
  };

  const handleCreateBoard = (job) => {
    setDisabledJobIds((prev) => [...prev, job._id]);
    navigate(`/admin/newboard`, {
      state: {
        jobType: job.jobType,
        advt: job.advt,
        lastDate: job.lastDate,
      },
    });
  };

  const jobUpdate = async (job) => {
    try {
      navigate(`/admin/update-job`, {
        state: {
          jobId: job._id,
          advt: job.advt,
          jobType: job.jobType,
          lastDate: job.lastDate,
          description: job.description,
          positionsAvailable: job.positionsAvailable,
          status: job.status,
          refresh: true,
        },
      });
    } catch (error) {
      console.error("Error navigating to job update page:", error);
      alert("Failed to navigate to the job update page. Please try again.");
    }
  };
  return (
    <div >
      <Navbar/>
      {/* Header Section */}
      <div className="px-16 ">
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-2xl font-bold">Job Positions</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            // Handle job creation navigation
            console.log("Redirect to job creation page");
          }}
        >
          Create New Job
        </button>
      </div>

      {/* Date Filter */}
      <div className="mb-4 w-52">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["month", "year"]}
            label="Filter by Month "
            onChange={(newValue) => {
              if (newValue) {
                const formattedDate = `${newValue.format(
                  "MM"
                )}-${newValue.format("YYYY")}`;
                setFilterDate(formattedDate);
              } else {
                setFilterDate("");
              }
            }}
            className="rounded border border-gray-300"
          />
        </LocalizationProvider>
      </div>

      {/* Job List */}
      <div className="grid grid-cols-1 gap-4">
        {Object.keys(filteredJobs).length > 0 ? (
          Object.keys(filteredJobs).map((jobType) => (
            <div key={jobType}>
              <h2 className="text-xl font-semibold mb-4">{jobType}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.isArray(filteredJobs[jobType]) ? (
                  filteredJobs[jobType].map((job) => (
                    <div
                      key={job._id}
                      className="border border-gray-300 p-4 rounded shadow-sm hover:shadow-md mb-4"
                    >
                      <h3 className="text-lg font-semibold">{job.advt}</h3>
                      <p className="text-gray-600">{job.description}</p>

                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <p className="text-sm">
                            <strong>Job Type:</strong> {job.jobType}
                          </p>
                          <p className="text-sm">
                            <strong>Published Date:</strong>{''}
                            {new Date(job.publishDate).toLocaleDateString(
                              'en-GB',
                              {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              }
                            )}
                          </p>
                          <p className="text-sm">
                            <strong>Last Date:</strong>{" "}
                            {new Date(job.lastDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            className={`font-semibold text-lg px-4 py-2 rounded ${
                              new Date() > new Date(job.lastDate)
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            onClick={() => handleCreateBoard(job)}
                            disabled={new Date() <= new Date(job.lastDate)}
                          >
                            Board
                          </button>
                          <button
                            className="bg-blue-500 text-white font-semibold text-lg px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => jobUpdate(job)}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No jobs found under this category.
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No jobs found for the selected month and year.
          </p>
        )}
      </div>
      </div>
    </div>
  );
};
