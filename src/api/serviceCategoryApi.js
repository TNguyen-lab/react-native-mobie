import { baseURL } from './config';
import { post, get, patch, deleteRequest } from './restApi';

export const getServiceCategories = (payload) => {
    return get(`service-category/get-list`, { ...payload });
}
export const createServiceCategory = (payload) => {
    return post(`service-category/create`, { ...payload });
}
export const updateStatus = (id) => {
    return patch(`service-category/update-status/` + id, {});
}
export const update = (id, payload) => {
    return patch(`service-category/update/` + id, payload);
}
export const deleteServiceCategory = (id, payload) => {
    return deleteRequest(`service-category/delete/` + id, {});
}

export const getAllServiceCategories = (payload) => {
    return get(`service-category/get-all`, { ...payload });
}
