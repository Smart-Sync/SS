import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
// const people = [
//   {
//     name: 'Leslie Alexander',
//     email: 'leslie.alexander@example.com',
//     role: 'Co-Founder / CEO',
//     imageUrl:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: '3h ago',
//     lastSeenDateTime: '2023-01-23T13:23Z',
//   },
//   {
//     name: 'Michael Foster',
//     email: 'michael.foster@example.com',
//     role: 'Co-Founder / CTO',
//     imageUrl:
//       'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: '3h ago',
//     lastSeenDateTime: '2023-01-23T13:23Z',
//   },
//   {
//     name: 'Dries Vincent',
//     email: 'dries.vincent@example.com',
//     role: 'Business Relations',
//     imageUrl:
//       'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: null,
//   },
//   {
//     name: 'Lindsay Walton',
//     email: 'lindsay.walton@example.com',
//     role: 'Front-end Developer',
//     imageUrl:
//       'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: '3h ago',
//     lastSeenDateTime: '2023-01-23T13:23Z',
//   },
//   {
//     name: 'Courtney Henry',
//     email: 'courtney.henry@example.com',
//     role: 'Designer',
//     imageUrl:
//       'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: '3h ago',
//     lastSeenDateTime: '2023-01-23T13:23Z',
//   },
//   {
//     name: 'Tom Cook',
//     email: 'tom.cook@example.com',
//     role: 'Director of Product',
//     imageUrl:
//       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: null,
//   },
// ]
export const ExpertsProfile = () => {
  const [people, setPeople] = useState([]);

  // Fetch experts data from backend
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/experts'); // Change to your actual API endpoint
        setPeople(response.data); // Assuming the data is an array of experts
      } catch (error) {
        console.error('Error fetching experts:', error);
      }
    };

    fetchExperts();
  }, []);
  return (
    <div className=''>
      <div className='py-0 px-8'>
        <ul role="list" className="divide-y divide-gray-100">
          {people.map((person) => (
            <li key={person.email} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                {/* Assuming you have a placeholder for images, you can customize this */}
                <img
                  alt=""
                  src={person.imageUrl || 'https://via.placeholder.com/150'}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{person.qualifications}</p>
                <p className="text-sm leading-6 text-gray-900">{person.skills}</p>
                <p className="text-sm leading-6 text-gray-900">{person.years_of_experience} years of experience</p>
                {person.date_of_availability ? (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Available from <time dateTime={person.date_of_availability}>{new Date(person.date_of_availability).toLocaleDateString()}</time>
                  </p>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
