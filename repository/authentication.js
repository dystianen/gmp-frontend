import {http} from "../utils/http";
import {appConfig} from "../config/app";

const url = {
    login: () => "/auth/login",
    register: () => "/auth/register",
    changePassword: () => "/users/change-password"
};

const hooks = {};

const api = {
    async login(data) {
        return await http.post(url.login(), data);
    },
    async register(data) {
        return await http.post(url.register(), data)
    },
    async resetPassword(data) {
        return await http.put(url.changePassword(), data)
    }
};

export const authenticationRepository = {
    url,
    hooks,
    api,
};
