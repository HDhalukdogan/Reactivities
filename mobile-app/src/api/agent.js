import axios from "axios";
import { store } from "../store";
const instance = axios.create({
    baseURL: "http://10.0.2.2:5000/api",
});

instance.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const responseBody = response => response.data;

const requests = {
    get: (url) => instance.get(url).then(responseBody),
    post: (url, body) => instance.post(url, body).then(responseBody),
    put: (url, body) => instance.put(url, body).then(responseBody),
    del: (url) => instance.delete(url).then(responseBody),
}



const Account = {
    login: (values) => requests.post('account/login', values),
    register: (values) => requests.post('account/register', values),
    currentUser: () => requests.get('account'),
}

const agent = {
    Account
}

export default agent