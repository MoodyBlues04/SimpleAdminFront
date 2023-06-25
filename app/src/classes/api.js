import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/api/';

export default class Api
{
    async sendPost(url, data) {
        return axios
            .post(BASE_URL + url, data)
            .then((response) => response.data)
            .catch((error) => {
                throw new Error(JSON.stringify(error.response.data));
            });
    }
    
    async sendGet(url, data) {
        return axios
            .get(BASE_URL + url, data)
            .then((response) => response.data)
            .catch((error) => {
                throw new Error(JSON.stringify(error.response.data));
            });
    }
}