import React, { useState, useEffect } from 'react'
import { Card } from './Card'

export const Admin = () => {


  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // Fetch all boards from the backend
    const fetchBoards = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/boards'); // Adjust API endpoint
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


  return (
    <div className="bg-white py-4 sm:py-32 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Interview faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything to make your interview process automated
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            DRDO candidate selection Smart Sync Application for admin to manage Candidates and Experts interview using AI and Blockchain.
          </p>
        </div>


      </div>
      {/* <div className=" flex flex-row gap-3 mt-12">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div> */}

      <div className="board-list grid grid-cols-4 gap-4">
        {boards.length > 0 ? (
          boards.map((board) => (
            <Card key={board._id} board={board} /> // Pass each board as a prop
          ))
        ) : (
          <div>No boards available</div>
        )}
      </div>
    </div>

  )
}
