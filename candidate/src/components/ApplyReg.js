import React, { useContext, useState } from 'react'
import { useUser } from '../UserContext';

export const ApplyReg = ({ formData, onNext }) => {
    const { user } = useUser();
    const [personalInfo, setPersonalInfo] = useState(formData.personalInfo || {
        dob: '',
        mobile: '',
        address: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNext = () => {
        onNext({ personalInfo });
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Registration</h2>
            <div className="mb-4">
                <label>Name:</label>
                <input
                    type="text"
                    value={user.name} // Pre-filled from context
                    readOnly
                    className="border p-2 rounded bg-gray-100"
                />
            </div>
            <div className="mb-4">
                <label>Email:</label>
                <input
                    type="email"
                    value={user.email} // Pre-filled from context
                    readOnly
                    className="border p-2 rounded bg-gray-100"
                />
            </div>
            <div className="mb-4">
                <label>DOB:</label>
                <input
                    type="date"
                    name="dob"
                    value={personalInfo.dob}
                    onChange={handleInputChange}
                    required
                    className="border p-2 rounded"
                />
            </div>
            <div className="mb-4">
                <label>Mobile:</label>
                <input
                    type="text"
                    name="mobile"
                    value={personalInfo.mobile}
                    onChange={handleInputChange}
                    required
                    className="border p-2 rounded"
                />
            </div>
            <div className="mb-4">
                <label>Address:</label>
                <input
                    type="text"
                    name="Address"
                    value={personalInfo.address}
                    onChange={handleInputChange}
                    required
                    className="border p-2 rounded"
                />
            </div>
            <button
                onClick={handleNext}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Next
            </button>


        </div>
    )
}
