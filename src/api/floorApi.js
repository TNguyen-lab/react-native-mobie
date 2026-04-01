import { baseURL } from "./config";
import { post, get, patch, deleteRequest } from './restApi';

export const getListFloors = (payload) => {
    return get(`floor/get-list`, { ...payload });
}
export const createFloor = (payload) => {
    return post(`floor/create`, { ...payload });
}
export const getFloorById = (payload) => {
    return get(`floor/get-by-id`, { ...payload });
}
export const getAllFloor = (payload) => {
    return get(`floor/get-all`, { ...payload });
}
export const updateFloor = (payload) => {
    return patch(`floor/update`, { ...payload });
}
export const updateFloorStatus = (payload) => {
    return patch(`floor/update-status`, { ...payload });
}
export const deleteFloor = (payload) => {
    return deleteRequest(`floor/delete`, { ...payload });
}
