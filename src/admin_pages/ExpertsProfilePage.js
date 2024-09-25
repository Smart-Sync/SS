import React from 'react'
import { Navbar } from '../admin_components/Navbar'
import { ExpertsProfile } from '../admin_components/ExpertsProfile'
export const ExpertsProfilePage = () => {
  return (
    <div>
      <Navbar>
        <ExpertsProfile></ExpertsProfile>
      </Navbar>
    </div>
  )
}
