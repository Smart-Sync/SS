
import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { indigo } from '@mui/material/colors';
import Button from '@mui/material/Button';

const expertsData = [
  {
    expert: 'John Doe',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    candidates: [
      { name: 'Candidate 1', relevance: 85 },
      { name: 'Candidate 2', relevance: 92 },
      { name: 'Candidate 3', relevance: 78 },
      { name: 'Candidate 4', relevance: 88 },
      { name: 'Candidate 5', relevance: 95 },
    ],
  },
  {
    expert: 'Jane Smith',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',

    candidates: [
      { name: 'Candidate A', relevance: 81 },
      { name: 'Candidate B', relevance: 90 },
      { name: 'Candidate C', relevance: 76 },
      { name: 'Candidate D', relevance: 89 },
      { name: 'Candidate E', relevance: 93 },
    ],
  },

  {
    expert: 'Jane Smith',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',

    candidates: [
      { name: 'Candidate A', relevance: 81 },
      { name: 'Candidate B', relevance: 90 },
      { name: 'Candidate C', relevance: 76 },
      { name: 'Candidate D', relevance: 89 },
      { name: 'Candidate E', relevance: 93 },
    ],
  },

  {
    expert: 'Jane Smith',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',

    candidates: [
      { name: 'Candidate A', relevance: 81 },
      { name: 'Candidate B', relevance: 90 },
      { name: 'Candidate C', relevance: 76 },
      { name: 'Candidate D', relevance: 89 },
      { name: 'Candidate E', relevance: 93 },
    ],
  },

  {
    expert: 'Jane Smith',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',

    candidates: [
      { name: 'Candidate A', relevance: 81 },
      { name: 'Candidate B', relevance: 90 },
      { name: 'Candidate C', relevance: 76 },
      { name: 'Candidate D', relevance: 89 },
      { name: 'Candidate E', relevance: 93 },
    ],
  },
];

export const MappingResult = () =>{
  const [status, setStatus] = useState('initial');

  const notifyExpert = async () => {
    try {
      setStatus('pending'); 
      // Simulate backend request to send notification
      const response = await fetch('/api/notify-expert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      // Simulate response from the backend (can be 'approved' or 'rejected')
      if (result.status === 'approved') {
        setStatus('approved');
      } else if (result.status === 'rejected') {
        setStatus('rejected');
      }

    } catch (error) {
      console.error('Error notifying expert:', error);
    }
  };

  const getButtonProperties = () => {
    switch (status) {
      case 'pending':
        return {
          text: 'Approval Awaited',
          color: 'bg-gray-500',
          disabled: true,
        };
      case 'approved':
        return {
          text: 'Approved',
          color: 'bg-green-500',
          disabled: true,
        };
      case 'rejected':
        return {
          text: 'Rejected',
          color: 'bg-red-500',
          disabled: true,
        };
      default:
        return {
          text: 'Notify',
          color: 'bg-blue-500',
          disabled: false,
        };
    }
  };

  const { text, color, disabled } = getButtonProperties();

  return (
    <Card className='flex flex-row  border rounded-lg shadow-md '>
      <CardContent className='flex-1 flex items-center justify-center'>
        <div >
          <Avatar  className="mb-2 w-12 h-12" sx={{ bgcolor: indigo[500]}}>N</Avatar>
          <span className='flex-1 font-semibold '>Expert Name</span>
        </div>
      </CardContent>
    
      <div className='flex-1 h-[200px] overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
        <CardContent className='flex-1'>
          <ul>
            <li className='border-b pb-2 flex justify-between'>
              <span>Candidate 1</span>
              <span className='text-gray-500'>85%</span> 
            </li>
            <li className='border-b pb-2 flex justify-between'>
              <span>Candidate 2</span>
              <span className='text-gray-500'>92%</span>
            </li>
            <li className='border-b pb-2 flex justify-between'>
              <span>Candidate 3</span>
              <span className='text-gray-500'>78%</span>
            </li>
            <li className='border-b pb-2 flex justify-between'>
              <span>Candidate 4</span>
              <span className='text-gray-500'>88%</span>
            </li>
            <li className='border-b pb-2 flex justify-between'>
              <span>Candidate 5</span>
              <span className='text-gray-500'>95%</span>
            </li>
          </ul>
        </CardContent>
      </div>


      <CardContent className='flex-1 '>
        <div className='flex flex-col items-center ' >
          <span className="mt-3">Date: 1st October 2024</span>
          <span className="font-light mt-1 mb-3">Time: 12:00 pm onwards</span>
          <Button
            variant="contained"
            className={`text-sm mt-3 w-[150px] ${color}`}
            onClick={status === 'initial' ? notifyExpert : undefined}
            disabled={disabled}
          >
            {text}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};















































// import React from 'react'
// const people = [
//     {
//       name: 'Leslie Alexander',
//       email: 'leslie.alexander@example.com',
//       role: 'Relevency Score : 10',
//       imageUrl:
//         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       lastSeen: '3h ago',
//       lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//       name: 'Michael Foster',
//       email: 'michael.foster@example.com',
//       role: 'Relevency Score : 10',
//       imageUrl:
//         'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       lastSeen: '3h ago',
//       lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//       name: 'Dries Vincent',
//       email: 'dries.vincent@example.com',
//       role: 'Relevency Score : 9',
//       imageUrl:
//         'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       lastSeen: null,
//     },
//     {
//       name: 'Lindsay Walton',
//       email: 'lindsay.walton@example.com',
//       role: 'Relevency Score : 7',
//       imageUrl:
//         'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       lastSeen: '3h ago',
//       lastSeenDateTime: '2023-01-23T13:23Z',
//     },
    
//   ]

// export const Experts = () => {
//   return (
//     <div  className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        
//     <ul role="list" className="divide-y divide-gray-100">
//     {people.map((person) => (
//       <li key={person.email} className="flex justify-between gap-x-6 py-5">
//         <div className="flex min-w-0 gap-x-4">
//           <img alt="" src={person.imageUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
//           <div className="min-w-0 flex-auto">
//             <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
//             <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
//           </div>
//         </div>
//         <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
//           <p className="text-sm leading-6 text-gray-900">{person.role}</p>
//           {person.lastSeen ? (
//             <p className="mt-1 text-xs leading-5 text-gray-500">
//               Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
//             </p>
//           ) : (
//             <div className="mt-1 flex items-center gap-x-1.5">
//               <div className="flex-none rounded-full bg-emerald-500/20 p-1">
//                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
//               </div>
//               <p className="text-xs leading-5 text-gray-500">Online</p>
//             </div>
//           )}

//         </div>
//         <button
//           type="submit"
//           className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//         >
//           Select Expert
//         </button>
//       </li>
//     ))}
//   </ul>
//   </div>
//   )
// }

