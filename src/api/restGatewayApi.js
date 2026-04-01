import axios from "axios";
import { baseUrlGateway } from "./config";
import { STORAGE_KEY } from "../utils/constant";
import { useEffect, useState } from "react";
import { Button, Divider, message, notification, Space } from "antd";
const key_message = `open_message_api`;
// import { saveAs } from 'file-saver';
export const HTTP = axios.create({
  baseURL: baseUrlGateway,
  headers: {
    Authorization: "bearer {token}",
  },
})
const getToken = () => {
  let token = localStorage.getItem(STORAGE_KEY.TOKEN);
  if (!token) return null;
  return "Bearer " + token;
};
const headerDefault = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
};
const parseParams = (url, params) => {
  // clear undefind
  Object.keys(params).forEach(key => (params[key] === undefined || params[key] === null || params[key] === "") ? delete params[key] : {});

  const qs = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
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
    className: 'message-loading-api'
  });
  if (!params) {
    params = {}
  };
  // const branchChange = localStorage.getItem(STORAGE_KEY.BRANCH_CHANGE);
  // const _branchs = localStorage.getItem(STORAGE_KEY.BRANCHS);
  // if (branchChange && branchChange != 'all') {
  //   payload.branchs = [branchChange]
  // } else {
  //   payload.branchs = JSON.parse(_branchs)
  // }
  let route = parseParams(url, params);
  const options = { headers };
  return HTTP.get(route, { ...options })
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
    className: 'message-loading-api'
  });
  const headers = {
    authorization: getToken(),
    ...headerDefault,
  };
  const options = { headers };
  let route = url;
  if (!payload) {
    payload = {}
  };
  const companySetting = JSON.parse(localStorage.getItem(STORAGE_KEY.COMPANY_SETTING));
  if (companySetting && companySetting.branchDataHierarchy) {
    const branchChange = localStorage.getItem(STORAGE_KEY.BRANCH_CHANGE);
    const _branchs = localStorage.getItem(STORAGE_KEY.BRANCHS);
    if (branchChange && branchChange != 'all') {
      payload.branchs = [branchChange]
    } else {
      payload.branchs = JSON.parse(_branchs)
    }
  }
  return HTTP.patch(route, payload, { ...options })
    .then((res) => {
      message.destroy(key_message);
      return res.data;
    })
    .catch(catchError);
}
function post(url, payload) {
  message.loading({
    content: "Đang tải dữ liệu",
    duration: 100000,
    top: 0,
    key: key_message,
    className: 'message-loading-api'
  });
  const headers = {
    authorization: getToken(),
    ...headerDefault,
  };
  const options = { headers };
  if (!payload) {
    payload = {}
  };
  const companySetting = JSON.parse(localStorage.getItem(STORAGE_KEY.COMPANY_SETTING));
  if (companySetting && companySetting.branchDataHierarchy) {
    const branchChange = localStorage.getItem(STORAGE_KEY.BRANCH_CHANGE);
    const _branchs = localStorage.getItem(STORAGE_KEY.BRANCHS);
    if (branchChange && branchChange != 'all') {
      payload.branchs = [branchChange]
    } else {
      payload.branchs = JSON.parse(_branchs)
    }
  }
  let route = url;
  return HTTP.post(route, payload, { ...options })
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
    className: 'message-loading-api'
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
  return HTTP.post(_url, formData, { headers })
    .then((res) => {
      message.destroy(key_message);
      return res.data;
    })
    .catch(catchError);
};
function put(url, payload) {
  message.loading({
    content: "Đang tải dữ liệu",
    duration: 100000,
    top: 0,
    key: key_message,
    className: 'message-loading-api'
  });
  const headers = {
    authorization: getToken(),
    ...headerDefault,
  };
  const options = { headers };
  if (!payload) {
    payload = {}
  };
  const branchChange = localStorage.getItem(STORAGE_KEY.BRANCH_CHANGE);
  if (branchChange && branchChange != 'all') {
    payload.branchChange = branchChange
  }
  let route = url;
  return HTTP.put(route, payload, { ...options })
    .then((res) => {
      message.destroy(key_message);
      return res.data;
    })
    .catch(catchError);
}
// function postExport(url, payload, fileName) {
//   let route = url;
//   return HTTP.post(route, payload, { responseType: 'blob', observe: 'response' })
//     .then((res) => {
//       saveToFileSystem(res.data, fileName)
//     })
// }
// const saveToFileSystem = (response, fileName) => {
//   const blob = new Blob([response], { type: 'Blob' });
//   saveAs(blob, fileName);
// }
function deleteRequest(url, params) {
  message.loading({
    content: "Đang tải dữ liệu",
    duration: 100000,
    top: 0,
    key: key_message,
    className: 'message-loading-api'
  });
  const headers = {
    authorization: getToken(),
    ...headerDefault,
  };
  const options = { headers };
  let route = parseParams(url, params);
  return HTTP.delete(route, { ...options })
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

  return HTTP.post(route, payload, { ...options })
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

  return HTTP.post(route, payload, { ...options, responseType: "blob" })
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
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};
HTTP.interceptors.response.use((response) => {
  return response;
});
const useAxiosLoader = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const inc = (mod) => setLoading(false);

    const handleResponse = (response) => (setLoading(false), response);
    const handleRequest = (config) => (setLoading(true), config);
    const handleError = (error) => (setLoading(false), Promise.reject(error));
    const reqInterceptor = HTTP.interceptors.request.use(
      handleRequest,
      handleError
    );
    // add response interceptors
    const resInterceptor = HTTP.interceptors.response.use(
      handleResponse,
      async (error) => {
        const originalRequest = error.config;
        setLoading(false);
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers["Authorization"] = "Bearer " + token;
                return axios(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }
          originalRequest._retry = true;
          // isRefreshing = true;

          // const reToken = localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);
          // return new Promise(function (resolve, reject) {
          //   HTTP.post(
          //     `auth/refresh-token`,
          //     { refreshToken: reToken },
          //     { headers: { authorization: getToken(), ...headerDefault } }
          //   )
          //     .then(({ data }) => {
          //       if (data && data.code == 1) {
          //         localStorage.setItem(STORAGE_KEY.TOKEN, data.token);
          //         //  localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, data.refreshToken);
          //         axios.defaults.headers.common["Authorization"] =
          //           "Bearer " + data.token;
          //         originalRequest.headers["Authorization"] =
          //           "Bearer " + data.token;
          //         processQueue(null, data.token);
          //         resolve(axios(originalRequest));
          //       } else {
          //         localStorage.removeItem(STORAGE_KEY.USER);
          //         localStorage.removeItem(STORAGE_KEY.TOKEN);
          //         // localStorage.removeItem(STORAGE_KEY.PERMISSION);
          //         localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
          //         // window.location.href = "/login";
          //       }
          //     })
          //     .catch((err) => {
          //       processQueue(err, null);
          //       reject(err);
          //     })
          //     .finally(() => {
          //       isRefreshing = false;
          //     });
          // });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      HTTP.interceptors.request.eject(reqInterceptor);
      HTTP.interceptors.response.eject(resInterceptor);
    };
  }, []);
  return loading;
};
export {
  get,
  post,
  put,
  deleteRequest,
  getWithoutAuth,
  postWithoutAuth,
  postFile,
  postDownload,
  patch,
  useAxiosLoader,
  // postExport
  postData,
};
