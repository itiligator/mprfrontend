import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
const token = localStorage.getItem('user-token');


const isHandlerEnabled = true;

const errorHandler = (error) => {
  if (isHandlerEnabled) {
    console.log(error);
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ ...error });
};

const successHandler = (response) => {
  if (isHandlerEnabled) {
    console.log(response);
  }
  return response;
};


// eslint-disable-next-line import/prefer-default-export
export const HTTP = axios.create({
  // baseURL: 'http://46.174.253.173:8000/api/',
  // baseURL: 'http://192.168.42.47:8000/api',
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 10000,
  headers: (token === null) ? {} : { Authorization: `Token ${token}` },
});

HTTP.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error),
);
