import axios from 'axios';
const BASE_URL = "https://recipes-for-everyone-backend.onrender.com"

export default axios.create({
    baseURL: BASE_URL
});

export const axoisPrivate =  axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type" : "application/json"},
    withCredentials: true
});