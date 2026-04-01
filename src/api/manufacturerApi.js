import { post, get, patch, deleteRequest } from "./restApi";
import { baseURL } from "./config";

export const getAllManufacturer = (payload) => {
  return get(`manufacturer/get-all`, { ...payload });
};
