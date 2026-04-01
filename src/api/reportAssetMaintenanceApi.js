import { baseURL } from './config';
import { get, patch } from './restApi';

export const getSummaryReportAssetPerformance = (payload) => {
    return patch(`reportAssetMaintenance/get-summary-report-asset-performance`, { ...payload });
}
export const getDetailsReportAssetPerformance = (payload) => {
    return patch(`reportAssetMaintenance/get-details-report-asset-performance`, { ...payload });
}
