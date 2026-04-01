import { baseURL } from './config';
import { post, get, patch, deleteRequest } from './restApi';

export const getListAssetModelFailureTypes = (payload) => {
    return get(`asset-model-failure-type/get-list`, { ...payload });
}
export const createAssetModelFailureType = (payload) => {
    return post(`asset-model-failure-type/create`, { ...payload });
}
export const getAssetModelFailureTypeById = (payload) => {
    return get(`asset-model-failure-type/get-by-id`, { ...payload });
}
export const getAssetModelFailureTypeByAssetModel = (payload) => {
    return get(`asset-model-failure-type/get-by-model`, { ...payload });
}
export const getAllAssetModelFailureType = (payload) => {
    return get(`asset-model-failure-type/get-all`, { ...payload });
}
export const updateAssetModelFailureType = (id, payload) => {
    return patch(`asset-model-failure-type/update/` + id, { ...payload });
}
export const deleteAssetModelFailureType = (payload) => {
    return deleteRequest(`asset-model-failure-type/delete`, { ...payload });
}
export const getAssetModelFailureTypeUnusedsSeftDiagnosia = (payload) => {
    return post(`asset-model-failure-type/get-list-unused-seft-diagnosia`, { ...payload });
}
export const getAssetModelFailureTypeUnusedsSolution = (payload) => {
    return post(`asset-model-failure-type/get-list-unused-solution`, { ...payload });
}