import React from 'react';

export const ApplyFinal = ({ formData, onPrevious, onSubmit }) => {
    const { personalInfo, qualification, documents } = formData;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Preview and Submit</h2>
            
            {/* Personal Information */}
            <div>
                <h3 className="font-semibold">Personal Info</h3>
                <p><strong>Name:</strong> {personalInfo.name}</p>
                <p><strong>Email:</strong> {personalInfo.email}</p>
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
                <p><strong>Gate Score Card:</strong> {documents.scoreCard}</p>
                <p><strong>Proof of DOB:</strong> {documents.proofOfDob}</p>
                <p><strong>Photo:</strong> {documents.photo}</p>
                <p><strong>Sign:</strong> {documents.signature }</p>
                
            </div>

            {/* Action Buttons */}
            <div className="mt-6">
                <button onClick={onPrevious} className="bg-gray-400 text-white p-2 rounded mr-2">
                    Edit
                </button>
                <button onClick={onSubmit} className="bg-green-500 text-white p-2 rounded">
                    Submit
                </button>
            </div>
        </div>
    );
};
