import { baseURL } from './config';
import { post, get, patch, deleteRequest } from './restApi';


export const getDetailsProcecssingSattusSchedulePreventive = (payload) => {
    return patch(`reportSchedulePreventive/get-details-procecssing-sattus-schedule-preventive`, { ...payload });
}
export const getSumaryProcecssingSattusSchedulePreventive = (payload) => {
    return patch(`reportSchedulePreventive/get-sumary-procecssing-sattus-schedule-preventive`, { ...payload });
}
export const getDetailsReportEngineerPerformanceInSchedulePreventive = (payload) => {
    return patch(`reportSchedulePreventive/get-details-report-enginee-performancein-schedulePreventive`, { ...payload });
}
export const getSummaryReportEngineerPerformanceInSchedulePreventive = (payload) => {
    return patch(`reportSchedulePreventive/get-summary-report-enginee-performancein-schedulePreventive`, { ...payload });
}
