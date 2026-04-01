import { post, get, patch, deleteRequest } from "./restApi";
import * as restGateway from "./restGatewayApi";

export const getListUser = (payload) => {
  return get(`users/get-list`, { ...payload });
};
export const getPermissions = () => {
  return get(`users/get-permissions`, {});
};
export const getUserBranchs = (userId) => {
  return patch(`users/get-branchs/${userId}`, {});
};
export const getDataUser = () => {
  return get(`users/get-data-user`, {});
};
export const getPermissisonByUsers = () => {
  return get(`users/get-permission-by-user`, {});
};
export const getUserByIdPopulate = (userId) => {
  return get(`users/get-by-id-populate/${userId}`, {});
};
export const updateUser = async (userId, payload) => {
  let res = await restGateway.patch(`users/update/${userId}`, payload);
  if (res && res.id) {
    return patch(`users/update/${userId}`, payload);
  }
  return;
};
export const verifyApp = (payload) => {
  return post(`users/verify-app`, { ...payload });
};
export const saveDeviceMobile = (payload) => {
  return patch(`users/save-device-token`, { ...payload });
};
export const createUser = async (payload) => {
  let res = await restGateway.post("users/create", { ...payload });
  if (res && res.id) {
    return post("users/create", { ...res });
  }
  return;
};
export const getCompanyByCode = (code) => {
  return patch(`users/get-company-by-code/${code}`, {});
};
export const updateLastLoginTime = () => {
  return restGateway.patch(`users/update-last-login-time`, {});
};
