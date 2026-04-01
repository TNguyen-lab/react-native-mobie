import { baseURL } from './config';
import { post, get, patch, deleteRequest } from './restApi';

export const getSpareCategories = (payload) => {
    return get(`spare-category/get-list`, { ...payload });
}
export const createSpareCategory = (payload) => {
    return post(`spare-category/create`, { ...payload });
}
export const updateStatus = (id) => {
    return patch(`spare-category/update-status/` + id, {});
}
export const update = (id, payload) => {
    return patch(`spare-category/update/` + id, payload);
}
export const deleteSpareCategory = (id, payload) => {
    return deleteRequest(`spare-category/delete/` + id, {});
}