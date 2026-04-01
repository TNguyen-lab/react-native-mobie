import { post, get, patch, deleteRequest } from './restApi';

export const getServicePackages = (payload) => {
    return get('service-package/get-list', { ...payload });
}
export const getAllServicePackages = (payload) => {
    return get('service-package/get-all', { ...payload });
}
export const createServicePackage = (payload) => {
    return post('service-package/create', { ...payload });
}
export const updateStatus = (id) => {
    return patch('service-package/update-status/' + id, {});
}
export const update = (id, payload) => {
    return patch('service-package/update/' + id, payload);
}
export const deleteServicePackage = (id, payload) => {
    return deleteRequest('service-package/delete/' + id, {});
}
export const getServicePackageById = (id, payload = {}) => {
    return get('service-package/get/' + id, payload);
}
export const detailServicePackage = (id, payload = {}) => {
    return get('service-package/detail/' + id, payload);
}