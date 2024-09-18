import React from 'react'
import { Navbar } from '../admin_components/Navbar'
import { MappingResult } from '../admin_components/MappingResult'
import { useParams } from 'react-router-dom';

export const ExpertPage = () => {
  console.log("***")
  const { id } = useParams();
  return (
    <div>
      <Navbar>
        {/* Pass the score as props to MappingResult */}
        <MappingResult id={id}/>
      </Navbar>
    </div>
  );
};