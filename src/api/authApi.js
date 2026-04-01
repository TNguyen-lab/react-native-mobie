import { post, postWithoutAuth } from "./restApi";
import { baseURL } from "./config";
import * as restGateway from "./restGatewayApi";
export const login = (payload) => {
  return restGateway.post(`auth/login`, { ...payload });
};
export const changePassword = (payload) => {
  return post(`auth/change-password`, { ...payload });
};
export const logoutMobile = (payload) => {
  return post(`auth/logout-mobile`, { ...payload });
};
