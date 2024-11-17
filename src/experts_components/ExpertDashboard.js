import React, { useState, useEffect } from 'react';
import imge from '../asset/sih.png';
import Carousel from './Carousel.jsx';
import Agenda from './Agenda.js';
import Calendar from 'react-calendar'; // Import calendar
import 'react-calendar/dist/Calendar.css'; // Calendar CSS
import { useParams } from 'react-router-dom';

export const ExpertDashboard = () => {
  const { expertId } = useParams();
  const [expertDetails, setExpertDetails] = useState(null);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [interviewDates, setInterviewDates] = useState([]);

  useEffect(() => {
    const fetchExpertDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/expert/${expertId}`);
        const data = await response.json();
        setExpertDetails(data);

        const interviewsResponse = await fetch(`http://localhost:5000/api/expert/${data.email}/interviews`);
        const interviewsData = await interviewsResponse.json();
        setUpcomingInterviews(interviewsData);

        // Extract interview dates
        const dates = interviewsData.map((interview) => new Date(interview.date));
        setInterviewDates(dates);
      } catch (error) {
        console.error('Error fetching expert details:', error);
      }
    };

    fetchExpertDetails();
  }, [expertId]);

  const updateInterviewStatus = async (token, response) => {
    try {
      // Send the update to the backend
      await fetch(`http://localhost:5000/api/update-response?token=${token}&response=${response}`);
  
      // Update the parent state directly (optional but recommended for better UX)
      setUpcomingInterviews((prev) =>
        prev.map((interview) => {
          const updatedExperts = interview.experts.map((expert) =>
            expert.token === token
              ? { ...expert, acceptanceStatus: response === "accepted" ? "approved" : "rejected" }
              : expert
          );
          return { ...interview, experts: updatedExperts };
        })
      );
  
      
      // await fetchExpertDetails();
    } catch (error) {
      console.error("Error updating interview status:", error);
    }
  };
  
  if (!expertDetails) return <div>Loading...</div>;

  // Check if the current date is an interview date
  const isInterviewDate = (date) => {
    return interviewDates.some(
      (interviewDate) => interviewDate.toDateString() === date.toDateString()
    );
  };

  // Render a superscript for dates with interviews
  const renderInterviewIndicator = ({ date }) => {
    if (isInterviewDate(date)) {
      return <span className="interview-indicator"></span>;
    }
    return null;
  };

  return (
    <div className="container mx-auto p-6">
      {/* Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div style={{ backgroundColor: '#D2E0FB' }} className="bg-blue-300 shadow-md p-0 rounded-lg flex flex-col items-center justify-center h-58">
          <img src={imge} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
          <h2 className="text-lg font-semibold">{expertDetails.name}</h2>
        </div>

        <div className="col-span-2 h-auto">
          <Carousel className="h-full"  expertDetail={expertDetails} onUpdateInterviewStatus={updateInterviewStatus}/>
        </div>
      </div>

      {/* Upcoming Interviews & Calendar Section */}
      <div className="w-full mt-6 flex gap-6">
        {/* Agenda Column */}
        <div className="w-2/3">
          <h3 className="text-xl font-bold mx-8">MY RECORDS</h3>
          <Agenda expertDetail={expertDetails} />
        </div>

        {/* Second Column with Calendar and Stats */}
        <div className="w-1/3 flex flex-col gap-6 my-16">
          {/* Calendar Row */}
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className='text-center text-2xl font-bold mb-4'>Calendar</h2>
            <Calendar
              tileClassName={({ date }) => (isInterviewDate(date) ? 'highlight' : null)} // Apply highlight class if it's an interview date
              tileContent={renderInterviewIndicator} // Render the superscript for interview dates
              react-calendar rounded-lg border-2 border-gray-300
            />
          </div>

          {/* Stats Row */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl text-center font-bold mb-4">Statistics</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span>Total Invitations</span>
                <span className="text-red-500">21</span>
              </li>
              <li className="flex justify-between">
                <span>Active Interview Invitations</span>
                <span className="text-red-500">1</span>
              </li>
              <li className="flex justify-between">
                <span>Past Interviews</span>
                <span className="text-red-500">20</span>
              </li>
              <li className="flex justify-between">
                <span>Interview Invitations</span>
                <span className="text-red-500">20</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ExpertDashboard;
