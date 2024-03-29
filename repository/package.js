import {http} from "../utils/http";
import useSWR from "swr";

const url = {
    getPackages: () => "/packages",
    getProgress: () => "/transaction/target-progress",
    getDetails: (id) => "/packages/" + id,
    buyPackage: () => "/transaction/buy-package",
    payBillsPackage: () => "/transaction/pay-bills",
};

const hooks = {
    useGetAll() {
        return useSWR(url.getPackages(), http.fetcher)
    },
    useGetDetail(id) {
        return useSWR(url.getDetails(id), http.fetcher)
    },
    useGetProgress() {
        return useSWR(url.getProgress(), http.fetcher)
    }
};

const api = {
    async buyPackage(data) {
        return await http.post(url.buyPackage(), data)
    },
    async payBills(data) {
        return await http.post(url.payBillsPackage(), data)
    }
};

export const packageRepository = {
    url,
    hooks,
    api,
};
