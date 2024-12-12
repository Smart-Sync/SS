
import { useState, useEffect } from 'react';
import axios from 'axios';
// export const ExpertsProfile = () => {
//   const [people, setPeople] = useState([]);

//   // Fetch experts data from backend
//   useEffect(() => {
//     const fetchExperts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/api/experts'); // Change to your actual API endpoint
//         setPeople(response.data); // Assuming the data is an array of experts
//       } catch (error) {
//         console.error('Error fetching experts:', error);
//       }
//     };

//     fetchExperts();
//   }, []);
  
//   return (
//     <div className=''>
//       <div className='py-0 px-8'>
//         <ul role="list" className="divide-y divide-gray-100">
//           {people.map((person) => (
//             <li key={person.email} className="flex justify-between gap-x-6 py-5">
//               <div className="flex min-w-0 gap-x-4">
//                 {/* Assuming you have a placeholder for images, you can customize this */}
//                 <img
//                   alt=""
//                   src={person.imageUrl || 'https://via.placeholder.com/150'}
//                   className="h-12 w-12 flex-none rounded-full bg-gray-50"
//                 />
//                 <div className="min-w-0 flex-auto">
//                   <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
//                   <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
//                 </div>
//               </div>
//               <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
//                 <p className="text-sm leading-6 text-gray-900">{person.qualifications}</p>
//                 <p className="text-sm leading-6 text-gray-900">{person.skills}</p>
//                 <p className="text-sm leading-6 text-gray-900">{person.years_of_experience} years of experience</p>
//                 {person.date_of_availability ? (
//                   <p className="mt-1 text-xs leading-5 text-gray-500">
//                     Available from <time dateTime={person.date_of_availability}>{new Date(person.date_of_availability).toLocaleDateString()}</time>
//                   </p>
//                 ) : (
//                   <div className="mt-1 flex items-center gap-x-1.5">
//                     <div className="flex-none rounded-full bg-emerald-500/20 p-1">
//                       <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
//                     </div>
//                     <p className="text-xs leading-5 text-gray-500">Online</p>
//                   </div>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }
import React from "react";




//   // Fetch experts data from backend
 
export const ExpertsProfile=({ user })=> {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/experts'); // Change to your actual API endpoint
        setPeople(response.data); // Assuming the data is an array of experts
      } catch (error) {
        console.error('Error fetching experts:', error);
      }
    };

    fetchExperts();
  }, []);
  return (
    <div className="bg-gray-100 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {people.map((person) => (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center">
      <img
        src={`https://avatar.iran.liara.run/username?username=${person.name}`}
        alt={person.name}
        className="w-20 h-20 rounded-full mb-4"
      />
      <h3 className="font-semibold text-lg">{person.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{person.role}</p>
            {/* Add years of experience */}
            <span className=" text-black text-s font-semibold px-2 py-1 rounded">
            {person.qualifications} 
      </span>
            <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded my-2">
            Experience: {person.years_of_experience} years
      </span>
            {/* Add skills */}
            
  <div className="flex flex-wrap gap-2 mt-2">
  Skills:
    {person.skills
      ?.split(",")
      .map((skill, index) => (
        <span
          key={index}
          className="bg-blue-50 text-black text-xs font-semibold px-2 py-1 rounded"
        >
          {skill.trim()}
        </span>
      ))}
  </div>



      <p className="text-sm text-gray-600 mb-2">{person.role}</p>
      
      <div className="flex gap-4 mt-4 w-full justify-center">
  <a
    href={`mailto:${person.email}`}
    className="flex justify-center items-center bg-blue-500 text-white text-sm font-semibold w-1/4 py-2 rounded hover:bg-blue-600 transition-colors startIcon={<EmailIcon />}"
  >
    Email
  </a>
  <button
    className="flex justify-center items-center bg-gray-300 text-black text-sm font-semibold w-1/4 py-2 rounded hover:bg-gray-400 transition-colors"
  >
    Call
  </button>
</div>

    </div>
     ))}
     </div>
   </div>
  );
}

