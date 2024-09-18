// import React, { useState } from 'react';
// import { useLocation ,Link} from 'react-router-dom';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Avatar from '@mui/material/Avatar';
// import { indigo } from '@mui/material/colors';
// import Button from '@mui/material/Button';

// export const MappingResult = () => {
//   const [status, setStatus] = useState('initial');
//   let {state}=useLocation()
//   const score=state.score
 
//   console.log(score)

//   const notifyExpert = async (name, email) => {
//     try {
//       console.log(name, email)
//       setStatus('pending');
//       const response = await fetch('http://localhost:5000/send-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           expertName: name,  // Include expert name
//           recipientEmail:email, // Include expert email
//         }),
//       });

//       const result = await response.json();
//       if (result.status === 'approved') {
//         setStatus('approved');
//       } else if (result.status === 'rejected') {
//         setStatus('rejected');
//       }
//     } catch (error) {
//       console.error('Error notifying expert:', error);
//     }
//   };

//   const getButtonProperties = () => {
//     switch (status) {
//       case 'pending':
//         return { text: 'Approval Awaited', color: 'bg-gray-500', disabled: true };
//       case 'approved':
//         return { text: 'Approved', color: 'bg-green-500', disabled: true };
//       case 'rejected':
//         return { text: 'Rejected', color: 'bg-red-500', disabled: true };
//       default:
//         return { text: 'Notify', color: 'bg-blue-500', disabled: false };
//     }
//   };

//   const { text, color, disabled } = getButtonProperties();

//   return (
//     Object.keys(score).length > 0 && (
//       <div className="grid-container">
//         {Object.entries(score).map(([expert,{candidates, email}], index) => (
//           <div key={index} className="expert-card">
//             <Card className="flex flex-row border rounded-lg shadow-md mb-3">
//               <CardContent className="flex-1 flex items-center justify-center">
//                 <div>
//                   <Avatar className="mb-2 w-12 h-12" sx={{ bgcolor: indigo[500] }}>
//                     N
//                   </Avatar>
//                   <span className="flex-1 font-semibold">{expert}</span>
//                 </div>
//               </CardContent>

//               <div className="candidate-grid">
//                 <div className="flex-1 h-[200px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
//                   {candidates.map((item, idx) => (
//                     <CardContent key={idx} className="flex-1">
//                       <ul>
//                         <li className="border-b pb-2 flex justify-between">
//                           <span>{item.Candidate}</span>
//                           <span className="text-gray-500">{item['Relevancy Score'].toFixed(5)}</span>
//                         </li>
//                       </ul>
//                     </CardContent>
//                   ))}
//                 </div>
//               </div>

//               <CardContent className="flex-1">
//                 <div className="flex flex-col items-center">
//                   <span className="mt-3">Date: 1st October 2024</span>
//                   <span className="font-light mt-1 mb-3">Time: 12:00 pm onwards</span>
//                   <Button
//                     variant="contained"
//                     className={`text-sm mt-3 w-[150px] ${color}`}
//                     onClick={status === 'initial' ? () => notifyExpert(expert, email) : undefined}
//                     disabled={disabled}
//                   >
//                     {text}
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         ))}
//       </div>
//     )
//   );
// };


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the board ID from the URL
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { indigo } from '@mui/material/colors';
import Button from '@mui/material/Button';

export const MappingResult = ({id}) => {
   // Get board ID from URL
  const [status, setStatus] = useState('initial');
  const [boardDetails, setBoardDetails] = useState(null); // To store fetched data
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle error state

  // Fetch board details on component mount
  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        console.log("-------")
        console.log(id)
        const response = await fetch(`http://localhost:5000/api/board-details/${id}`);
        const data = await response.json();

        if (response.ok) {
          setBoardDetails(data); // Set the board details in state
          setLoading(false);
        } else {
          setError(data.message || 'Failed to fetch board details');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching board details:', err);
        setError('Error fetching board details');
        setLoading(false);
      }
    };

    fetchBoardDetails();
  }, [id]);

  const notifyExpert = async (name, email, token) => {
    try {
      setStatus('pending');
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expertName: name,
          recipientEmail: email,
          token:token,
        }),
      });

      const result = await response.json();
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
        return { text: 'Approval Awaited', color: 'bg-gray-500', disabled: true };
      case 'approved':
        return { text: 'Approved', color: 'bg-green-500', disabled: true };
      case 'rejected':
        return { text: 'Rejected', color: 'bg-red-500', disabled: true };
      default:
        return { text: 'Notify', color: 'bg-blue-500', disabled: false };
    }
  };

  const { text, color, disabled } = getButtonProperties();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    boardDetails && (
      <div className="grid-container">
        {boardDetails.experts.map((expert, index) => (
          <div key={index} className="expert-card">
            <Card className="flex flex-row border rounded-lg shadow-md mb-3">
              <CardContent className="flex-1 flex items-center justify-center">
                <div>
                  <Avatar className="mb-2 w-12 h-12" sx={{ bgcolor: indigo[500] }}>
                    {expert.name.charAt(0)}
                  </Avatar>
                  <span className="flex-1 font-semibold">{expert.name}</span>
                </div>
              </CardContent>

              <div className="candidate-grid">
                <div className="flex-1 h-[200px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                  {expert.candidates.map((item, idx) => (
                    <CardContent key={idx} className="flex-1">
                      <ul>
                        <li className="border-b pb-2 flex justify-between">
                          <span>{item.Candidate}</span>
                          <span className="text-gray-500">{item['RelevancyScore'].toFixed(5)}</span>
                        </li>
                      </ul>
                    </CardContent>
                  ))}
                </div>
              </div>

              <CardContent className="flex-1">
                <div className="flex flex-col items-center">
                  <span className="mt-3">Date: 1st October 2024</span>
                  <span className="font-light mt-1 mb-3">Time: 12:00 pm onwards</span>
                  <Button
                     variant="contained"
                     className={`text-sm mt-3 w-[150px] ${color}`}
                     onClick={status === 'initial' ? () => notifyExpert(expert.name, expert.email, expert.token) : undefined}
                     disabled={disabled}
                   >
                    {text}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    )
  );
};
