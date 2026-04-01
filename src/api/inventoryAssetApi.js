import { post, get, patch, deleteRequest } from "./restApi";

export const getMyInventoryAssets = (payload) => {
    return get("Inventory-asset/my-inventory-assets", { ...payload });
};
export const createInventoryAsset = (payload) => {
    return post("Inventory-asset/create", { ...payload });
};
export const confirmInventoryAsset = (payload) => {
    return post("Inventory-asset/confirm", { ...payload });
};
export const getInventoryAssetById = (payload) => {
    return get("Inventory-asset/get-by-id", { ...payload });
};
export const getInventoryAssetDepartmentById = (payload) => {
    return get("Inventory-asset/get-inventory-asset-department-by-id", { ...payload });
};
export const getAllInventoryAsset = (payload) => {
    return get("Inventory-asset/get-all", { ...payload });
};
export const updateInventoryAsset = (payload) => {
    return patch("Inventory-asset/update", { ...payload });
};
export const updateInventoryAssetStatus = (payload) => {
    return patch("Inventory-asset/update-status", { ...payload });
};
export const deleteInventoryAsset = (payload) => {
    return deleteRequest("Inventory-asset/delete", { ...payload });
};
export const confirmInventoryAssetDepartment = (payload) => {
    return post("Inventory-asset/confirm-inventory-asset-department", { ...payload });
};
export const sendAssetMaintenances = (payload) => {
    return post("Inventory-asset/send-asset-maintenances", { ...payload });
};
export const scanRealtime = (payload) => {
    return patch("Inventory-asset/scan-realtime", { ...payload });
};
export const deleteDepartmentAssetMaintenance = (payload) => {
    return post("Inventory-asset/delete-department-asset-maintenance", { ...payload });
};