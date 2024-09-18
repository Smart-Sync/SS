import React from 'react'
import { Link } from 'react-router-dom'

export const Card = ({board}) => {

  const { requirement, date, _id, experts } = board;
  const newD = new Date(date);
  const formatted = newD.toLocaleDateString('en-GB')
  return (
    <div class="card text-center ">
      <div class="card-header font-bold">
        {requirement}
      </div>
      <div class="card-body">
        <h5 class="card-title font-bold">Date of Interview</h5>
        <p class="card-text">{formatted}</p>
        <Link to={`/admin/schedule-boards/${_id}`}> <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          View Board
        </button></Link>
      </div>
      
    </div>
  )
}
