import React from 'react'
import { Link } from 'react-router-dom'

export const Card = () => {
  return (
    <div class="card text-center">
  <div class="card-header">
    Semiconductors
  </div>
  <div class="card-body">
    <h5 class="card-title">Start Date to schedule interview : 03 - Aug-2025</h5>
    <p class="card-text">Last date to schedule interview: 17- Aug - 2025.</p>
   <Link to = "/admin/schedule-boards"> <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
         Schedule Boards
        </button></Link>
  </div>
  <div class="card-footer text-body-secondary">
    Requirement for board creation uploaded  2 days ago
  </div>
</div>
  )
}
