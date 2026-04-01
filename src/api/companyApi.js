import { post, get, patch, deleteRequest } from "./restApi";
import * as restGateway from "./restGatewayApi";

export const getCompanyByCode = (payload) => {
  return restGateway.get(`company/get-company-by-code`, { ...payload });
};
