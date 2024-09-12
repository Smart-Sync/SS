import React from 'react'
import { Card } from './Card'

export const Admin = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">Interview faster</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everyhting to make your interview process automated
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          DRDO candidate selection Smart Sync Application for admin to manage Candidates and Experts interview using AI and Blockchain.
        </p>
      </div>
      
      
    </div>
    <div className=" flex flex-row gap-3 mt-12">
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      </div>
  </div>

  )
}
