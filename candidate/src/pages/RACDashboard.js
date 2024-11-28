import React from 'react';
import { Link } from 'react-router-dom';

const RACDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
     
    <nav className="bg-gray-100 border-b-2 border-gray-300">
      {/* Top Section: Logo and Title */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section with Main Logo and Title */}
        <div className="flex items-center space-x-4">
          <img
            src="/img/drdo.jpeg" // Replace with the actual RAC logo path
            alt="RAC Logo"
            className="h-12"
          />
          <div>
          <img
            src="/img/siteTitle_n.png" // Replace with the actual RAC logo path
            alt="RAC Logo"
            className="h-12"
          />
          </div>
        </div>

        {/* Add Secondary Logo Instead of Text */}
        <div>
          <img
            src="/img/Emblem_of_India.png" // Replace with the secondary logo path (e.g., Government of India)
            alt="Government of India Logo"
            className="h-16" // Adjust height as necessary
          />
        </div>

        {/* Buttons Section */}
        <div className="flex space-x-4">
        <Link
                to="/login"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 "
              >
                Candidate Login
              </Link>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Contact Us
          </button>
          
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-200">
        <div className="flex space-x-4 text-sm font-medium">
          <a href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="#about" className="text-gray-700 hover:text-blue-600">
            About RAC
          </a>
          <a href="#programmes" className="text-gray-700 hover:text-blue-600">
            Programmes
          </a>
          <a href="#careers" className="text-gray-700 hover:text-blue-600">
            Career Opportunity
          </a>
          <a href="#drds" className="text-gray-700 hover:text-blue-600">
            DRDS
          </a>
          <a href="#faqs" className="text-gray-700 hover:text-blue-600">
            FAQs
          </a>
          <a
            href="#caution"
            className="text-yellow-600 font-bold hover:text-yellow-700"
          >
            CAUTION / चेतावनी
          </a>
          <a href="#drdo" className="text-gray-700 hover:text-blue-600">
            DRDO Website
          </a>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-2 border border-gray-400 rounded text-sm"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>
      </div>
    </nav>
      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        {/* Advertisements Section */}
        <section id="advertisements">
          <h2 className="text-xl font-bold text-gray-800">Advertisements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {/* Advertisement 145 */}
            <div className="bg-white shadow-md p-4 rounded">
              <h3 className="text-lg font-semibold text-green-700">
                Advertisement No. 145
              </h3>
              <p className="mt-2 text-gray-700">
                <span className="font-bold">Status:</span> Result Declared.
              </p>
              <div className="mt-4 bg-gray-100 p-3 rounded">
                <h4 className="font-medium">Recommendation Status</h4>
                <p className="text-sm text-gray-600">
                  Last updated on: <span className="text-black">29 Oct, 2024 18:46 hrs</span>
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  Recommendations for Selection for Vacancies in various disciplines including:
                  <span className="text-green-700 font-medium">
                    Mechanical Engg (Item no. 2), Material Science & Engg (Item no. 5), Production & Industrial Engg (Item no. 15)
                  </span>, etc.
                </p>
              </div>
            </div>

            {/* Advertisement 147 */}
            <div className="bg-white shadow-md p-4 rounded">
              <h3 className="text-lg font-semibold text-green-700">
                Advertisement No. 147
              </h3>
              <p className="mt-2 text-gray-700">
                <span className="font-bold">Status:</span> Screening of applications is in process.
              </p>
              <div className="mt-4 bg-gray-100 p-3 rounded">
                <h4 className="font-medium">Administrative Screening Status</h4>
                <p className="text-sm text-gray-600">
                  Last updated on: <span className="text-black">22 Nov, 2024 15:16 hrs</span>
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  The challenge period to raise queries will remain open till{' '}
                  <span className="font-medium text-red-600">01 Dec 2024 (1600 HRS)</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Public Notice Section */}
        <section id="notices" className="bg-blue-100 p-6 rounded shadow-md">
          <h3 className="text-lg font-medium text-blue-700">Public Notice</h3>
          <p className="text-sm text-gray-700 mt-2">
            Requirement of Valid GATE Score for Direct Recruitment of Scientist 'B' in DRDO.
          </p>
          <p className="mt-2 text-gray-600 text-sm">
            Published on: <span className="text-black">10 Sep, 2024</span>
          </p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded text-sm">
            Download Notice (PDF - 161.95 KB)
          </button>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center text-sm text-gray-500">
        <p>
          URL: <a href="https://rac.gov.in" className="text-blue-500 underline">https://rac.gov.in</a>
        </p>
        <p>
          Please be aware that unauthorized websites may mislead users while displaying this content.
        </p>
      </footer>
    </div>
  );
};

export default RACDashboard;
