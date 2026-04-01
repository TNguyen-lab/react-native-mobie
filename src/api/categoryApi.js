import { post, get, patch, deleteRequest } from './restApi';
import { baseURL } from "./config";
export const getAllCategory = (payload) => {
    return get(`category/get-all`, { ...payload });
}

