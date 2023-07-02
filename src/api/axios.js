import axios from 'axios';
const BASE_URL = "https://recipe-app-api-khxh.onrender.com"
//const BASE_URL='http://localhost:3500'
export default axios.create({
    baseURL: BASE_URL
});

export const axoisPrivate =  axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type" : "application/json"},
    withCredentials: true
});