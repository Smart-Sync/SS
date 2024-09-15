import React from 'react';
import imge from '../asset/sih.png';
import Carousel from './Carousel.jsx';
import Agenda from './Agenda.js';
export const ExpertDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile Picture and Name */}
        <div className="bg-white shadow-md p-0 rounded-lg flex flex-col items-center justify-center h-58">
          <img
            src={imge}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h2 className="text-lg font-semibold">Dr. Kamala Sharma </h2>
        </div>

        {/* Board Section (Accept/Reject Buttons) */}
        <div className="col-span-2 h-auto">
         <Carousel className="h-full" />
        </div>

        {/* Upcoming Interviews Section */}
        
      </div>
      <div className="bg-white shadow-md p-6 rounded-lg mt-6 lg:mt-6">
  <h3 className="text-xl font-semibold mb-4">Upcoming Interviews</h3>
     <Agenda/>
  {/* Make this part scrollable */}
  {/* <ul className="max-h-32 overflow-y-auto">
  <li className="border-b py-2">
    Interview 1 - <span className="ml-10">Date & Time</span>
  </li>
  <li className="border-b py-2">
    Interview 2 - <span className="ml-4">Date & Time</span>
  </li>
  <li className="border-b py-2">
    Interview 3 - <span className="ml-4">Date & Time</span>
  </li>
  <li className="border-b py-2">
    Interview 4 - <span className="ml-4">Date & Time</span>
  </li>
  <li className="border-b py-2">
    Interview 5 - <span className="ml-4">Date & Time</span>
  </li>
  <li className="border-b py-2">
    Interview 6 - <span className="ml-4">Date & Time</span>
  </li>
</ul> */}

</div>

      {/* Stats and Feedbacks Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Stats */}
        <div className="bg-white shadow-md p-6 rounded-lg">
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
        <div className="bg-white shadow-md p-6 rounded-lg">
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
