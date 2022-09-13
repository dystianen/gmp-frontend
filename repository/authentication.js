import {http} from "../utils/http";
import {appConfig} from "../config/app";

const url = {
    login: () => "/auth/login",
    register: () => "/auth/register",
};

const hooks = {};

const api = {
    async login(data) {
        return await http.post(url.login(), data);
    },
    async register(data) {
        return await http.post(url.register(), data)
    }
};

export const authenticationRepository = {
    url,
    hooks,
    api,
};
