import { post, get, patch, deleteRequest, postData } from './restApi';

export const getServiceContractors = (payload) => {
    return get('service-Contractor/get-list', { ...payload });
}
export const getAllServiceContractors = (payload) => {
    return get('service-Contractor/get-all', { ...payload });
}
export const createServiceContractor = (payload) => {
    return post('service-contractor/create', { ...payload });
}
export const updateStatus = (id) => {
    return patch('service-contractor/update-status/' + id, {});
}
export const deleteServiceContractor = (id, payload) => {
    return deleteRequest('service-contractor/delete/' + id, {});
}
export const update = (id, payload) => {
    return patch('service-contractor/update/' + id, payload);
}
// user mapping
export const createServiceContractorUserMapping = (payload) => {
    return post('service-contractor/create-user-mapping', { ...payload });
}
export const updateServiceContractorUserMappingById = (id, payload) => {
    return patch('service-contractor/update-user-mapping/' + id, payload);
}
export const deleteServiceContractorUserMappingById = (id, payload) => {
    return deleteRequest('service-contractor/delete-user-mapping/' + id, {});
}
export const getServiceContractorUserMappingByRes = (payload) => {
    return get('service-Contractor/get-user-mapping-by-res', { ...payload });
}
export const getListUserNotInServiceContractUserMapping = (payload) => {
    return get('service-Contractor/get-user-not-in-service-contractor-user-mapping', { ...payload });
}

export const uploadServiceContractorExcel = (payload) => {
    return postData("service-Contractor/upload-service-contractor", payload);
};