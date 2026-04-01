import { STORAGE_KEY } from "../utils/constant";

export const checkPermission = function (permissions, code) {
    if (!code) return false;
    if (!permissions || permissions.length == 0) {
        permissions = JSON.parse(localStorage.getItem(STORAGE_KEY.PERMISSION));
    }
    if (!permissions) return false;
    return permissions.findIndex(f => f?.code === code) > -1;
    // return true;
};