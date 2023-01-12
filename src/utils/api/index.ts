import axios, { AxiosError, AxiosResponse } from "axios"
import { IFetchResponse } from "../interfaces"

export const fetchURL = async (url: string) => {
    try {
        const res = await axios.get(url) as unknown as AxiosResponse;
        const data = res.data as IFetchResponse; 
        return data;
    } catch (err) {
        const error = err as AxiosError;
        const errorData = error.response?.data || 'Failed fetching movies.'
        return errorData;
    }
}