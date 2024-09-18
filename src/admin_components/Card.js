import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
export const Card = () => {
  const [details, setDetails] = useState([]);

  // Fetch the details from the API when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/details'); // Adjust the endpoint as necessary
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, []);
   return (
   
    <div className="container mt-4">
      <div className="row">
        {details.map((detail) => (
          <div key={detail._id} className="col-md-4 mb-4">
            <div className="card text-center h-100">
              <div className="card-header">
                <p>Date: {new Date(detail.date).toLocaleDateString()}</p>
              </div>
              <div className="card-body">
                <h4>Requirement: {detail.requirement}</h4>

                <div className="experts">
                  <h5>Experts:</h5>
                  {Object.entries(detail.experts).map(([expertName, expertDetails]) => (
                    <div key={expertName} className="expert">
                      <h6>{expertName}</h6>
                      <p>Email: {expertDetails.email}</p>
                      <p  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
 >Acceptance Status: {expertDetails.acceptanceStatus ? 'Accepted' : 'Pending'}</p>

                      {/* <div className="candidates">
                        <h6>Candidates:</h6>
                        {expertDetails.candidates.map((candidate, index) => (
                          <p key={index}>
                            {candidate.Candidate} - Relevancy Score: {candidate.RelevancyScore}
                          </p>
                        ))}
                      </div> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  )
}
//   <div class="card text-center">

  // <div class="card-body">
     {/* {requirements.map((requirement, index) => (
      <div key={index} className="card">
      <div class="card-header">{requirement.technicalDomain}</div>
      <p>Research Areas: {requirement.researchAreas}</p>
      <p>Education: {requirement.educationalQualification}</p>
      <p>Experience: {requirement.yearsOfExperience}</p>
      <p>Start Date: {new Date(requirement.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(requirement.endDate).toLocaleDateString()}</p>
      <Link to = "/admin/schedule-boards"> <button
    type="submit"
    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
   Schedule Boards
  </button></Link>
</div>

    
  ))}  */}
//    </div>
// </div>