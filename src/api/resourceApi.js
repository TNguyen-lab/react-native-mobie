import { deleteRequest, postData, get, generateFullUrl } from './restApi';
import { baseURL } from "./config";

export const uplresourceoadImage = (_body) => {
    return postData(`resource/upload-image`, _body);
}
export const getImage = (_id) => {
    return generateFullUrl(`/resource/image/`) + _id;
}
export const deleteImage = (payload) => {
    return deleteRequest(`resource/:id`, { ...payload });
}
export const getListAssets = (payload) => {
    return get(`asset/get-list`, { ...payload });
}
export const uploadImage = (_body) => {
    return postData(`resource/upload-image`, _body);
}
export const uploadDocumentBreakdown = (_body) => {
    return postData(`resource/upload-document-breakdown${_body.companyCode ? `?companyCode=${_body.companyCode}` : ``}`, _body);
}