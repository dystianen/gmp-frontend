import useSWR from "swr";
import { http } from "../utils/http";

const url = {
    image: () => `/file/upload`,
};

const hooks = {
    useImage(filter) {
        return useSWR(url.image(filter), http.fetcher);
    },
};

const api = {
    upload(file) {
        const formData = new FormData();
        formData.append("file", file);
        return http.post(url.image(), formData)
    },
};

export const imageRepository = {
    url,
    hooks,
    api,
};