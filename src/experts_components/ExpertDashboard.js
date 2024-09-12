import React from 'react'

export const ExpertDashboard = () => {
  return (
    <div> <div class="container mx-auto p-6">
   
    <div class="bg-white shadow rounded-lg p-4 flex justify-between items-center">
        <div class="flex items-center">
            
            <div class="w-16 h-16 rounded-full bg-gray-300 mr-4"></div>
            <div>
                <h2 class="text-xl font-semibold">Expert Dashboard</h2>
                <p class="text-gray-500">Interview Invitations</p>
            </div>
        </div>
        <div>
            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >Notifications</button>
        </div>
    </div>

 
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        
        <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Board Invitation</h3>
            <p class="text-gray-500 mb-4">Date: 2024-09-12 | Time: 90 mins</p>
            <div class="flex justify-between">
                <button class="bg-green-500 text-white py-2 px-4 rounded">Accept</button>
                <button class="bg-red-500 text-white py-2 px-4 rounded">Cancel</button>
            </div>
        </div>

        
        <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Statistics</h3>
            <ul class="space-y-2">
                <li class="flex justify-between">
                    <span>Total Invitations</span>
                    <span class="text-red-500">21</span>
                </li>
                <li class="flex justify-between">
                    <span>Active Interview Invitations</span>
                    <span class="text-red-500">1</span>
                </li>
                <li class="flex justify-between">
                    <span>Past Interviews</span>
                    <span class="text-red-500">20</span>
                </li>
            </ul>
        </div>
    </div>

   
    <div class="bg-white shadow rounded-lg p-6 mt-6">
        <h3 class="text-lg font-semibold mb-4">Availability with in a Week</h3>
        <div class="grid grid-cols-5 gap-4">
            <div>
                <p class="font-semibold">Mon</p>
                <p>2-3 PM</p>
            </div>
            <div>
                <p class="font-semibold">Tue</p>
                <p>2-3 PM</p>
            </div>
            <div>
                <p class="font-semibold">Wed</p>
                <p>2-3 PM</p>
            </div>
            <div>
                <p class="font-semibold">Thu</p>
                <p>2-3 PM</p>
            </div>
            <div>
                <p class="font-semibold">Fri</p>
                <p>2-3 PM</p>
            </div>
        </div>
    </div>

    
    <div class="bg-white shadow rounded-lg p-6 mt-6">
        <h3 class="text-lg font-semibold mb-4">Past Interviews & Feedback</h3>
       
    </div>
</div>
</div>
  )
}


