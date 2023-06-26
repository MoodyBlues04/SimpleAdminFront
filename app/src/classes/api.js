import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/api/';

export default class Api
{ // TODO singlrton ?? axios to class property with base url 
    constructor(jwt = null) {
        this.jwt = jwt;
        this.error = null;
    }

    hasError() {
        return null !== this.error;
    }

    async sendAuthorizedGet(url) {
        return await this.sendGet(url, this.getAuthHeaders());
    }

    async sendAuthorizedPost(url, data = []) {
        return await this.sendPost(url, data, this.getAuthHeaders());
    }

    async sendAuthorizedDelete(url) {
        return await this.sendDelete(url, this.getAuthHeaders());
    }

    async sendPost(url, data = [], config = null) {
        return axios
            .post(BASE_URL + url, data, config)
            .then((response) => response.data)
            .catch((error) => {
                this.error = error;
                return null;
            });
    }

    async sendDelete(url, config = null) {
        return axios
            .delete(BASE_URL + url, config)
            .then((response) => response.data)
            .catch((error) => {
                this.error = error;
                return null;
            });
    }
    
    async sendGet(url, config = null) {
        return axios
            .get(BASE_URL + url, config)
            .then((response) => response.data)
            .catch((error) => {
                this.error = error;
                return null;
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