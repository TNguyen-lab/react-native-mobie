import { get, patch } from "./restApi";
import { baseURL } from "./config";

export const getBreakdownChart = (payload) => {
  return patch(`report/get-breakdown-chart`, { ...payload });
};
export const getApproveWorks = (payload) => {
  return patch(`report/get-approve-work`, { ...payload });
};
export const getSchedulePreventiveChart = (payload) => {
  return patch(`report/get-schedule-preventive-chart`, { ...payload });
};
export const getSchedulePreventiveCompliance = (payload) => {
  return patch(`report/get-schedule-preventive-compliance`, {
    ...payload,
  });
};
export const getBreakdownCompliance = (payload) => {
  return patch(`report/get-breakdown-compliance`, { ...payload });
};
export const getUpTimeAssetMaintenance = (payload) => {
  return patch(`report/get-upTime-assetMaintenance`, { ...payload });
};
export const getSchedulePreventiveVsAssignUser = (payload) => {
  return patch(`report/get-schedule-preventive-vs-assignUser`, {
    ...payload,
  });
};
export const getAverageResponseTimeBreakdown = (payload) => {
  return patch(`report/get-average-response-time`, { ...payload });
};
export const getAverageResolutionTimeBreakdown = (payload) => {
  return patch(`report/get-average-resolution-time`, { ...payload });
};
export const compareStatusSchedulePreventiveAndBreakdownByCustomer = (
  payload,
) => {
  return patch(
    `report/compare-status-schedule-preventive-and-breakdown-by-customer`,
    { ...payload },
  );
};
export const totalOperationalMetrics = (payload) => {
  return patch(`report/total-operational-metrics`, { ...payload });
};
export const getSparePartsUsageSummary = (payload) => {
  return patch(`report/get-spare-usage-summary`, { ...payload });
};
export const getAssetMaintenanceReport = (payload) => {
  return patch(`report/get-assetMaintenance-report`, { ...payload });
};
export const spareMovementReport = (payload) => {
  return patch(`report/get-spare-movement`, { ...payload });
};
export const getMyTicketCalender = (payload) => {
  return get(`report/get-my-ticket-calender`, { ...payload });
};
export const getMyTaskCalender = (payload) => {
  return get(`report/get-my-task-calender`, { ...payload });
};
export const getCalibrationWorkChart = (payload) => {
  return patch("report/get-calibration-work-chart", { ...payload });
};
export const getCalibrationWorkCompliance = (payload) => {
  return patch("report/get-calibration-work-compliance", { ...payload });
};
export const getMyCalibrationCalender = (payload) => {
  return get("report/get-my-calibration-calender", { ...payload });
};