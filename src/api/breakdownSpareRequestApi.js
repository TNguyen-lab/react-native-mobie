import { post, get, patch, deleteRequest } from "./restApi";
import { baseURL } from "./config";

export const getListBreakdownSpareRequests = (payload) => {
  return patch(`breakdownSpareRequest/get-list`, { ...payload });
};
export const createBreakdownSpareRequest = (payload) => {
  return post(`breakdownSpareRequest/create`, { ...payload });
};
export const updateBreakdownSpareRequestDetail = (id, payload) => {
  return patch(`breakdownSpareRequest/update/` + id, { ...payload });
};
export const updateBreakdownSpareRequest = (payload) => {
  return patch(`breakdownSpareRequest/update`, { ...payload });
};
export const deleteBreakdownSpareRequest = (payload) => {
  return deleteRequest(`breakdownSpareRequest/delete`, { ...payload });
};
export const getBreakdownSpareRequestByBreakdown = (payload) => {
  return get(`breakdownSpareRequest/getAll`, { ...payload });
};
export const getBreakdownSpareRequestById = (payload) => {
  return get(`breakdownSpareRequest/get-by-id`, { ...payload });
};
export const getAllBreakdownSpareRequestBySpareRequestId = (payload) => {
  return get(`breakdownSpareRequest/get-by-spare-request`, { ...payload });
};
export const updateAllData = (payload) => {
  return patch(`breakdownSpareRequest/update`, { ...payload });
};
export const approved = (id, payload) => {
  return patch(`breakdownSpareRequest/approved/` + id, { ...payload });
};
export const getBreakdownSparePartResByRes = (payload) => {
  return get(`breakdownSpareRequest/get-by-res`, { ...payload });
};
export const assignUserFromSpareRequest = (payload) => {
  return patch(`breakdownSpareRequest/assign-user-from-spare-request`, {
    ...payload,
  });
};
