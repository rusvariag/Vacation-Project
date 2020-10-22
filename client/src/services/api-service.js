import axios from 'axios';

export default class ApiService {

    authSignIn(data) {
        return this.postRequest(`/auth/signin`, data);
    }

    authSignUp(data) {
        return this.postRequest(`/auth/signup`, data);
    }

    authSignOut() {
        return this.getRequest(`/auth/signout`);
    }

    authIsLogged() {
        return this.getRequest(`/auth/logged`);
    }

    authIsValidUsername(data) {
        return this.postRequest(`/auth/is_valid`, data);
    }

    follows() {
        return this.getRequest(`/api/follows`);
    }

    followCreate(id) {
        return this.postRequest(`/api/follows`, { vacation_id: id });
    }

    followDelete(id) {
        return this.deleteRequest(`/api/follows/${id}`);
    }

    vacations() {
        return this.getRequest(`/api/vacations`);
    }

    vacationSelect(id) {
        return this.getRequest(`/api/vacations/${id}`);
    }

    vacationCreate(data) {
        return this.postRequest(`/api/vacations`, data);
    }

    vacationDelete(id) {
        return this.deleteRequest(`/api/vacations/${id}`);
    }

    vacationUpdate(id, data) {
        return this.updateRequest(`/api/vacations/${id}`, data);
    }

    async postRequest(url, options) {
        const res = await axios.post(url, options);
        return this.responseHandler(res);
    }

    async getRequest(url) {
        const res = await axios.get(url);
        return this.responseHandler(res);
    }

    async deleteRequest(url) {
        const res = await axios.delete(url);
        return this.responseHandler(res);
    }

    async updateRequest(url, options) {
        const res = await axios.patch(url, options);
        return this.responseHandler(res);
    }

    responseHandler(res) {
        if (res.status !== 200) {
            throw new Error(`Could not fetch ${res.config.url}, received ${res.status}`);
        }
        return res;
    }

}