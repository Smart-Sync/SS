import React from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

export const ApplyFinal = ({ formData, onPrevious }) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { personalInfo, documents } = formData;
    console.log(formData)
    // Helper function to render a file or fallback message
    const renderFileLink = (file) => {
        if (!file) return <span className="text-red-500">No file uploaded</span>;
        if (typeof file === "string") {
            // If it's a base64 string or a URL
            const fileName = file.split('/').pop() || "File";
            return (
                <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    View {fileName}
                </a>
            );
        } else if (file instanceof File) {
            // Create a temporary URL for the file
            const fileURL = URL.createObjectURL(file);
            return (
                <a
                    href={fileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    View {file.name}
                </a>
            );
        }
        return <span className="text-red-500">Invalid file format</span>;
    };

    const handleSubmit = async () => {
        try {
            const formDataToSend = new FormData();

            // Append personal info
            Object.keys(personalInfo).forEach((key) => {
                formDataToSend.append(`personalInfo[${key}]`, personalInfo[key] || 'N/A');
            });

            // Append identifiers
            formDataToSend.append('candidateId', user._id); // Assuming user data is available
            formDataToSend.append('jobId', formData.jobId);

            ['scoreCard', 'proofOfDob'].forEach((doc) => {
                if (documents[doc] instanceof File) {
                    formDataToSend.append(doc, documents[doc]);
                }
            });

            if (documents.scoreCard) {
                formDataToSend.append('photo', documents.scoreCard);  // Use scoreCard URL as photo
            }
            
            if (documents.proofOfDob) {
                formDataToSend.append('signature', documents.proofOfDob);  // Use proofOfDob URL as signature
            }
            // Add default or garbage qualifications data
            const defaultQualifications = {
                gateScore: 0, // Default GATE score
                highSchool: 0, // Default High School score
                higherSecondary: 0, // Default Higher Secondary score
                degree: 'N/A', // Default Degree
                skills: JSON.stringify([]), // Empty skills array
                experienceYears: 0, // Default experience years
            };

            Object.keys(defaultQualifications).forEach((key) => {
                formDataToSend.append(`qualifications[${key}]`, defaultQualifications[key]);
            });



            // Submit form data to the backend
            const response = await fetch('http://localhost:5000/api/apply', {
                method: 'POST',
                body: formDataToSend,
            });


            const data = await response.json();
            if (response.ok) {
                console.log('Application uploaded successfully');
                navigate('/application-history');
            } else {
                console.error('Upload failed:', data.message);
            }
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };



    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Preview and Submit</h2>

            {/* Personal Information */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Personal Info</h3>
                <div className="space-y-2">
                    <p><strong>Name:</strong> {user.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                    <p><strong>DOB:</strong> {personalInfo.dob || 'N/A'}</p>
                    <p><strong>Mobile:</strong> {personalInfo.mobile || 'N/A'}</p>
                    <p><strong>Address:</strong> {personalInfo.address || 'N/A'}</p>
                </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Documents</h3>
                <div className="space-y-2">
                    <p><strong>GATE Score Card:</strong> {renderFileLink(documents.scoreCard)}</p>
                    <p><strong>Proof of DOB:</strong> {renderFileLink(documents.proofOfDob)}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between">
                <button
                    onClick={onPrevious}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded"
                >
                    Edit
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};