import { post, get, patch, deleteRequest } from './restApi';
import { baseURL } from "./config";
export const getListSchedulePreventives = (payload) => {
  return patch(`schedulePreventive/get-list`, { ...payload });
};
export const getMySchedulePreventives = (payload) => {
  return patch(`schedulePreventive/get-list-my-schedule-preventive`, { ...payload });
};
export const createSchedulePreventive = (payload) => {
  return post(`schedulePreventive/create`, { ...payload });
};
export const getSchedulePreventiveById = (payload) => {
  return get(`schedulePreventive/get-by-id`, { ...payload });
};
export const getSchedulePreventiveTaskAssignUserById = (payload) => {
  return get(`schedulePreventive/get-schedule-preventive-task-assign-user-by-id`, { ...payload });
};
export const updateSchedulePreventive = (payload) => {
  return patch(`schedulePreventive/update`, { ...payload });
};
export const deleteSchedulePreventive = (payload) => {
  return deleteRequest(`schedulePreventive/delete`, { ...payload });
};
export const userConfirm = (payload) => {
  return patch(`schedulePreventive/user-confirm`, { ...payload });
};
export const userCancelConfirm = (payload) => {
  return patch(`schedulePreventive/user-cancel-confirm`, { ...payload });
};
export const updateSchedulePreventiveCheckInOut = (payload) => {
  return patch(`schedulePreventive/update-checkin-checkout`, { ...payload });
};
export const schedulePreventiveTaskAssignUser = (payload) => {
  return patch(`/schedulePreventive/schedule-preventive-task-assign-user`, { ...payload });
};
export const comfirmCancelSchedulePreventive = (payload) => {
  return patch(`/schedulePreventive/comfirm-cancel`, { ...payload });
};
export const getCurrentCheckinCheckout = (payload) => {
  return get(`/schedulePreventive/get-current-checkin-checkout`, { ...payload });
};
export const checkinSchedulePreventiveTask = (payload) => {
  return post(`/schedulePreventive/check-in-schedule-preventive-task`, { ...payload });
};
export const checkOutSchedulePreventiveTask = (payload) => {
  return post(`/schedulePreventive/check-out-schedule-preventive-task`, { ...payload });
};
export const startWorkTask = (payload) => {
  return post(`/schedulePreventive/start-work-task`, { ...payload });
};
export const comfirmCloseSchedulePreventive = (payload) => {
  return patch(`/schedulePreventive/comfirm-close`, { ...payload });
};
export const comfirmReOpenSchedulePreventive = (payload) => {
  return patch(`/schedulePreventive/comfirm-reopen`, { ...payload });
};
export const getTotalMySchedulePreventiveTaskAssignUserStatus = (payload) => {
  return get(`schedulePreventive/get-total-my-schedule-preventive`, { ...payload });
};
export const getTotalSchedulePreventiveStatus = (payload) => {
  return patch(`schedulePreventive/get-total-schedule-preventive`, { ...payload });
};
export const createSchedulePreventiveComment = (payload) => {
  return post(`schedulePreventive/create-schedule-preventive-comment`, { ...payload });
};
export const getSchedulePreventiveComments = (payload) => {
  return get(`schedulePreventive/get-schedule-preventive-comment`, { ...payload });
};
export const getDowntimeByShedulePreventiveAssignUser = (id, payload) => {
  return get(`schedulePreventive/get-downtime-by-shedule-preventive-assign-user/` + id, { ...payload });
};