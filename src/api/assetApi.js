import { post, get, patch, deleteRequest } from './restApi';
import { baseURL } from "./config";

export const getAllAsset = (payload) => {
    return get(`asset/get-all`, { ...payload });
}

