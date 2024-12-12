import React from "react";
import { useNavigate } from "react-router-dom";

const JobList = ({ jobs, searchTerm, setSearchTerm, applications }) => {

  const navigate = useNavigate();
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
  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      job.advt.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.jobType.toLowerCase().includes(searchLower)
    );
  });

  const jobsGroupedByType = groupJobsByType(filteredJobs);
  const handleApply = (jobId) => {

    navigate(`/apply/${jobId}`, { state: { jobId } }); // Navigate to multi-step form with jobId
  };

  const isJobApplied = (jobId) => {
    return applications.some((application) => application.jobId === jobId);
  }

  return (
    <div className="container mx-auto mt-6 bg-white shadow rounded p-6">
      {/* Search Input */}
      <div className="mb-6 flex items-center relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-lg p-2 pr-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={() => setSearchTerm("")}
          >
            &times;
          </button>
        )}
      </div>

      {/* Job Listings */}
      <div>
        {Object.keys(jobsGroupedByType).map((jobType) => {
          const jobsOfType = jobsGroupedByType[jobType];

          return (
            <div key={jobType} className="mt-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{jobType}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobsOfType.map((job, index) => (
                  <div
                    key={job._id}
                    className="bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col"
                  >
                    {/* Serial Number */}
                    <div className="text-gray-800 text-lg font-medium mb-2 text-center">
                      <strong>Sr. No:</strong> {index + 1}
                    </div>

                    {/* Advertisement */}
                    <div className="text-center text-lg font-bold text-gray-800 mb-4">
                      {job.advt}
                    </div>



                    {/* Job Description */}
                    <p className="text-sm text-gray-600 text-center mb-4">
                      {job.description.substring(0, 100)}...
                    </p>

                    {/* Publish Date & Last Date */}
                    <div className="text-sm text-gray-500 mb-4 text-center">
                      <p>
                        <strong>Published:</strong>{" "}
                        {new Date(job.publishDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Apply By:</strong>{" "}
                        {new Date(job.lastDate).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center gap-4 mt-auto">
                      {isJobApplied(job._id) ? (
                        <button
                          className="bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed"
                          disabled> Applied
                        </button>
                      ) : (


                        <button
                          className={`bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition ${job.status === "Closed"
                            ? "bg-gray-400 cursor-not-allowed"
                            : ""
                            }`}
                          disabled={job.status === "Closed"}
                          onClick={() => handleApply(job._id)}
                        >
                          {job.status === "Closed" ? "Closed" : "Apply"}
                        </button>

                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobList;
