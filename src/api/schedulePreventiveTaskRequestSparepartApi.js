import { post, get, patch, deleteRequest } from "./restApi";
import { baseURL } from "./config";

export const createSchedulePreventiveSparePartRequest = (payload) => {
  return post(`schedulePreventiveTaskRequestSparepart/create`, {
    ...payload,
  });
};
export const getListSchedulePrevetiveTaskSparePartRequests = (payload) => {
  return patch(`schedulePreventiveTaskRequestSparepart/get-list`, {
    ...payload,
  });
};
export const getScheduleePreventiveRequestSparePartById = (payload) => {
  return patch(`schedulePreventiveTaskRequestSparepart/get-schedule-preventive-request-spare-part-by-id`, {
    ...payload,
  });
};
export const comfirmSendSparePart = (payload) => {
  return patch(
    `schedulePreventiveTaskRequestSparepart/comfirm-send-spare-part`,
    {
      ...payload,
    }
  );
};
