import axios, { AxiosInstance } from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export const $http: AxiosInstance = axios.create({
    baseURL,
});
