import { post, get, patch, deleteRequest } from './restApi';
import { baseURL } from './config';

export const getListAssetModelSolutions = (payload) => {
    return get(`asset-model-solution/get-list`, { ...payload });
}
export const getAllAssetModelSolution = (payload) => {
    return get(`asset-model-solution/get-all`, { ...payload });
}

