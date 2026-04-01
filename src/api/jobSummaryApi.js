import { post, get, patch, deleteRequest } from "./restApi";

export const getJobSummary = (payload) => {
  return patch("jobSummary/get-job-summary", { ...payload });
};
