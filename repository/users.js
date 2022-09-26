import { http } from "../utils/http";
import useSWR from "swr";

const url = {
    getAllUser: () => "/users/",
    getProfile: () => `/users/profile`,
    getUserId: (id) => `/users/detail-binary/${id}`,
    editUser: (id) => `/users/${id}`,
    deleteUser: (id) => `/users/${id}`,
    uploadUserImage: () => `/file/upload`,
    changePassword: () => `/users/change-password`,
    binaryTree: () => `/users/binary-tree`,
    sunTree: () => `/users/sun-tree`,
    getMyPackage: () => `/users/my-package`,
};

const hooks = {
    useGetAllUser() {
        return useSWR(url.getAllUser(), http.fetcher);
    },
    useGetProfile() {
        return useSWR(url.getProfile(), http.fetcher);
    },
    useGetProfileById(id) {
        return useSWR(url.getUserId(id), http.fetcher);
    },
    useGetMyPackage() {
        return useSWR(url.getMyPackage(), http.fetcher);
    }
}

const api = {
    updateProfile(id, data) {
        return http.put(url.editUser(id), data);
    },    
    uploadUserImage(file) {
        const formData = new FormData();
        formData.append("file", file);
        return http.upload(url.uploadUserImage()).send(formData);
    },
};

export const userRepository = {
    url,
    hooks,
    api,
};