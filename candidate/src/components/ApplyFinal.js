import React from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

export const ApplyFinal = ({ formData, onPrevious }) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { personalInfo, qualification, documents } = formData;
    
    // Helper function to render a file or fallback message
    const renderFileLink = (file) => {
        if (!file) return "No file uploaded";
        if (typeof file === "string") {
            // If it's a base64 string or a URL
            const fileName = file.split('/').pop() || "File";
            return <a href={file} target="_blank" rel="noopener noreferrer">View {fileName}</a>;
        } else if (file instanceof File) {
            // Create a temporary URL for the file
            const fileURL = URL.createObjectURL(file);
            return <a href={fileURL} target="_blank" rel="noopener noreferrer">View {file.name}</a>;
        }
        return "Invalid file format";
    };

    
    const handleSubmit = async () => {
        try {
            const formDataToSend = new FormData();
            // Append form data
            Object.keys(personalInfo).forEach(key => {
                formDataToSend.append(`personalInfo[${key}]`, personalInfo[key]);
            });
        
            Object.keys(qualification).forEach(key => {
                if(Array.isArray(qualification[key])){
                    formDataToSend.append(`qualifications[${key}]`, JSON.stringify(qualification[key]));
                }else{
                    formDataToSend.append(`qualifications[${key}]`, qualification[key]);
                }
            });
            
            formDataToSend.append('candidateId', user._id);  // Assuming user data is available
            formDataToSend.append('jobId', formData.jobId);

            // Append files
            formDataToSend.append('scoreCard', documents.scoreCard);  // Assuming these are the files
            formDataToSend.append('proofOfDob', documents.proofOfDob);
            formDataToSend.append('photo', documents.photo);
            formDataToSend.append('signature', documents.signature);

            
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

    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Preview and Submit</h2>

            {/* Personal Information */}
            <div>
                <h3 className="font-semibold">Personal Info</h3>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>DOB:</strong> {personalInfo.dob}</p>
                <p><strong>Mobile:</strong> {personalInfo.mobile}</p>
                <p><strong>Address:</strong> {personalInfo.address}</p>
            </div>

            {/* Qualifications and Experience */}
            <div className="mt-4">
                <h3 className="font-semibold">Qualifications</h3>
                <p><strong>GATE Score:</strong> {qualification.gateScore}</p>
                <p><strong>High School (10th) Score:</strong> {qualification.highSchool}</p>
                <p><strong>Higher Secondary (12th) Score:</strong> {qualification.higherSecondary}</p>
                <p><strong>Degree:</strong> {qualification.degree}</p>
                <p><strong>Skills:</strong> {(qualification.skills || []).join(', ')}</p>
                <p><strong>Experience:</strong> {qualification.experienceYears} years</p>
            </div>

            {/* Documents Section */}
            <div className="mt-4">
                <h3 className="font-semibold">Documents</h3>
                <p><strong>Gate Score Card:</strong> {renderFileLink(documents.scoreCard)}</p>
                <p><strong>Proof of DOB:</strong> {renderFileLink(documents.proofOfDob)}</p>
                <p><strong>Photo:</strong> {renderFileLink(documents.photo)}</p>
                <p><strong>Sign:</strong> {renderFileLink(documents.signature)}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6">
                <button onClick={onPrevious} className="bg-gray-400 text-white p-2 rounded mr-2">
                    Edit
                </button>
                <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">
                    Submit
                </button>
            </div>
        </div>
    );
};
