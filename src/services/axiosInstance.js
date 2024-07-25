import axios from 'axios';
import API_URLS from '../config/apiUrls';
import CONSTANTS from '../config/constants';

const axiosInstance = axios.create({
  baseURL: API_URLS.BASE_URL, // Replace with your API base URL
  timeout: 10000, // Optional: timeout after 10 seconds
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add any custom headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle the error here
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Backend error:', error.response.data);
      if (error.response.status === 500) {
        //alert('Database connection error. Please try again later.');
      }
    } else if (error.request) {
      // No response received from server
      console.error('No response from server:', error.request);
      error['message'] = (CONSTANTS.NETWORK_ERROR)
    } else {
      // Error setting up the request
      console.error('Error setting up request:', error.message);
      alert('An error occurred while setting up the request.');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
