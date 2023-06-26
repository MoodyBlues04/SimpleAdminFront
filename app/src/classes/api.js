import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/api/';

export default class Api
{ // TODO singlrton ?? axios to class property with base url 
    constructor(jwt = null) {
        this.jwt = jwt;
    }

    async sendAuthorizedGet(url) {
        return await this.sendGet(url, this.getAuthHeaders());
    }

    async sendAuthorizedPost(url, data = []) {
        return await this.sendPost(url, data, this.getAuthHeaders());
    }

    async sendPost(url, data = [], config = null) {
        axios.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request, null, 2))
            return request
          })
          
          axios.interceptors.response.use(response => {
            console.log('Response:', JSON.stringify(response, null, 2))
            return response
          })
        return axios
            .post(BASE_URL + url, data, config)
            .then((response) => response.data)
            .catch((error) => {
                throw new Error(JSON.stringify(error.response.data));
            });
    }
    
    async sendGet(url, config = null) {
        return axios
            .get(BASE_URL + url, config)
            .then((response) => response.data)
            .catch((error) => {
                throw new Error(JSON.stringify(error.response.data));
            });
    }

    getAuthHeaders() {
        return {
            headers: {
                'Authorization': `Bearer ${this.jwt}`
            }
        };
    }
}