import axios from 'axios';

const api = axios.create({
  baseURL: 'https://classes-register-front.herokuapp.com/',
});

export default api;
