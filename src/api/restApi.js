import { notification, message } from "antd";
import axios from "axios";
import { baseURL } from "./config";
import { STORAGE_KEY } from "../utils/constant";
const getToken = () => {
  let token = localStorage.getItem(STORAGE_KEY.TOKEN);
  if (!token) return null;
  return "Bearer " + token;
};
const key_message = `open_message_api`;
const headerDefault = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
};

export const generateFullUrl = (_) => {
  var companyStorage = localStorage.getItem(STORAGE_KEY.COMPANY);
  var _baseUrl = baseURL;
  if (companyStorage) {
    var companyJson = JSON.parse(companyStorage);
    _baseUrl = companyJson?.baseUrl ?? baseURL;
    _baseUrl += "/medicmms_gw/" + companyJson?.port + "/v1/";
    // _baseUrl = baseURL;
  }

  if (_) {
    _baseUrl += _;
  }
  return _baseUrl;
};

export const HTTP = () => {
  return axios.create({
    baseURL: generateFullUrl(),
    headers: {
      Authorization: "bearer {token}",
    },
  });
};
const parseParams = (url, params) => {
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
  message.loading({
    content: "Đang tải dữ liệu",
    duration: 100000,
    top: 0,
    key: key_message,
    className: "message-loading-api",
  });
  if (!params) {
    params = {};
  }
  // const branchChange = localStorage.getItem(STORAGE_KEY.BRANCH_CHANGE);
  // const _branchs = localStorage.getItem(STORAGE_KEY.BRANCHS);
  // if (branchChange && branchChange != 'all') {
  //   payload.branchs = [branchChange]
  // } else {
  //   payload.branchs = JSON.parse(_branchs)
  // }
  let route = parseParams(url, params);
  const options = { headers };
  return HTTP()
    .get(route, { ...options })
    .then((res) => {
      message.destroy(key_message);
      return res.data;
    })
    .catch(catchError);
}
const postData = (_url, _body) => {
  message.loading({
    content: "Đang tải dữ liệu",
    duration: 100000,
    top: 0,
    key: key_message,
    className: "message-loading-api",
  });
  let formData;
  if (_body instanceof FormData) {
    formData = _body; // dùng luôn nếu là FormData thật
  } else {
    formData = new FormData();
    Object.keys(_body).forEach((key) => {
      formData.append(key, _body[key]);
    });
  }
  const headers = {
    authorization: getToken(),
    // Không set Content-Type, axios sẽ tự động set khi dùng FormData
  };
  return HTTP()
    .post(_url, formData, { headers })
    .then((res) => {
      message.destroy(key_message);
      return res.data;
    })
    .catch(catchError);
};
// async function post(
//   route,
//   payload = {},
//   params = {},
//   signal,
//   access_token = getToken()
// ) {
//   message.loading({
//     content: "Đang tải dữ liệu",
//     duration: 100000,
//     top: 0,
//     key: key_message,
//     className: 'message-loading-api'
//   });
//   const companySetting = JSON.parse(localStorage.getItem(STORAGE_KEY.COMPANY_SETTING));
//   if (companySetting && companySetting.branchDataHierarchy) {
//     const branchChange = localStorage.getItem(STORAGE_KEY.BRANCH_CHANGE);
//     const _branchs = localStorage.getItem(STORAGE_KEY.BRANCHS);
//     if (branchChange && branchChange != 'all') {
//       payload.branchs = [branchChange]
//     } else {
//       payload.branchs = JSON.parse(_branchs)
//     }
//   }
//   let res = await postData2(route, payload, params, signal, access_token);
//   message.destroy(key_message);
//   return res;
// }
function post(url, payload) {
  message.loading({
    content: "Đang tải dữ liệu",
    duration: 100000,
    top: 0,
    key: key_message,
    className: "message-loading-api",
  });
  const headers = {
    authorization: getToken(),
    ...headerDefault,
  };
  const options = { headers };
  if (!payload) {
    payload = {};
  }
  const companySetting = JSON.parse(
    localStorage.getItem(STORAGE_KEY.COMPANY_SETTING),
  );
  if (companySetting && companySetting.branchDataHierarchy) {
    const branchChange = localStorage.getItem(STORAGE_KEY.BRANCH_CHANGE);
    const _branchs = localStorage.getItem(STORAGE_KEY.BRANCHS);
    if (branchChange && branchChange != "all") {
      payload.branchs = [branchChange];
    } else {
      payload.branchs = JSON.parse(_branchs);
    }
  }
  let route = url;
  return HTTP()
    .post(route, payload, { ...options })
    .then((res) => {
      message.destroy(key_message);
      return res.data;
    })
    .catch(catchError);
}
function postData2(
  route,
  payload = {},
  params = {},
  signal,
  access_token = getToken(),
) {
  const headers = {
    authorization: access_token,
    ...headerDefault,
  };
  const url = parseParams(route, params);
  const options = { headers };
  if (signal) options.signal = signal;
  return fetch(url, {
    method: "POST",
    ...options,
    body: JSON.stringify(payload),
  })
    .then(handleStatus)
    .catch(catchError);
}

