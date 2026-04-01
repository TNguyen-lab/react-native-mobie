import { post, get, patch, deleteRequest } from './restApi';
import { baseURL } from './config';

export const getListAssetModelSeftDiagnosias = (payload) => {
    return get(`asset-model-seft-diagnosia/get-list`, { ...payload });
}
export const getAllAssetModelSeftDiagnosia = (payload) => {
    return get(`asset-model-seft-diagnosia/get-all`, { ...payload });
}

