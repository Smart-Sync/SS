import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApplicationStatus = ({ candidateId }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/applications/candidate/${candidateId}`);
                setApplications(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch application status');
                setLoading(false);
            }
        };

        fetchApplications();
    }, [candidateId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Your Applications</h2>
            {applications.length === 0 ? (
                <p>You have not applied for any jobs yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Applied On</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app._id}>
                                <td>{app.jobId.title}</td>
                                <td>{app.jobId.company}</td>
                                <td>{app.status}</td>
                                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(app.updatedAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ApplicationStatus;
