import { http } from "../utils/http";
import useSWR from "swr";
import qs from "qs"

const url = {
    getAllTransaction: ({startDate, endDate, type}) => {
        const filter = {}
        if (startDate) {
            filter.startDate = startDate;
        }
        if (endDate) {
            filter.endDate = endDate;
        }
        if (type) {
            filter.type = type;
        }
        return `/transaction/findAll?${qs.stringify(filter)}`},
    getOneTransaction: (id) => `/transaction/getOne/${id}`,
};

const hooks = {
    useGetAllTransaction(filter) {
        return useSWR(url.getAllTransaction(filter), http.fetcher);
    },
    useGetTransactionDetail(id) {
        return useSWR(url.getOneTransaction(id), http.fetcher);
    },
}

const api = {};

export const transactionRepository = {
    url,
    hooks,
    api,
};