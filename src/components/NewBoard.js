import React from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import {Link} from "react-router-dom"
export const NewBoard = () => {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-12">
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">Upload Requirements for candidate selection </h2>
          

          
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Job Information</h2>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Technical Domain
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Research Areas
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

           
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Educational Qualification
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Bachelor's</option>
                  <option>Master's</option>
                  <option>Phd</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Year's of Experience
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  name="street-address"
                  type="text"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

           
            

          
            {/* <div className="col-span-full">
              <label htmlFor="resume" className="block text-sm font-medium leading-6 text-gray-900">
                Upload Resume
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  // onChange={handleResumeChange}
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 cursor-pointer focus:outline-none"
                />
              </div>
          </div> */}
          <div className="col-span-full">
              <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
                Start Date to schedule interview
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  // value={formData.startDate}
                  // onChange={handleInputChange}
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
               Last Date to schedule interview
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  // value={formData.endDate}
                  // onChange={handleInputChange}
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
        </div>

       
        
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link to = "/"><button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button></Link>
        <Link to = "/"><button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button></Link>
      </div>
      </div>
    </form>
    </div>
  )
}
