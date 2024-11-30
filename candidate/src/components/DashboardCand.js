import React, { useState } from "react";

const DashboardCand = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const recruitmentData = [
    { id: 1, advt: "Scientist Recruitment", publishDate: "10-Aug-2023", lastDate: "29-Sep-2023", status: "Closed" },
    { id: 2, advt: "Engineer Recruitment", publishDate: "01-Oct-2023", lastDate: "15-Nov-2023", status: "Open" },
  ];

  const filteredData = recruitmentData.filter((item) =>
    item.advt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-xl font-bold">DRDO</div>
          <div className="flex items-center gap-4">
            <a href="/view-jobs" className="text-gray-600 hover:text-blue-600">Open Vacancies</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Download Formats</a>
            <div className="relative">
              <img
                src="/img/download.jpg"
                alt="User Profile"
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-48 z-10">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <a href="/profile-settings">View Profile</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <a href="/logout">Logout</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <h1 className="text-3xl font-bold">Direct Recruitment</h1>
        <p className="mt-2">Browse and apply for open positions</p>
      </header>

      {/* Recruitment Table */}
      <div className="container mx-auto mt-6 bg-white shadow rounded p-4">
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Sr. No.</th>
              <th className="p-2 border">Job Postings</th>
              <th className="p-2 border">Publish Date</th>
              <th className="p-2 border">Last Date to Apply</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border">{item.advt}</td>
                <td className="p-2 border">{item.publishDate}</td>
                <td className="p-2 border">{item.lastDate}</td>
                <td className="p-2 border">
                  <button className="text-blue-500 hover:underline">View Advertisement</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardCand;
