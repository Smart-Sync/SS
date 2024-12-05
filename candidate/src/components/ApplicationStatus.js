import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext';
import { useApplications } from '../ApplicationContext';

const ApplicationStatus = () => {
    const {applications, loading, error} = useApplications();
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    
    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Applications</h2>
            {applications.length === 0 ? (
                <p className="text-gray-500">You have not applied for any jobs yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-300 text-gray-800 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-center">Job Title</th>
                                <th className="py-3 px-6 text-center">Last Date</th>
                                <th className="py-3 px-6 text-center">Applied On</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {applications.map((app) => (
                                <tr key={app._id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-center">{app.jobId?.advt}</td>
                                    <td className="py-3 px-6 text-center">{new Date(app.jobId?.lastDate).toLocaleDateString()}</td>
                                    <td className="py-3 px-6 text-center">{new Date(app.appliedAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}
        </div>
    );
};

export default ApplicationStatus;
