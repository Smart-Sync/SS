import React, { useState } from 'react';
import axios from 'axios';

const ApplicationForm = ({ candidateId, jobId }) => {
    const [formData, setFormData] = useState({
        personalDetails: { name: '', dateOfBirth: '', gender: '', nationality: '' },
        educationDetails: { universityName: '', yearOfPassing: '' },
        contactDetails: { address: '', mobile: '' }
    });

    const [files, setFiles] = useState({ resume: null, marksheets: null, aadharCard: null, coverLetter: null });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [section, key] = name.split('.');
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                [key]: value
            }
        });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFiles({
            ...files,
            [name]: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('candidateId', candidateId);
        data.append('jobId', jobId);
        data.append('personalDetails', JSON.stringify(formData.personalDetails));
        data.append('educationDetails', JSON.stringify(formData.educationDetails));
        data.append('contactDetails', JSON.stringify(formData.contactDetails));

        Object.keys(files).forEach((key) => {
            if (files[key]) data.append(key, files[key]);
        });

        try {
            await axios.post('http://localhost:5000/api/apply', data);
            alert('Application submitted successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Personal Details</h2>
            <input name="personalDetails.name" onChange={handleChange} placeholder="Name" required />
            <input name="personalDetails.dateOfBirth" onChange={handleChange} placeholder="Date of Birth" required />
            <input name="personalDetails.gender" onChange={handleChange} placeholder="Gender" required />
            <input name="personalDetails.nationality" onChange={handleChange} placeholder="Nationality" required />

            <h2>Educational Details</h2>
            <input name="educationDetails.universityName" onChange={handleChange} placeholder="University Name" required />
            <input name="educationDetails.yearOfPassing" onChange={handleChange} placeholder="Year of Passing" required />

            <h2>Contact Details</h2>
            <input name="contactDetails.address" onChange={handleChange} placeholder="Address" required />
            <input name="contactDetails.mobile" onChange={handleChange} placeholder="Mobile" required />

            <h2>Upload Documents</h2>
            <input type="file" name="resume" onChange={handleFileChange} required />
            <input type="file" name="marksheets" onChange={handleFileChange} required />
            <input type="file" name="aadharCard" onChange={handleFileChange} required />
            <input type="file" name="coverLetter" onChange={handleFileChange} />

            <button type="submit">Submit Application</button>
        </form>
    );
};

export default ApplicationForm;
