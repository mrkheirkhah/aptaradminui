/* eslint-disable no-unreachable */
import userApiClient from "./";

export const getAll = (data) => {
  return userApiClient.post("/Order/All", data);
};

export const add = (data) => {
  return userApiClient.post("/Order", data);
};

export const getOne = (orderId) => {
  return userApiClient.get(`/Order/${orderId}`);
};

export const getDetails = (orderId) => {
  return userApiClient.get(`/Order/Details?orderID=${orderId}`);
};

export const getOptions = (detailId) => {
  return userApiClient.get(`/Order/Options?detailID=${detailId}`);
};

export const invoice = (orderId) => {
  return userApiClient.get(`/Order/Print/${orderId}`);
};
