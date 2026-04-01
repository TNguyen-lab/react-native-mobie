import { post, get, patch, deleteRequest } from "./restApi";

export const getAmcs = (payload) => {
  return get("amc/get-list", { ...payload });
};
export const getAllAmcs = (payload) => {
  return get("amc/get-all", { ...payload });
};
export const createAmc = (payload) => {
  return post("amc/create", { ...payload });
};
export const updateStatus = (id) => {
  return patch("amc/update-status/" + id, {});
};
export const update = (id, payload) => {
  return patch("amc/update/" + id, payload);
};
export const deleteAmc = (id, payload) => {
  return deleteRequest("amc/delete/" + id, {});
};
export const getAmcById = (id, payload = {}) => {
  return get("amc/get-by-id/" + id, payload);
};
export const totalAmcByState = (payload = {}) => {
  return get("amc/total-amc-by-state", payload);
};
export const getAmcMappingAssetMaintenanceByRes = ( payload = {}) => {
  return patch("amc/get-amc-mapping-asset-maintanance-by-res", payload);
};
export const createAmcMappingAssetMaintenance = (payload) => {
  return post("amc/create-amc-mapping-asset-maintanance", { ...payload });
};
export const deleteAmcMappingAssetMaintenance = (id, payload) => {
  return deleteRequest("amc/delete-amc-mapping-asset-maintanance/" + id, {});
};
export const getAmcServiceTasksByAmc = ( payload = {}) => {
  return patch("amc/get-amc-service-task-by-amc", payload);
};