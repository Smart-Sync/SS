import React, { useState } from 'react';

export const ApplyQualif = ({ formData, onNext, onPrevious }) => {
  const [qualification, setQualification] = useState(
    formData.qualification || {
      gateScore: '',
      highSchool: '',
      higherSecondary: '',
      degree: '',
      skills: [],
      experienceYears: '',
    }
  );

  const handleChange = (field, value) => {
    setQualification((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillsChange = (value) => {
    const skillsArray = value.split(',').map((skill) => skill.trim());
    setQualification((prev) => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  const handleNext = () => {
    if (
      !qualification.gateScore ||
      !qualification.highSchool ||
      !qualification.higherSecondary ||
      !qualification.degree ||
      !qualification.skills.length
    ) {
      alert('Please complete all the entries!');
      return;
    }
    onNext({ qualification });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Qualifications</h2>

      {/* GATE Score */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">GATE Score</label>
        <input
          type="number"
          placeholder="Enter GATE Score"
          value={qualification.gateScore}
          onChange={(e) => handleChange('gateScore', e.target.value)}
          className="border border-gray-300 p-3 rounded w-full"
          required
        />
      </div>

      {/* High School (10th) Percentage */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">10th Grade Percentage</label>
        <input
          type="number"
          placeholder="Enter 10th Percentage/CGPA"
          value={qualification.highSchool}
          onChange={(e) => handleChange('highSchool', e.target.value)}
          className="border border-gray-300 p-3 rounded w-full"
          required
        />
      </div>

      {/* Higher Secondary (12th) Percentage */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">12th Grade Percentage</label>
        <input
          type="number"
          placeholder="Enter 12th Percentage/CGPA"
          value={qualification.higherSecondary}
          onChange={(e) => handleChange('higherSecondary', e.target.value)}
          className="border border-gray-300 p-3 rounded w-full"
          required
        />
      </div>

      {/* Degree */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Degree</label>
        <input
          type="text"
          placeholder="Enter Degree Name (e.g., B.Tech)"
          value={qualification.degree}
          onChange={(e) => handleChange('degree', e.target.value)}
          className="border border-gray-300 p-3 rounded w-full"
          required
        />
      </div>

      {/* Skills */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Skills</label>
        <textarea
          placeholder="Enter skills (e.g., Python, JavaScript, React)"
          value={(qualification.skills || []).join(', ')}
          onChange={(e) => handleSkillsChange(e.target.value)}
          className="border border-gray-300 p-3 rounded w-full"
          rows="3"
          required
        />
      </div>

      {/* Experience */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Years of Experience (If any)</label>
        <input
          type="number"
          placeholder="Enter Years of Experience"
          value={qualification.experienceYears}
          onChange={(e) => handleChange('experienceYears', e.target.value)}
          className="border border-gray-300 p-3 rounded w-full"
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