function put(url, payload) {
  message.loading({
    content: "Đang tải dữ liệu",
    duration: 100000,
    top: 0,
    key: key_message,
    className: "message-loading-api",
  });
  const headers = {
    authorization: getToken(),
    ...headerDefault,
  };
  const options = { headers };
  if (!payload) {
    payload = {};
  }
  const branchChange = localStorage.getItem(STORAGE_KEY.BRANCH_CHANGE);
  if (branchChange && branchChange != "all") {
    payload.branchChange = branchChange;
  }
  let route = url;
  return HTTP()
    .put(route, payload, { ...options })
    .then((res) => {
      message.destroy(key_message);
      return res.data;
    })
    .catch(catchError);
}
function patch(url, payload) {
  message.loading({
    content: "Đang tải dữ liệu",
    duration: 100000,
    top: 0,
    key: key_message,
    className: "message-loading-api",
  });
  const headers = {
    authorization: getToken(),
    ...headerDefault,
  };
  const options = { headers };
  let route = url;
  if (!payload) {
    payload = {};
  }
  const companySetting = JSON.parse(
    localStorage.getItem(STORAGE_KEY.COMPANY_SETTING),
  );
  if (companySetting && companySetting.branchDataHierarchy) {
    const branchChange = localStorage.getItem(STORAGE_KEY.BRANCH_CHANGE);
    const _branchs = localStorage.getItem(STORAGE_KEY.BRANCHS);
    if (branchChange && branchChange != "all") {
      payload.branchs = [branchChange];
    } else {
      payload.branchs = JSON.parse(_branchs);
    }
  }
  return HTTP()
    .patch(route, payload, { ...options })
    .then((res) => {
      message.destroy(key_message);
      return res.data;
    })
    .catch(catchError);
}
function deleteRequest(url, params) {
  message.loading({
    content: "Đang tải dữ liệu",
    duration: 100000,
    top: 0,
    key: key_message,
    className: "message-loading-api",
  });
  const headers = {
    authorization: getToken(),
    ...headerDefault,
  };
  const options = { headers };
  let route = parseParams(url, params);
  return HTTP()
    .delete(route, { ...options })
    .then((res) => {
      message.destroy(key_message);
      return res.data;
    })
    .catch(catchError);
}

function getWithoutAuth(url, params) {
  const headers = {
    ...headerDefault,
  };
  const options = { headers };
  let route = parseParams(url, params);
  return HTTP()
    .get(route, { ...options })
    .then((res) => res.data)
    .catch(catchError);
}
function postWithoutAuth(url, payload) {
  const headers = {
    ...headerDefault,
  };
  const options = { headers };
  let route = url;
  return HTTP()
    .post(route, payload, { ...options })
    .then((res) => {
      message.destroy(key_message);
      return res.data;
    })
    .catch(catchError);
}
function postFile(url, payload, access_token = getToken()) {
  const headers = {
    authorization: access_token,
    "Content-Type": "multipart/form-data",
  };
  const route = url;
  const options = { headers };

  return HTTP()
    .post(route, payload, { ...options })
    .then((res) => {
      message.destroy(key_message);
      return res.data;
    })
    .catch(catchError);
}
function postDownload(url, payload, filename, access_token = getToken()) {
  const headers = {
    authorization: access_token,
    ...headerDefault,
  };
  const route = url;
  const options = { headers };

  return HTTP()
    .post(route, payload, { ...options, responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
    .catch(catchError);
}
function catchError(err) {
  if (err.response?.data?.message) {
    notification.error({
      message: "Thông báo",
      description: err.response.data.message,
      placement: "topRight",
    });
  } else {
    notification.error({
      message: "Thông báo",
      description: "Có lỗi xảy ra, vui lòng kiểm tra lại!",
      placement: "topRight",
    });
  }
  message.destroy(key_message);
  if (window.location.pathname !== "/login") {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
  }
  if (err.name === "AbortError") {
    console.log("Request aborted");
  } else {
    // throw err;
  }
}

function handleStatus(res) {
  message.destroy(key_message);
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    throw new Error(res.statusText);
  } else {
    return res.json();
  }
}

export {
  get,
  post,
  put,
  deleteRequest,
  getWithoutAuth,
  postWithoutAuth,
  patch,
  postData,
};
