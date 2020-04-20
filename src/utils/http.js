import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
const token = localStorage.getItem('user-token');

// eslint-disable-next-line import/prefer-default-export
export const HTTP = axios.create({
  baseURL: 'http://46.174.253.173:8000/',
  timeout: 100000,
  headers: (token === null) ? {} : { Authorization: `Token ${token}` },
});
