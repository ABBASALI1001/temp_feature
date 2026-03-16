import axios from 'axios';


// ✅ Using proxy from vite.config.js - no need for full URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // ✅ Works everywhere!
  headers: {
    'Content-Type': 'application/json'
  }
});

// For debugging - log all requests
API.interceptors.request.use(request => {
  console.log('🚀 API Request:', request.method, request.url);
  return request;
});

API.interceptors.response.use(
  response => {
    console.log('✅ API Response:', response.status);
    return response;
  },
  error => {
    console.error('❌ API Error:', error.message);
    if (error.code === 'ERR_NETWORK') {
      console.error('🔴 CORS or Network Error - Make sure backend is running on port 3000');
    }
    return Promise.reject(error);
  }
);

export const getServices = () => API.get('/services');
export const getService = (id) => API.get(`/services/${id}`);
export const createService = (serviceData) => API.post('/services/create', serviceData);

// ✨ ADD THESE TWO LINES for Edit and Delete ✨
export const updateService = (id, serviceData) => API.put(`/services/${id}`, serviceData);
export const deleteService = (id) => API.delete(`/services/${id}`);
