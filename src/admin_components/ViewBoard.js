import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Navbar } from './Navbar';

export const ViewBoard = () => {
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

  const sortedBoards = sortOrder === 'none'
    ? boards
    : [...boards].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
      });

  const filteredBoards = filterDate
    ? sortedBoards.filter(board => {
        const boardDate = new Date(board.date);
        const month = String(boardDate.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
        const year = boardDate.getFullYear();
        const formattedDate = `${month}-${year}`;
        return formattedDate === filterDate;
      })
    : sortedBoards;

  return (
    <div className="bg-white ">
        <Navbar/>
        <div className='mx-4'>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
  <div className="mx-auto max-w-7xl lg:text-center">
    <h1 className="text-4xl font-bold text-indigo-600">Job Boards</h1>
  </div>
</div>

      <div className="flex mb-8 gap-4">
        <div>
          <label htmlFor="sortOrder" className="mr-3 ml-4 font-bold text-gray-700">Sort by Date: </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-3 rounded  border-gray-300"
          >
            <option value="none">None</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={['month', 'year']}
            label="Filter by Month and Year"
            onChange={(newValue) => {
              if (newValue) {
                const formattedDate = `${newValue.format('MM')}-${newValue.format('YYYY')}`;
                setFilterDate(formattedDate);
              } else {
                setFilterDate('');
              }
            }}
            className="rounded border border-gray-300"
          />
        </LocalizationProvider>
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
    </div>
  );
};