import { useState, useEffect } from 'react';
import axios from 'axios';

// Define a reusable function for fetching data
const useFetchData = (api = '', url = '') => {  
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(api); // Use Axios for the request
                if (response.status !== 200) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                setData(response.data);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [api]); // Removed 'api' from the dependency array

    return { data, error };
};

export default useFetchData;