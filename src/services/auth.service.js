import api from "@/services/api/axios.js";

export const login = (data) => api.post('/login/alt', data);

export const  getDetails = () => api.get('/setting/detail');
