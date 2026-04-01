import { post, get, patch, deleteRequest } from "./restApi";

export const getListRepairContracts = (payload) => {
  return get("repairContract/get-list", { ...payload });
};
export const createRepairContract = (payload) => {
  return post("repairContract/create", { ...payload });
};
export const updateRepairContract = (payload) => {
  return patch("repairContract/update", { ...payload });
};
export const getRepairContractById = (id, payload) => {
  return get("repairContract/get-by-id/" + id, { ...payload });
};
export const deleteRepairContractById = (id, payload) => {
  return deleteRequest("repairContract/delete/" + id, { ...payload });
};
export const createRepairContractMappingAssetMaintenance = (payload) => {
  return post(
    "repairContract/create-repair-contract-mapping-asset-maintenance",
    { ...payload }
  );
};
export const getRepairContractMappingAssetMaintenancesByRes = (payload) => {
  return patch("repairContract/get-repair-contract-mapping-asset-maintenance", {
    ...payload,
  });
};
export const deleteRepairContractMappingAssetMaintenancesById = (
  id,
  payload
) => {
  return deleteRequest(
    "repairContract/delete-repair-contract-mapping-asset-maintenance-by-id/" +
      id,
    { ...payload }
  );
};
export const getAllRepairContractByRes = (payload) => {
  return patch("repairContract/get-all", { ...payload });
};