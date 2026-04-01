import { baseURL } from './config';
import { post, get, patch, deleteRequest } from './restApi';

export const getReportAssetMaintenanceRequest = (payload) => {
    return patch(`reportBreakdownSchedulePreventive/get-report-assetMaintenance-request`, { ...payload });
}
