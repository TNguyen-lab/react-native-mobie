import { post, get, patch, deleteRequest } from './restApi';
import { baseURL } from './config';
// export const getListSubCategories = (payload) => {
//     return get('subCategory/get-list', { ...payload });
// }
// export const createSubCategory = (payload) => {
//     return post('subCategory/create', { ...payload });
// }
// export const getSubCategoryById = (payload) => {
//     return get('subCategory/get-by-id', { ...payload });
// }
export const getAllSubCategory = (payload) => {
    return get(`subCategory/get-all`, { ...payload });
}
// export const updateSubCategory = (payload) => {
//     return patch('subCategory/update', { ...payload });
// }
// export const updateSubCategoryStatus = (payload) => {
//     return patch('subCategory/update-status', { ...payload });
// }
// export const deleteSubCategory = (payload) => {
//     return deleteRequest('subCategory/delete', { ...payload });
// }
// export const getByCategoryId= (payload) => {
//     return get('subCategory/get-by-categoryId', { ...payload });
// }
