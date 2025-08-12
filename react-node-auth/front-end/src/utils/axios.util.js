import axios from "axios";

const axiosHttp = axios.create({
    baseURL: '/api',
    withCredentials: true
});

export default axiosHttp;