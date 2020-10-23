import axios from 'axios';

const api = axios.create({
  baseURL: 'https://classes-register-api.herokuapp.com/',
});

export default api;
