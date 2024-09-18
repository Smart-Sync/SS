import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';

export const Card = () => {
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/requirements');
        const data = await response.json();
        setRequirements(data);
      } catch (error) {
        console.error('Error fetching requirements:', error);
      }
    };

    fetchRequirements();
  }, []);
   return (
   
    <div class="card text-center">

  <div class="card-body">
     {requirements.map((requirement, index) => (
      <div key={index} className="card">
      <div class="card-header">{requirement.technicalDomain}</div>
      <p>Research Areas: {requirement.researchAreas}</p>
      <p>Education: {requirement.educationalQualification}</p>
      <p>Experience: {requirement.yearsOfExperience}</p>
      <p>Start Date: {new Date(requirement.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(requirement.endDate).toLocaleDateString()}</p>
    </div>
  ))} 
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
