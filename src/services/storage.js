/* eslint-disable no-unreachable */
import userApiClient from "./";

export const add = (data) => {
  return userApiClient.post("/Storage", data);
};

export const update = (data) => {
  return userApiClient.put("/Storage", data);
};

export const remove = (data) => {
  return userApiClient.delete("/Storage", data);
};

export const getAll = (data) => {
  return userApiClient.post("/Storage/All", data);
};

export const catalog = () => {
  return userApiClient.get("/Storage/Catalog");
};

export const getOne = (storageId) => {
  return userApiClient.get(`/Storage/${storageId}`);
};
