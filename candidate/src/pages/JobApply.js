import React, { useState } from 'react'
import { ApplyReg } from '../components/ApplyReg';
import { ApplyQualif } from '../components/ApplyQualif';
import { ApplyDoc } from '../components/ApplyDoc';
import { ApplyFinal } from '../components/ApplyFinal';
import { useLocation, useParams } from 'react-router-dom';

export const JobApply = () => {
    const location = useLocation();
    const jobId = location.state?.jobId || '';
    
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        jobId,
        personalInfo: {},
        qualification: {},
        documents: null,
    });

    const handleNext = (data) => {
        setFormData({ ...formData, ...data });
        setCurrentStep((prev) => prev + 1);
    };

    const handlePrevious = () => {
        setCurrentStep((prev) => prev - 1);
    };

    
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <ApplyReg formData={formData} onNext={handleNext} />;
            // case 2:
            //     return (
            //         <ApplyQualif
            //             formData={formData}
            //             onNext={handleNext}
            //             onPrevious={handlePrevious}
            //         />
            //     );
            case 2:
                return (
                    <ApplyDoc
                        formData={formData}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                );
            case 3:
                return (
                    <ApplyFinal
                        formData={formData}
                        onPrevious={handlePrevious}
                    />
                );
            default:
                return <div>Invalid Step</div>;
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-center text-2xl font-bold mb-4">Application Form - Step {currentStep}</h1>
            {renderStep()}
        </div>
    )
}
