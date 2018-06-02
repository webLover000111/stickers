import axios from 'axios';

const oAxios = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': 'localhost:3001',
    'withCredentials': true,
  },
});

export default oAxios;
