import axios from "axios";
import React, { children, createContext, useContext, useEffect, useState } from 'react'
import { useUser } from "./UserContext";

const ApplicationContext = createContext();

export const useApplications = () => useContext(ApplicationContext);

export const ApplicationProvider = ({children}) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {user} = useUser();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                console.log(typeof(user._id))
                const response = await axios.get(`http://localhost:5000/api/application/candidate/${user._id}`);
                setApplications(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch application status');
                setLoading(false);
            }
        };
        if(user && user._id){
            fetchApplications();
        }
    }, [user]);

    return (
        <ApplicationContext.Provider value={{applications, loading, error}}>
            {children}
        </ApplicationContext.Provider>
    )
}