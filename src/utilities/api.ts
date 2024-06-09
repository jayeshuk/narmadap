// api.ts

import axios from 'axios';

// Define the type for the query parameters
interface QueryParams {
  [key: string]: string | number | boolean;
}

// Function to make an API call with query parameters
export const fetchData = async (endpoint: string, params?: QueryParams) => {
  try {
    const response = await axios.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
