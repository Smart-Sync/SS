import React, { useState } from 'react';

const Agenda = ({ interviews = [], currentExpert }) => {
  // State to track scores for each candidate
  const [scores, setScores] = useState({});
  const [selectedInterview, setSelectedInterview] = useState(null); // Track the selected interview for scoring
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open

  // Function to handle score changes for each parameter
  const handleScoreChange = (interviewIndex, candidate, param, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [interviewIndex]: {
        ...prevScores[interviewIndex],
        [candidate]: {
          ...prevScores[interviewIndex]?.[candidate],
          [param]: value,
        },
      },
    }));
  };

  // Open the scoring modal for a specific interview
  const openScoringModal = (interview) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
  };

  // Close the scoring modal
  const closeScoringModal = () => {
    setSelectedInterview(null);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full p-4">
      {/* My Agenda header */}
      <div className="border-b pb-2 mb-4">
        <button className="mr-4 border-b-2 border-blue-500 font-semibold">My Agenda</button>
      </div>

      {/* Map through interviews data */}
      {interviews.length === 0 ? (
        <p>No upcoming interviews</p>
      ) : (
        interviews.map((interview, index) => {
          const formattedDate = new Date(interview.date);
          const day = formattedDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
          const date = formattedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).toUpperCase();
          const time = formattedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

          // Find the current expert's data from the interview
          const expertData = interview.experts.find((expert) => expert.name === currentExpert);

          if (!expertData) return null; // If the current expert has no data in this interview, skip rendering

          return (
            <div key={index} className="mb-8">
              {/* Interview Information */}
              <div className="flex items-center mb-4">
                <div className="w-1/4 text-center">
                  <div className="text-lg font-semibold">{day}</div>
                  <div className="text-sm">{date}</div>
                </div>
                <div className="w-3/6">
                  <div className="text-blue-600">Interview for {interview.requirement}</div>
                  <div className="text-gray-500">Scheduled Interview</div>
                </div>
                <div className="w-1/2 flex items-center justify-end space-x-2">
                  <div className="text-sm">{time}</div>
                  {/* Feedback Button */}
                  <button
                    onClick={() => openScoringModal(interview)}
                    className="ml-4 bg-blue-500 text-white px-6 py-1 rounded hover:bg-blue-600 ml-8"
                  >
                    Scoring
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Modal for Candidate Scoring */}
      {isModalOpen && selectedInterview && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 lg:w-2/5 max-h-[70vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              Scoring for {selectedInterview.requirement}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse table-auto mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Candidate</th>
                    <th className="border p-2">Skills</th>
                    <th className="border p-2">Experience</th>
                    <th className="border p-2">Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInterview.experts
                    .find((expert) => expert.name === currentExpert)
                    ?.candidates.map((candidate, candidateIndex) => (
                      <tr key={candidateIndex}>
                        <td className="border p-2">{candidate.Candidate}</td>
                        {/* Skills Column */}
                        <td className="border p-2">
                          <input
                            type="number"
                            min="0"
                            max="5"
                            value={scores[selectedInterview._id]?.[candidate.Candidate]?.skills || ''}
                            onChange={(e) =>
                              handleScoreChange(selectedInterview._id, candidate.Candidate, 'skills', e.target.value)
                            }
                            className="border p-1 w-full text-center"
                          />
                        </td>
                        {/* Experience Column */}
                        <td className="border p-2">
                          <input
                            type="number"
                            min="0"
                            max="5"
                            value={scores[selectedInterview._id]?.[candidate.Candidate]?.experience || ''}
                            onChange={(e) =>
                              handleScoreChange(selectedInterview._id, candidate.Candidate, 'experience', e.target.value)
                            }
                            className="border p-1 w-full text-center"
                          />
                        </td>
                        {/* Engagement Column */}
                        <td className="border p-2">
                          <input
                            type="number"
                            min="0"
                            max="5"
                            value={scores[selectedInterview._id]?.[candidate.Candidate]?.engagement || ''}
                            onChange={(e) =>
                              handleScoreChange(selectedInterview._id, candidate.Candidate, 'engagement', e.target.value)
                            }
                            className="border p-1 w-full text-center"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Close Modal Button */}
            <div className="text-right">
              <button
                onClick={closeScoringModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agenda;
