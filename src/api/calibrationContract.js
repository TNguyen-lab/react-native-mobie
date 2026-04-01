import { post, get, patch, deleteRequest } from "./restApi";

export const getCalibrationContracts = (payload) => {
    return patch("calibrationContract/get-list", { ...payload });
};
export const getCalibrationContractById = (id, payload) => {
    return get("calibrationContract/get-by-id/" + id, payload);
};