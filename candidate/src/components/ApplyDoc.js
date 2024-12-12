import React, { useState } from 'react';

export const ApplyDoc = ({ formData, onNext, onPrevious }) => {
  const [documents, setDocuments] = useState(
    formData.documents || {
      scoreCard: '',
      proofOfDob: '',
    }
  );

  const handleChange = (field, value) => {
    setDocuments((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (!documents.scoreCard || !documents.proofOfDob) {
      alert('Please upload all required documents!');
      return;
    }

    onNext({ documents });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Documents</h2>

      {/* GATE Score Card */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">GATE Score Card</label>
        <input
          type="file"
          onChange={(e) => handleChange('scoreCard', e.target.files[0])}
          className="block w-full border border-gray-300 p-3 rounded"
        />
      </div>

      {/* Proof of DOB */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Proof of Date of Birth</label>
        <input
          type="file"
          onChange={(e) => handleChange('proofOfDob', e.target.files[0])}
          className="block w-full border border-gray-300 p-3 rounded"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={onPrevious}
          className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};