import { post, get, patch, deleteRequest } from './restApi';
import { baseURL } from "./config";
export const getAllAssetModel = (payload) => {
    return get(`assetModel/get-all`, { ...payload });
}

