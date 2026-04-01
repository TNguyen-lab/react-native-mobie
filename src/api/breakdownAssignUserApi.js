import { post, get, patch } from "./restApi";
import { baseURL } from './config';
import { breakdown } from ".";

export const comfirmAcceptBreakdownAssignUer = (payload) => {
  return patch(`breakdownAssignUser/comfirm-accept-breakdown-assign-user`, { ...payload });
};
export const comfirmRefuseBreakdownAssignUer = (payload) => {
  return patch(`breakdownAssignUser/comfirm-refuse-breakdown-assign-user`, { ...payload });
};
export const updateStatusBreakdownAssignUser = (payload) => {
  return patch(`breakdownAssignUser/update-status`, { ...payload });
};
export const getBreakdownAssignUserById = (payload) => {
  return get(`breakdownAssignUser/get-by-id`, { ...payload });
};
export const getBreakdownAssignUserByRes = (payload) => {
  return get(`breakdownAssignUser/get-by-res`, { ...payload });
};
export const getBreakdownAssignUserByBreakdownId = (payload) => {
  return get(`breakdownAssignUser/get-breakdown-assign-user`, { ...payload });
};
export const checkinBreakdown = (breakdownAssignUserId, payload) => {
  return patch(`breakdownAssignUser/check-in-breakdown/` + breakdownAssignUserId, { ...payload });
};
export const checkoutBreakdown = (breakdownAssignUserId, payload) => {
  return patch(`breakdownAssignUser/check-out-breakdown/` + breakdownAssignUserId, { ...payload });
};
export const createBreakdownAssignUserRepair = (payload) => {
  return post(`breakdownAssignUser/create-breakdown-assign-user-repair`, { ...payload });
}
export const updateBreakdownAssignUserStatusRequestForSupport = (payload) => {
  return patch(`breakdownAssignUser/request-for-support`, { ...payload });
};
export const comfirmBreakdownAssignUserFixedMobile = (payload) => {
  return patch(`breakdownAssignUser/comfirm-breakdown-fixed-mobile`, { ...payload });
};
export const createBreakdownAssignUser = (payload) => {
  return post(`breakdownAssignUser/create`, { ...payload });
};
export const replacementAssignUser = (payload) => {
  return patch(`breakdownAssignUser/replecement-assign-user`, { ...payload });
};
export const getTotalMyBreakdownAssignUserStatus = (payload) => {
  return get(`breakdownAssignUser/get-total-my-breakdown-assign-user`, { ...payload });
};
export const getBreakdowUserByBreakdownEndWCA = (payload) => {
  return get(`breakdownAssignUser/get-by-breakdown-wca`, { ...payload });
};
export const comfirmBreakdownAssignUserFixed = (payload) => {
  return patch(`breakdownAssignUser/comfirm-breakdown-fixed`, { ...payload });
};
export const getTotalEngineerBreakdownAssignUser = (breakdownUserAssignId) => {
  return patch(`breakdownAssignUser/get-total-engineer-breakdown-assign/` + breakdownUserAssignId);
};