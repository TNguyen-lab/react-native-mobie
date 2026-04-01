import axios from "axios";
import { baseUrlGateway } from "./config";
import * as storage from "./storage";
import { triggerUnauthorized } from "./authCallback";

export const HTTP = axios.create({
  baseURL: baseUrlGateway,
  headers: {
    Authorization: "bearer {token}",
  },
});

const getToken = () => {
  const token = storage.getToken();
  if (!token) return null;
  return "Bearer " + token;
};

const headerDefault = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
};

const parseParams = (url, params) => {
  Object.keys(params).forEach(
    (key) =>
      (params[key] === undefined || params[key] === null || params[key] === "") &&
      delete params[key],
  );
  const qs = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join("&");
  return url + "?" + qs;
};

function get(url, params) {
  const headers = {
    authorization: getToken(),
    ...headerDefault,
  };
  if (!params) {
    params = {};
  }
  let route = parseParams(url, params);
  const options = { headers };
  return HTTP.get(route, { ...options })
    .then((res) => res.data)
    .catch(catchError);
}

function patch(url, payload) {
  const headers = {
    authorization: getToken(),
    ...headerDefault,
  };
  const options = { headers };
  let route = url;
  if (!payload) {
    payload = {};
  }
  const companySetting = storage.getCompanySetting();
  if (companySetting && companySetting.branchDataHierarchy) {
    const branchChange = storage.getBranchChange();
    const branchs = storage.getBranchs();
    if (branchChange && branchChange !== "all") {
      payload.branchs = [branchChange];
    } else {
      payload.branchs = branchs;
    }
  }
  return HTTP.patch(route, payload, { ...options })
    .then((res) => res.data)
    .catch(catchError);
}

function post(url, payload) {
  const headers = {
    authorization: getToken(),
    ...headerDefault,
  };
  const options = { headers };
  if (!payload) {
    payload = {};
  }
  const companySetting = storage.getCompanySetting();
  if (companySetting && companySetting.branchDataHierarchy) {
    const branchChange = storage.getBranchChange();
    const branchs = storage.getBranchs();
    if (branchChange && branchChange !== "all") {
      payload.branchs = [branchChange];
    } else {
      payload.branchs = branchs;
    }
  }
  let route = url;
  return HTTP.post(route, payload, { ...options })
    .then((res) => res.data)
    .catch(catchError);
}

const postData = (_url, _body) => {
  let formData;
  if (_body instanceof FormData) {
    formData = _body;
  } else {
    formData = new FormData();
    Object.keys(_body).forEach((key) => {
      formData.append(key, _body[key]);
    });
  }
  const headers = {
    authorization: getToken(),
  };
  return HTTP.post(_url, formData, { headers })
    .then((res) => res.data)
    .catch(catchError);
};

function put(url, payload) {
  const headers = {
    authorization: getToken(),
    ...headerDefault,
  };
  const options = { headers };
  if (!payload) {
    payload = {};
  }
  const branchChange = storage.getBranchChange();
  if (branchChange && branchChange !== "all") {
    payload.branchChange = branchChange;
  }
  let route = url;
  return HTTP.put(route, payload, { ...options })
    .then((res) => res.data)
    .catch(catchError);
}

function deleteRequest(url, params) {
  const headers = {
    authorization: getToken(),
    ...headerDefault,
  };
  const options = { headers };
  let route = parseParams(url, params || {});
  return HTTP.delete(route, { ...options })
    .then((res) => res.data)
    .catch(catchError);
}

function getWithoutAuth(url, params) {
  const headers = {
    ...headerDefault,
  };
  const options = { headers };
  let route = parseParams(url, params || {});
  return HTTP.get(route, { ...options })
    .then((res) => res.data)
    .catch(catchError);
}

function postWithoutAuth(url, payload) {
  const headers = {
    ...headerDefault,
  };
  const options = { headers };
  let route = url;
  return HTTP.post(route, payload, { ...options })
    .then((res) => res.data)
    .catch(catchError);
}

function postFile(url, payload, access_token = getToken()) {
  const headers = {
    authorization: access_token,
    "Content-Type": "multipart/form-data",
  };
  const route = url;
  const options = { headers };
  return HTTP.post(route, payload, { ...options })
    .then((res) => res.data)
    .catch(catchError);
}

function catchError(err) {
  if (err.response?.status === 401) {
    storage.clearAll();
    triggerUnauthorized();
  }
  if (err.name !== "AbortError") {
    console.error("API Error:", err.response?.data?.message || err.message);
  }
}

export {
  get,
  post,
  put,
  deleteRequest,
  getWithoutAuth,
  postWithoutAuth,
  postFile,
  postData,
  patch,
};

