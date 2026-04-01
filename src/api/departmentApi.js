import { post, get, patch, deleteRequest } from './restApi';

export const getListDepartments = (payload) => {
    return get(`department/get-list`, { ...payload });
}
export const createDepartment = (payload) => {
    return post(`department/create`, { ...payload });
}
export const getDepartmentById = (payload) => {
    return get(`department/get-by-id`, { ...payload });
}
export const getAllDepartment = (payload) => {
    return get(`department/get-all`, { ...payload });
}
export const updateDepartment = (payload) => {
    return patch(`department/update`, { ...payload });
}
export const updateDepartmentStatus = (payload) => {
    return patch(`department/update-status`, { ...payload });
}
export const deleteDepartment = (payload) => {
    return deleteRequest(`department/delete`, { ...payload });
}
