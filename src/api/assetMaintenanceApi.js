import { post, get, patch, deleteRequest } from "./restApi";
import { baseURL } from "./config";
export const getAllAssetMaintenance = (payload) => {
  return get(`assetMaintenance/get-all`, { ...payload });
};
export const getAssetMaintenanceById = (payload) => {
  return get(`assetMaintenance/get-by-id`, { ...payload });
};
export const getAssetMaintenance = (payload) => {
  return get(`assetMaintenance/get`, { ...payload });
};
export const getListAssetMaintenances = (payload) => {
  return patch(`assetMaintenance/get-list`, { ...payload });
};
export const getListAssetMaintenanceMobile = (payload) => {
  return patch(`assetMaintenance/get-list-mobile`, { ...payload });
};
export const getAssetSummary = () => {
  return patch(`assetMaintenance/get-asset-summary`, {});
};
export const getAssetMaintenanceDueInspections = (payload) => {
  return get(`assetMaintenance/get-asset-maintenance-due-inspections`, {
    ...payload,
  });
};
export const getAssetMaintenanceChecklistByResNotAuth = (payload) => {
  return patch(
    `assetMaintenance/get-asset-maintenance-checklist-by-res-not-auth`,
    { ...payload },
  );
};
export const getPropertyAccessoriesByAssetMaintenance = (payload) => {
  return patch(
    "assetMaintenance/get-property-accessories-by-asset-maintenance",
    { ...payload },
  );
};
