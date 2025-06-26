import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Set a timeout of 10 seconds
  // Add timeout and validation
  withCredentials: true, // Add this line
  maxRedirects: 5,
  validateStatus: (status) => status >= 200 && status < 500,
});

// Debug interceptor
api.interceptors.request.use(
  (config) => {
    if (config.url && !config.url.startsWith('https://')) {
      config.url = config.url.replace('http://', 'https://');
    }
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error('No Response Received:', error.request);
    } else {
      console.error('Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;