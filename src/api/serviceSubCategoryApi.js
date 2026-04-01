import { baseURL } from './config';
import { post, get, patch, deleteRequest } from './restApi';

export const getServiceSubCategories = (payload) => {
    return get(`service-sub-category/get-list`, { ...payload });
}
export const getServiceSubCategorieByServiceCategory = (payload) => {
    return get(`service-sub-category/get-by-service-category`, { ...payload });
}
export const createServiceSubCategory = (payload) => {
    return post(`service-sub-category/create`, { ...payload });
}
export const updateStatus = (id) => {
    return patch(`service-sub-category/update-status/` + id, {});
}
export const update = (id, payload) => {
    return patch(`service-sub-category/update/` + id, payload);
}
export const deleteServiceSubCategory = (id, payload) => {
    return deleteRequest(`service-sub-category/delete/` + id, {});
}
export const getAllServiceSubCategories = (payload) => {
    return get(`service-sub-category/get-all`, { ...payload });
}