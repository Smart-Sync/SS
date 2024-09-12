// ExpertProfile.jsx
import React from "react";
import { Link } from "react-router-dom";
const ExpertProfile = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-4 max-w-md mx-auto">
      {/* Profile Picture */}
      <div className="flex justify-center">
        <img
          className="h-20 w-20 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Expert Avatar"
        />
      </div>

      {/* Expert Info */}
      <div className="text-center">
        <h2 className="text-xl font-bold">Neelesh Chaudhary</h2>
        <p className="text-sm text-gray-500">UI / UX Designer</p>

        {/* Social Media Links */}
        <div className="flex justify-center mt-3 space-x-4">
          <a href="#" className="text-blue-600">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-blue-600">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-gray-700">
            <i className="fab fa-behance"></i>
          </a>
        </div>
      </div>

      {/* Expertise Chart */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-md font-semibold">Expertise</h3>
        <div className="mt-2">
          <p>UI Design: 35%</p>
          <p>UX Research: 35%</p>
          <p>Design Interaction: 15%</p>
          <p>Wireframing: 15%</p>
        </div>
      </div>

      {/* Task List */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-md font-semibold">Task To Do</h3>
        <ul className="mt-2">
          <li className="flex justify-between">
            <span>Wireframing</span>
            <input type="checkbox" checked className="form-checkbox" />
          </li>
          <li className="flex justify-between mt-2">
            <span>Design Interaction</span>
            <input type="checkbox" className="form-checkbox" />
          </li>
          <li className="flex justify-between mt-2">
            <span>Wireframe Update</span>
            <input type="checkbox" className="form-checkbox" />
          </li>
        </ul>
      </div>

      {/* Calendar */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-md font-semibold">Calendar</h3>
        <div className="mt-2">Jan 2020</div>
        {/* Placeholder calendar */}
        <div className="grid grid-cols-7 gap-1 mt-2 text-center text-gray-600">
          <span>S</span> <span>M</span> <span>T</span> <span>W</span>{" "}
          <span>T</span> <span>F</span> <span>S</span>
          {/* Example days */}
          <span className="text-gray-400">29</span>
          <span className="text-gray-400">30</span>
          <span className="text-blue-600">1</span>
          {/* More days as needed */}
        </div>
      </div>

      {/* Time and Weather */}
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
        <div>
          <h3 className="text-md font-semibold">06:20 AM</h3>
          <p className="text-sm text-gray-500">New Delhi, 18°C</p>
        </div>
      </div>
      <div>
        <Link to="/expert/homepage">
          <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ExpertProfile;
