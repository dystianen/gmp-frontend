import {appConfig} from "../config/app";
import {TokenUtil} from "./token";
import {authenticationRepository} from "../repository/authentication";
import axios from "axios";

const instance = axios.create({
    baseURL: appConfig.apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        if (TokenUtil.accessToken) {
            config.headers["Authorization"] = 'Bearer ' + TokenUtil.accessToken; // for Node.js Express back-end
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/login" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    if (TokenUtil.refreshToken) {
                        await authenticationRepository.api.refreshToken()
                    }
                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export const http = {
    fetcher: async (url) => {
        const resp = await instance.get(appConfig.apiUrl + url);

        return resp.data;
    },
    get: async (url, opts = {}) => {
        const resp = await instance.post(appConfig.apiUrl + url);

        return resp.data;
    },
    post: async (url, data, opts) => {
        const resp = await instance.post(appConfig.apiUrl + url, data);

        return resp.data;
    },
    put: async (url, data, opts) => {
        const resp = await instance.put(appConfig.apiUrl + url, data);

        return resp.data;
    },
    del: async (url, opts) => {
        const resp = await instance.delete(appConfig.apiUrl + url);

        return resp.data;
    },
};
