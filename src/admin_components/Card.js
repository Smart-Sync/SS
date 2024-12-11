import React from 'react';
import { Link } from 'react-router-dom';

// export const Card = ({ board }) => {
//   const { requirement, date, _id } = board;
//   const newD = new Date(date);
//   const formatted = newD.toLocaleDateString('en-GB');

//   return (
//     <div className="bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col text-center">
//       {/* Header */}
//       <div className="text-gray-800 text-lg font-medium mb-2">
//         <strong>Requirement:</strong> {requirement}
//       </div>

//       {/* Date of Interview */}
//       <div className="text-sm text-gray-600 mb-4">
//         <h5 className="font-bold">Date of Interview</h5>
//         <p>{formatted}</p>
//       </div>

//       {/* Action Button */}
//       <div className="mt-auto">
//         <Link to={`/admin/schedule-boards/${_id}`}>
//           <button
//             type="submit"
//             className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             View Board
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };
export const Card = ({ board }) => {
  const { requirement, date, _id } = board;
  const newD = new Date(date);
  const formatted = newD.toLocaleDateString('en-GB');

  return (
    <div className="border rounded-lg p-4 flex flex-col items-center text-center shadow-md space-y-4">
      {/* Title */}
      <h2 className="font-bold text-lg">{requirement}</h2>

      {/* Date */}
      
      <p className="text-sm font-bold text-gray-800">
  Interview On- <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
    {formatted}
  </span>
</p>

      
      {/* Button */}
      <Link to={`/admin/schedule-boards/${_id}`} >
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
          View Board
        </button>
      </Link>
    </div>
  );
};

