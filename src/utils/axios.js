import axios from "axios";
import cookie from 'js-cookie';

const instance = axios.create({
    baseURL: 'http://farmlooker.test/api/admin',
    // headers: {'Authorization': `Bearer ${cookie.get("token")}`}
});


instance.interceptors.request.use(config => {
    config.headers.common['AUthorization'] = `Bearer ${cookie.get("token")}`;
    return config;
});

export default instance