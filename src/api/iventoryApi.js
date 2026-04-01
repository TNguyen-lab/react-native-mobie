import { get } from "./restApi";
import { baseURL } from "./config";
export const getSpareParts = (payload) => {
  return get(`inventory/get-spare-parts`, { ...payload });
};

export const getAssetModels = (payload) => {
  return get(`inventory/get-asset-models`, { ...payload });
};
