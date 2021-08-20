import axios from "axios";
import cookie from 'js-cookie';

const baseUrl = "http://farmlooker.test/api";
// const baseUrl = "http://34.243.6.252/api"

const instance = axios.create({
    baseURL: `${baseUrl}/admin`,
});


instance.interceptors.request.use(config => {
    config.headers.common['Authorization'] = `Bearer ${cookie.get("token")}`;
    return config;
});

export default instance