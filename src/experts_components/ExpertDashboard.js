import React, {useState, useEffect} from 'react';
import imge from '../asset/sih.png';
import Carousel from './Carousel.jsx';
import Agenda from './Agenda.js';
import { useParams } from 'react-router-dom';

export const ExpertDashboard = () => {

  const { expertId } = useParams(); // Fetch expertId from URL
  const [expertDetails, setExpertDetails] = useState(null); // State to store expert's details
  const [feedback, setFeedback] = useState(''); // State to store feedback input
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);

  useEffect(() => {
    // Fetch expert details based on expertId
    const fetchExpertDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/expert/${expertId}`);
        const data = await response.json();
        setExpertDetails(data); // Set expert details


        const interviewsResponse = await fetch(`http://localhost:5000/api/expert/${data.email}/interviews`);
        const interviewsData = await interviewsResponse.json();

       setUpcomingInterviews(interviewsData)
      } catch (error) {
        console.error('Error fetching expert details:', error);
      }
    };

    fetchExpertDetails();
  }, [expertId]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission logic
    console.log('Feedback submitted:', feedback);
    setFeedback(''); // Clear feedback input after submission
  };

  if (!expertDetails) return <div>Loading...</div>;



  return (
    <div className="container mx-auto p-6">
      {/* Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile Picture and Name */}
        <div style={{ backgroundColor: '#D2E0FB' }} className="bg-blue-300 shadow-md p-0 rounded-lg flex flex-col items-center justify-center h-58">
          <img
            src={imge}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h2 className="text-lg font-semibold">{expertDetails.name} </h2>
        </div>

        {/* Board Section (Accept/Reject Buttons) */}
        <div className="col-span-2 h-auto ">
          <Carousel className="h-full" interviews = {upcomingInterviews}/>
        </div>

        {/* Upcoming Interviews Section */}

      </div>
      <div className=" shadow-md p-6 rounded-lg mt-6 lg:mt-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Interviews</h3>
        <Agenda interviews={upcomingInterviews} currentExpert={expertDetails.name}/>
        
      </div>

      {/* Stats and Feedbacks Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Stats */}
        <div style={{ backgroundColor: '#FFF8E8' }} className=" shadow-md p-6 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Statistics</h3>
          <ul class="space-y-3">
            <li class="flex justify-between">
              <span>Total Invitations</span>
              <span class="text-red-500">21</span>
            </li>
            <li class="flex justify-between">
              <span>Active Interview Invitations</span>
              <span class="text-red-500">1</span>
            </li>
            <li class="flex justify-between">
              <span>Past Interviews</span>
              <span class="text-red-500">20</span>
            </li>
            <li class="flex justify-between">
              <span>Interview Invitations</span>
              <span class="text-red-500">20</span>
            </li>
          </ul>
        </div>

        {/* Feedbacks */}
        <div style={{ backgroundColor: '#D1E9F6' }} className=" shadow-md p-6 rounded-lg">
          {/* Form to add new feedback */}
          <h3 className="text-xl font-semibold mb-4">Feedbacks</h3>
          <form className="mt-4">
            <label htmlFor="feedback" className="block text-sm font-medium mb-2">
              Enter your feedback:
            </label>

            {/* Feedback input box */}
            <textarea
              id="feedback"
              rows="4"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Write your feedback here..."
            ></textarea>

            {/* Submit button */}
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpertDashboard;
