import { http } from "../utils/http";
import useSWR from "swr";

const url = {
    getBalanceUSDT: () => `/users/balance`,
    getBalanceGMP: () => `/users/balance-gmp`,
    getLastTransactions: (type) => `/transaction/last-transaction/${type}`
};

const hooks = {
    useGetBalanceUSDT() {
        return useSWR(url.getBalanceUSDT(), http.fetcher);
    },
    useGetBalanceGMP() {
        return useSWR(url.getBalanceGMP(), http.fetcher);
    },
    useGetLastTransactions(type) {
        return useSWR(url.getLastTransactions(type), http.fetcher);
    }
}

const api = {};

export const walletRepository = {
    url,
    hooks,
    api,
};