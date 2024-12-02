import React, { useState } from 'react'

export const ApplyQualif = ({ formData, onNext, onPrevious }) => {

    const [qualification, setQualification] = useState(formData.qualification || {
        gateScore: '',
        highSchool: '',
        higherSecondary: '',
        degree: '',
        skills: [],
        experienceYears: '',

    });

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
        onNext({ qualification });
    };


    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Qualifications</h2>
            {/* GATE Score */}
            <div className="mb-4">
                <label className="block mb-1 font-semibold">GATE Score </label>
                <input
                    type="number"
                    placeholder="Enter GATE Score"
                    value={qualification.gateScore}
                    onChange={(e) => handleChange('gateScore', e.target.value)}
                    className="border p-2 rounded "
                />
            </div>

            {/* High School (10th) Percentage */}
            <div className="mb-4">
                <label className="block mb-1 font-semibold">10th Grade Percentage</label>
                <input
                    type="number"
                    placeholder="Enter 10th Percentage/CGPA"
                    value={qualification.highSchool}
                    onChange={(e) => handleChange('highSchool', e.target.value)}
                    className="border p-2 rounded "
                    required
                />
            </div>

            {/* Higher Secondary (12th) Percentage */}
            <div className="mb-4">
                <label className="block mb-1 font-semibold">12th Grade Percentage</label>
                <input
                    type="number"
                    placeholder="Enter 12th Percentage/CGPA"
                    value={qualification.higherSecondary}
                    onChange={(e) => handleChange('higherSecondary', e.target.value)}
                    className="border p-2 rounded "
                    required
                />
            </div>

            {/* Degree */}
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Degree</label>
                <input
                    type="text"
                    placeholder="Enter Degree Name (e.g., B.Tech)"
                    value={qualification.degree}
                    onChange={(e) => handleChange('degree', e.target.value)}
                    className="border p-2 rounded "
                    required
                />
            </div>

            {/* Skills */}
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Skills </label>
                <textarea
                    placeholder="Enter skills"
                    value={(qualification.skills || []).join(', ')}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    className="border p-2 rounded "
                    required
                />
            </div>

            {/* Experience */}
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Years of Experience (If-any)</label>
                <input
                    type="number"
                    placeholder="Enter Years of Experience"
                    value={qualification.experienceYears}
                    onChange={(e) => handleChange('experienceYears', e.target.value)}
                    className="border p-2 rounded "
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
