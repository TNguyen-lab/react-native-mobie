import { baseURL } from './config';
import { post, get, patch, deleteRequest } from './restApi';

export const getSpareSubCategories = (payload) => {
    return get(`spare-sub-category/get-list`, { ...payload });
}
export const createSpareSubCategory = (payload) => {
    return post(`spare-sub-category/create`, { ...payload });
}
export const updateStatus = (id) => {
    return patch(`spare-sub-category/update-status/` + id, {});
}
export const update = (id, payload) => {
    return patch(`spare-sub-category/update/` + id, payload);
}
export const deleteSpareSubCategory = (id, payload) => {
    return deleteRequest(`spare-sub-category/delete/` + id, {});
}

export const getBySpareCategoryId = (payload) => {
    return get(`spare-sub-category/get-by-spare-category-id`, { ...payload })
}