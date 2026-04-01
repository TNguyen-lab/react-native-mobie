import { baseURL } from './config';
import { post, get, patch, deleteRequest } from './restApi';

export const getListSpareParts = (payload) => {
  return get(`spare-parts/list`, { ...payload });
};

export const createSparePart = (payload) => {
  return post(`spare-parts/create`, { ...payload });
};

export const getSparePartById = (payload) => {
  return get(`spare-parts/get-by-id`, { ...payload });
};

export const updateSparePart = (payload) => {
  return patch(`spare-parts/update`, { ...payload });
};

export const updateSparePartStatus = (payload) => {
  return patch(`spare-parts/update-status`, { ...payload });
}

export const getSpareParts = (payload) => {
  return get(`spare-parts/get-all`, { ...payload });
};

export const deleteSparePart = (payload) => {
  return deleteRequest(`spare-parts/delete`, { ...payload });
};

export const getSparePartDetailByQrCode = (payload) => {
  return get(`spare-parts/get-detail-by-qrcode`, { ...payload });
};

export const updateSparePartDetailByQrCode = (payload) => {
  return patch(`spare-parts/update-detail-by-qrcode`, { ...payload });
};