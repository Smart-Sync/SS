import React, { useState, useEffect } from 'react';

const Agenda = ({ expertDetail }) => {
  const [interviews, setInterviews] = useState([]);
  const [pendingInterviews, setPendingInterviews] = useState([]);
  const [scoredInterviews, setScoredInterviews] = useState([]);
  const [scores, setScores] = useState({});
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackScreen, setIsFeedbackScreen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [feedback, setFeedback] = useState({});

  const currentExpert = expertDetail.name;

  // Fetch interviews and categorize them
  const fetchInterviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/expert/${expertDetail.email}/interviews`
      );
      const data = await response.json();

      const pending = [];
      const scored = [];

      data.forEach((interview) => {
        const expertData = interview.experts.find(
          (expert) => expert.name === currentExpert
        );

        if (expertData) {
          if (expertData.scored) {
            scored.push(interview);
          } else {
            pending.push(interview);
          }
        }
      });

      setInterviews(data);
      setPendingInterviews(pending);
      setScoredInterviews(scored);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  // Open the scoring modal for the selected interview
  const openScoringModal = (interview) => {
    console.log('Opening scoring modal for interview:', interview); // Debugging statement
    setSelectedInterview(interview);
    setIsModalOpen(true);
    setIsFeedbackScreen(false); // Start with scoring screen
  };

  // Close the scoring modal
  const closeScoringModal = () => {
    setSelectedInterview(null);
    setIsModalOpen(false);
    setIsFeedbackScreen(false); // Reset to scoring screen on close
  };

  // Handle score change for candidates
  const handleScoreChange = (candidateName, param, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [candidateName]: {
        ...prevScores[candidateName],
        [param]: value,
      },
    }));
  };

  // Handle star rating change for feedback
  const handleFeedbackChange = (candidateName, stars) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [candidateName]: stars,
    }));
  };

  // Go to feedback screen after scoring
  const handleNext = () => {
    setIsFeedbackScreen(true); // Transition to feedback screen
  };

  // Submit the review after feedback
  const handleSubmitReview = () => {
    if (!selectedInterview) {
      setErrorMessage('No interview selected for scoring.');
      return;
    }

    const candidatesToReview =
      selectedInterview.experts.find(
        (expert) => expert.name === currentExpert
      )?.candidates || [];

    let isAnyFeedbackGiven = false;

    candidatesToReview.forEach((candidate) => {
      const candidateName = candidate.Candidate;
      const { skills, experience, communication } = scores[candidateName] || {};
      const stars = feedback[candidateName] || 0;

      if (
        skills >= 0 &&
        skills <= 5 &&
        experience >= 0 &&
        experience <= 5 &&
        communication >= 0 &&
        communication <= 5 &&
        stars > 0
      ) {
        isAnyFeedbackGiven = true;
        console.log(`Feedback for ${candidateName}:`, {
          skills,
          experience,
          communication,
          stars,
        });
        setSuccessMessage(
          `Feedback for ${candidateName} submitted successfully.`
        );
      }
    });

    if (!isAnyFeedbackGiven) {
      setErrorMessage(
        'No feedback was provided. Please fill in scores for the candidates.'
      );
    } else {
      closeScoringModal();
      fetchInterviews(); // Refresh interview data after scoring
    }
  };

  // Render each interview for display
  const renderInterviews = (interviews, type) => {
    return interviews.map((interview, index) => {
      const formattedDate = new Date(interview.date);
      const day = formattedDate
        .toLocaleDateString('en-US', { weekday: 'short' })
        .toUpperCase();
      const date = formattedDate
        .toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
        .toUpperCase();
      const time = formattedDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      return (
        <div key={index} className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1/4 text-center">
              <div className="text-lg font-semibold">{day}</div>
              <div className="text-sm">{date}</div>
            </div>
            <div className="w-3/6">
              <div
                className={
                  type === 'pending'
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }
              >
                {interview.requirement} Interview
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-end space-x-2">
              <div className="text-sm mr-16">{time}</div>
              {type === 'pending' && (
                <button
                  onClick={() => openScoringModal(interview)} // Ensure this calls openScoringModal
                  className="ml-4 bg-blue-500 text-white px-6 py-1 rounded hover:bg-blue-600 ml-8"
                >
                  Score
                </button>
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full p-4">
      <div className="border-b mb-3"></div>

      {pendingInterviews.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-2">Pending Interviews</h2>
          {renderInterviews(pendingInterviews, 'pending')}
        </div>
      )}

      {scoredInterviews.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-2">Completed Interviews</h2>
          {renderInterviews(scoredInterviews, 'scored')}
        </div>
      )}

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}

      {/* Modal Logic */}
      {isModalOpen && selectedInterview && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => closeScoringModal()}
        >
          <div className="fixed inset-0 bg-black opacity-80"></div>
          <div
            className="relative bg-white rounded-lg p-6 shadow-lg w-3/4 max-w-2xl max-h-96 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {!isFeedbackScreen ? (
              <>
                <h2 className="text-lg text-center font-bold mb-4">
                  Scoring for {selectedInterview.requirement}
                </h2>
                <table className="table-auto w-full border">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">Candidate</th>
                      <th className="px-4 py-2 border">Skills</th>
                      <th className="px-4 py-2 border">Experience</th>
                      <th className="px-4 py-2 border">Communication</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInterview.experts
                      .find((expert) => expert.name === currentExpert)
                      ?.candidates.map((candidate, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 border">
                            {candidate.Candidate}
                          </td>
                          <td className="px-4 py-2 border">
                            <input
                              type="number"
                              min="0"
                              max="5"
                              className="border px-2 py-1 w-full"
                              value={
                                scores[candidate.Candidate]?.skills || ''
                              }
                              onChange={(e) =>
                                handleScoreChange(
                                  candidate.Candidate,
                                  'skills',
                                  parseInt(e.target.value, 10)
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-2 border">
                            <input
                              type="number"
                              min="0"
                              max="5"
                              className="border px-2 py-1 w-full"
                              value={
                                scores[candidate.Candidate]?.experience || ''
                              }
                              onChange={(e) =>
                                handleScoreChange(
                                  candidate.Candidate,
                                  'experience',
                                  parseInt(e.target.value, 10)
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-2 border">
                            <input
                              type="number"
                              min="0"
                              max="5"
                              className="border px-2 py-1 w-full"
                              value={
                                scores[candidate.Candidate]?.communication || ''
                              }
                              onChange={(e) =>
                                handleScoreChange(
                                  candidate.Candidate,
                                  'communication',
                                  parseInt(e.target.value, 10)
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-center">

                  <button
                    onClick={closeScoringModal}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-8"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleNext}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg text-center font-bold mb-4">
                  Feedback for {selectedInterview.requirement}
                </h2>

                <div className="text-center mb-4">
                  <label className="block text-sm mb-2">Overall Rating</label>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, index) => {
                      const starValue = index + 1;
                      return (
                        <svg
                          key={starValue}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-6 w-6 cursor-pointer ${feedback >= starValue ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          onClick={() => setFeedback(starValue)} // Set the feedback value when star is clicked
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 17.75l-5.532 3.536 1.056-6.171-4.49-4.381 6.168-.897 2.8-5.676 2.8 5.676 6.168.897-4.49 4.381 1.056 6.171L12 17.75z"
                          />
                        </svg>
                      );
                    })}
                  </div>
                </div>


                <div className="mt-4 flex justify-center">
                  
                  <button
                    onClick={closeScoringModal}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-8"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmitReview}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Submit 
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Agenda;
