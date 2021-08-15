import axios from "axios";
import cookie from 'js-cookie';

const instance = axios.create({
    baseURL: 'http://farmlooker.test/api/admin',
});


instance.interceptors.request.use(config => {
    config.headers.common['Authorization'] = `Bearer ${cookie.get("token")}`;
    return config;
});

export default instance