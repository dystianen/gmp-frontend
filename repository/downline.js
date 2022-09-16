import {http} from "../utils/http";
import useSWR from "swr";

const url = {
    getDownline: () => "/users/binary-tree",
};

const hooks = {
    useGetAll() {
        return useSWR(url.getDownline(), http.fetcher)
    },
};

const api = {};

export const downlineRepository = {
    url,
    hooks,
    api,
};
