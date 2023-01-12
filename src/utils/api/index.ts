import axios, { AxiosError, AxiosResponse } from "axios"
import { IFetchResponse } from "../interfaces"

const baseURL = 'http://localhost:5050/technical-test/api/tests/movies/'

export const fetchURL = async (path: string) => {
    try {
        const res = await axios.get(`${baseURL+path}`) as unknown as AxiosResponse;
        const data = res.data as IFetchResponse; 
        return data;
    } catch (err) {
        const error = err as AxiosError;
        const errorData = error.response?.data || 'Failed fetching movies.'
        return errorData;
    }
}