import { baseURL } from "./config";
import { post, get, patch, deleteRequest } from './restApi';


export const getActivityReportBreakdown = (payload) => {
    return patch(`reportBreakdown/get-activity-report-breakdown`, { ...payload });
}
export const getDetailsReportEngineerPerformanceInBreakdown = (payload) => {
    return patch(`reportBreakdown/get-details-report-engineer-performance-in-breakdown`, { ...payload });
}
export const getSummaryReportEngineerPerformanceInBreakdown = (payload) => {
    return patch(`reportBreakdown/get-summary-report-engineer-performance-in-breakdown`, { ...payload });
}