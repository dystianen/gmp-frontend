import {http} from "../utils/http";
import {appConfig} from "../config/app";

const url = {
    login: () => "/auth/login",
    register: () => "/auth/register",
};

const hooks = {};

const api = {
    async login({username, password, captcha_token}) {
        return await http.post(url.login(), {
            usernameOrEmail: username,
            password,
            captcha_token,
        });
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
