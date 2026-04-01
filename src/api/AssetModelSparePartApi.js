import { post, get, patch } from "./restApi";
import { baseURL } from "./config";

export const getResById = (payload) => {
    return get(`asset-model-spare-part/get-res-by-id`, { ...payload });
}
export const createAssetModelSparePart = (payload) => {
    return post(`asset-model-spare-part/create`, { ...payload });
}
export const getAssetModelSparePartById = (payload) => {
    return get(`asset-model-spare-part/get-by-id`, { ...payload });
}
export const getAllAssetModelSparePart = (payload) => {
    return get(`asset-model-spare-part/get-all`, { ...payload });
}
export const updateAssetModelSparePart = (payload) => {
    return patch(`asset-model-spare-part/update`, { ...payload });
}
