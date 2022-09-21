import {http} from "../utils/http";
import useSWR from "swr";

const url = {
    getDownline: (type) => `/users/${type}`,
};

const hooks = {
    useGetAll(type) {
        return useSWR(url.getDownline(type), http.fetcher)
    },
};

const api = {};

export const downlineRepository = {
    url,
    hooks,
    api,
};
