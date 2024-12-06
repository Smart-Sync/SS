import React, { useState } from 'react'

export const ApplyDoc = ({ formData, onNext, onPrevious }) => {

    const [documents, setDocuments] = useState(formData.documents || {
        scoreCard: '',
        proofOfDob: '',
        photo: '',
        signature: '',
    });
    const handleChange = (field, value) => {
        setDocuments((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleNext = () => {
        if (!documents.scoreCard || !documents.proofOfDob || !documents.photo || !documents.signature) {
            alert('Please upload all required documents!');
            return;
        }

        onNext({ documents });
    };
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Upload Documents</h2>
            <div>
                <label className="block mb-1 font-semibold">GATE Score Card</label>
                <input
                    type="file"
                    onChange={(e) => handleChange('scoreCard', e.target.files[0])}
                    className="border p-2 rounded"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Proof of DOB</label>
                <input
                    type="file"
                    onChange={(e) => handleChange('proofOfDob', e.target.files[0])}
                    className="border p-2 rounded"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Photo</label>
                <input
                    type="file"
                    alt = "Photo"
                    onChange={(e) => handleChange('photo', e.target.files[0])}
                    className="border p-2 rounded"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Sign</label>
                <input
                    type="file"
                    alt="Sign"
                    onChange={(e) => handleChange('signature', e.target.files[0])}
                    className="border p-2 rounded"
                />
            </div>
            <div className="mt-4">
                <button onClick={onPrevious} className="bg-gray-400 text-white p-2 rounded mr-2">
                    Previous
                </button>
                <button onClick={handleNext} className="bg-blue-500 text-white p-2 rounded">
                    Next
                </button>
            </div>
        </div>
    )
}
