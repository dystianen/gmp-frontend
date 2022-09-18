import {http} from "../utils/http";
import useSWR from "swr";

const url = {
    getPackages: () => "/packages",
};

const hooks = {
    useGetAll() {
        return useSWR(url.getPackages(), http.fetcher)
    },
};

const api = {};

export const packageRepository = {
    url,
    hooks,
    api,
};
