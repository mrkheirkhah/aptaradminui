/* eslint-disable no-unreachable */
import userApiClient from "../";

export const getAll = (data) => {
  return userApiClient.post("/Profile/All", data);
};

export const catalog = () => {
  return userApiClient.get("/Profile/Catalog");
};

export const getOne = (profileId) => {
  return userApiClient.get(`/Profile/${profileId}`);
};

export const add = (data) => {
  return userApiClient.post("/Profile", data);
};

export const update = (data) => {
  return userApiClient.put("/Profile", data);
};

export const remove = (data) => {
  return userApiClient.delete("/Profile", data);
};
