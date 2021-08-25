import axios from "axios";
import cookie from 'js-cookie';

const baseUrl = "http://farmlooker.test/api";
// const baseUrl = "http://3.250.158.121/api"

const instance = axios.create({
    baseURL: `${baseUrl}/admin`,
});


instance.interceptors.request.use(config => {
    config.headers.common['Authorization'] = `Bearer ${cookie.get("token")}`;
    config.headers.common['Accept'] = `application/json`;
    config.headers.common['Content-Type'] = `application/json`;
    return config;
});

export default instance