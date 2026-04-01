import { get, patch } from './restApi';

export const getAssetDepreciationReport = (payload) => {
    return patch('reportAssetDepreciation/get-report', { ...payload });
}
export const getDetailAssetDepreciationReport = (payload) => {
    return patch('reportAssetDepreciation/get-detail-report', { ...payload });
}
