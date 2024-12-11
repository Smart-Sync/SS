import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const Admin = () => {
  const [boards, setBoards] = useState([]);
  const [sortOrder, setSortOrder] = useState('none');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    // Fetch all boards from the backend
    const fetchBoards = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/boards'); // Adjust API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch boards');
        }
        const data = await response.json();
        console.log(data);
        setBoards(data); // Set the fetched boards
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchBoards();
  }, []);

  // Get the current month and year
  const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
  const currentYear = new Date().getFullYear(); // Get current year (e.g., 2024)

  const sortedBoards = sortOrder === 'none'
    ? boards
    : [...boards].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
      });

  // Filter boards to show only those from the current month
  const filteredBoards = sortedBoards.filter(board => {
    const boardDate = new Date(board.date);
    const boardMonth = boardDate.getMonth() + 1; // Get board month (1-12)
    const boardYear = boardDate.getFullYear(); // Get board year

    return boardMonth === currentMonth && boardYear === currentYear;
  });

  return (
    <div className="bg-white py-4 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
  <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
    {/* Left Side: Text Content */}
    <div className="max-w-2xl">
      <h2 className="text-base font-semibold leading-7 text-indigo-600">Interview faster</h2>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Everything to make your interview process automated
      </p>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        DRDO candidate selection Smart Sync Application for admin to manage Candidates and Experts interview using AI and Blockchain.
      </p>
    </div>
    
    {/* Right Side: Image */}
    <div className="flex justify-center">
      <img 
        src="https://media.istockphoto.com/id/1169397243/vector/human-resources-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=IwFeMVZa7OVr65_NsHu2zhhOOWYLJj3BuTI1hdVtb7w=" 
        alt="Interview Process Illustration" 
        className="w-96 h-96 rounded-full mx-auto"
      />
    </div>
  </div>
</div>


<div className="relative mb-8">
        
        <div className="relative flex justify-center">
          <h2 className="bg-white px-4 text-xl font-bold text-gray-800">
            Latest Boards
          </h2>
        </div>
      </div>



      <div className="board-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBoards.length > 0 ? (
          filteredBoards.map((board) => (
            <Card key={board._id} board={board} /> // Pass each board as a prop
          ))
        ) : (
          <div>No boards available</div>
        )}
      </div>
    </div>
  );
};
