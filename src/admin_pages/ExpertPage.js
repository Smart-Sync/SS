import React from 'react'
import { Navbar } from '../admin_components/Navbar'
import { MappingResult } from '../admin_components/MappingResult'
export const ExpertPage = () => {
  console.log("***")
  return (
    <div>
      <Navbar>
        {/* Pass the score as props to MappingResult */}
        <MappingResult />
      </Navbar>
    </div>
  );
};