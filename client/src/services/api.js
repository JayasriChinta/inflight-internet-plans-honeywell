import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getPlans = () => {
  return axios.get(`${API_URL}/plans`);
};

export const activatePlan = (planId, start, end) => {
  return axios.post(`${API_URL}/activate`, { planId, start, end });
};
