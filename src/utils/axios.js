import axios from "axios";
import cookie from 'js-cookie';

let baseUrl = "http://3.250.158.121/api";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    baseUrl = "http://farmlooker.test/api";
}

const instance = axios.create({
    baseURL: `${baseUrl}/admin`,
});


instance.interceptors.request.use(config => {
    config.headers.common['Authorization'] = `Bearer ${cookie.get("token")}`;
    config.headers.common['Accept'] = `application/json`;
    config.headers.common['Content-Type'] = `application/json`;
    return config;
});

export function createUrl(base){
    return `${baseUrl}/admin/${base}`
}

export function getAuthorizationHeader(){
    return { Authorization:  `Bearer ${cookie.get("token")}`}
}

export default instance