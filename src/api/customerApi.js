import { post, get, patch, deleteRequest } from './restApi';
import { baseURL } from "./config";
export const getListCustomers = (payload) => {
    return get('customer/get-list', { ...payload });
}
export const createCustomer = (payload) => {
    return post('customer/create', { ...payload });
}
export const getCustomerById = (payload) => {
    return get('customer/get-by-id', { ...payload });
}
export const getAllCustomer = (payload) => {
    return get(`customer/get-all`, { ...payload });
}
export const updateCustomer = (payload) => {
    return patch('customer/update', { ...payload });
}
export const updateCustomerStatus = (payload) => {
    return patch('customer/update-status', { ...payload });
}
export const deleteCustomer = (payload) => {
    return deleteRequest('customer/delete', { ...payload });
}
