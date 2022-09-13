import {http} from "../utils/http";
import {appConfig} from "../config/app";

const url = {
    login: () => appConfig.apiUrl + "/auth/login",
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
};

export const authenticationRepository = {
    url,
    hooks,
    api,
};
