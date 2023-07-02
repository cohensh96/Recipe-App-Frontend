import axios from 'axios';
//const BASE_URL1 = "https://recipes-for-everyone-backend.onrender.com"
const BASE_URL='http://localhost:3500'
export default axios.create({
    baseURL: BASE_URL
});

export const axoisPrivate =  axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type" : "application/json"},
    withCredentials: true
});