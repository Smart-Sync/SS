
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the board ID from the URL
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { indigo } from '@mui/material/colors';
import Button from '@mui/material/Button';

export const MappingResult = ({ id }) => {
  const [status, setStatus] = useState({});
  const [boardDetails, setBoardDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  var formatted;
  // Fetch board details on component mount
  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/board-details/${id}`);
        const data = await response.json();

        if (response.ok) {
          setBoardDetails(data);

          const initialStatus = {};
          data.experts.forEach(expert => {
            initialStatus[expert.name] = 'Notify';
          });
          setStatus(initialStatus); // Set the initial status in the state

          setLoading(false);
        } else {
          setError(data.message || "Failed to fetch board details");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching board details:", err);
        setError("Error fetching board details");
        setLoading(false);
      }
    };

    fetchBoardDetails();
  }, [id]);

  // Function to notify expert (upon button click)
  const notifyExpert = async (name, email, token) => {
    try {
      console.log("Entered ")
      // Only change status when notify button is clicked
      setStatus(prevStatus => ({
        ...prevStatus,
        [name]: 'pending', // Set this expert's status to pending after clicking Notify
      }));

      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expertName: name,
          recipientEmail: email,
          token: token,
          token: token,
        }),
      });

      const result = await response.json();

      // Status will remain 'pending' until the response comes from the expert (via polling)
    } catch (error) {
      console.error("Error notifying expert:", error);
    }
  };

  // Polling for updates, only update status if the expert responded
  const pollForUpdates = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/board-details/${boardDetails._id}`
      );
      const updatedDetails = await response.json();

      // Only update the status if the expert responded (pending -> accepted/rejected)
      const updatedStatus = {};

      updatedDetails.experts.forEach(expert => {
        if (expert.acceptanceStatus === 'accepted') {
          updatedStatus[expert.name] = 'approved';
        } else if (expert.acceptanceStatus === 'rejected') {
          updatedStatus[expert.name] = 'rejected';
        }
      });

      setStatus(prevStatus => ({
        ...prevStatus,
        ...updatedStatus, // Merge with the previous state, so it only changes when the expert responds
      }));
    } catch (error) {
      console.error("Error polling for updates:", error);
    }
  };

  // Start polling every 30 seconds
  useEffect(() => {
    if (boardDetails) {
      const interval = setInterval(pollForUpdates, 30000); // Poll every 30 seconds
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [boardDetails]);

  const getButtonProperties = (name) => {
    const expertStatus = status[name] || 'Notify';
    switch (expertStatus) {
      case 'pending':
        return { text: 'Approval Awaited', color: '#9CA3AF', disabled: true };
      case 'approved':
        return { text: 'Approved', color: '#10B981', disabled: true };
      case 'rejected':
        return { text: 'Rejected', color: '#EF4444', disabled: true };
      default:
        return { text: 'Notify', color: '#3B82F6', disabled: false }; // Default for 'notified'
    }
  };



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    boardDetails && (
      <div className="grid-container">
        {boardDetails.experts.map((expert, index) => (
          <div key={index} className="expert-card">
            <Card className="flex flex-row border rounded-lg shadow-md mb-3">
              <CardContent className="flex-1 flex items-center justify-center">
                <div>
                  <Avatar
                    className="mb-2 w-12 h-12"
                    sx={{ bgcolor: indigo[500] }}
                  >
                    {expert.name.charAt(0)}
                  </Avatar>
                  <span className="flex-1 font-semibold">{expert.name}</span>
                </div>
              </CardContent>

              <div className="candidate-grid">
                <div
                  className="flex-1 h-[200px] overflow-y-auto"
                  style={{ scrollbarWidth: "none" }}
                >
                  {expert.candidates.map((item, idx) => (
                    <CardContent key={idx} className="flex-1">
                      <ul>
                        <li className="border-b pb-2 flex justify-between">
                          <span>{item.Candidate}</span>
                          <span className="text-gray-500">
                            {item["RelevancyScore"].toFixed(5)}
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  ))}
                </div>
              </div>

              <CardContent className="flex-1">
                <div className="flex flex-col items-center">
                  <span className="mt-3">Date: {new Date(boardDetails.date).toLocaleDateString('en-GB')}</span>
                  <span className="font-light mt-1 mb-3">Time: 12:00 pm onwards</span>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: getButtonProperties(expert.name).color }}
                    className={`text-sm mt-3 w-[150px]`}
                    onClick={
                      status[expert.name] === 'Notify'
                        ? () => notifyExpert(expert.name, expert.email, expert.token)
                        : undefined
                    }
                    disabled={getButtonProperties(expert.name).disabled}
                  >
                  >
                    {getButtonProperties(expert.name).text}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    )
  );
};
