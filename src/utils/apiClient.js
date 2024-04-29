import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://seranycare.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
