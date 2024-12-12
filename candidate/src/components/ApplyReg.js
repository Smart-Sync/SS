import React, { useState } from "react";
import { useUser } from "../UserContext";

export const ApplyReg = ({ formData, onNext }) => {
  const { user } = useUser();
  const [personalInfo, setPersonalInfo] = useState(
    formData.personalInfo || {
      dob: "",
      mobile: "",
      address: "",
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (!personalInfo.dob || !personalInfo.mobile || !personalInfo.address) {
      alert("Complete all entries");
      return;
    }
    onNext({ personalInfo });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Registration</h2>
      <div className="grid gap-4">
        <div className="flex flex-col">
          <label className="font-medium mb-1">Name:</label>
          <input
            type="text"
            value={user.name}
            readOnly
            className="border border-gray-300 p-2 rounded bg-gray-100"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Email:</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="border border-gray-300 p-2 rounded bg-gray-100"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">DOB:</label>
          <input
            type="date"
            name="dob"
            value={personalInfo.dob}
            onChange={handleInputChange}
            required
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={personalInfo.mobile}
            onChange={handleInputChange}
            required
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Address:</label>
          <input
            type="text"
            name="address"
            value={personalInfo.address}
            onChange={handleInputChange}
            required
            className="border border-gray-300 p-2 rounded"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};