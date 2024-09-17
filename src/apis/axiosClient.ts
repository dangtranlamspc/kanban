import axios from "axios";
import queryString from "query-string";
import { localDataNames } from "../constants/appInfors";

const baseURL = `http://192.168.102.200:3001`;


const getAccessToken = () => {
    const res = localStorage.getItem(localDataNames.authData)

    return res ? JSON.parse(res).token : '';
}

const axiosClient = axios.create({
    baseURL : baseURL,
    paramsSerializer : (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config : any) => {

    const accesstoken = getAccessToken()

    config.headers = {
        Authorization: `jiadji ${accesstoken}`,
        Accept : 'application/json',
        ...config.headers,
    }
    return { ...config, data: config.data ?? null };;
})

axiosClient.interceptors.response.use(
    (res) => {
        if (res.data && res.status >= 200 && res.status < 300) {
            return res.data;
        }else{
            return Promise.reject(res.data);
        }
    }, 
    (error) => {
        const {response} = error;
        return Promise.reject(response.data);
    }
);

export default axiosClient