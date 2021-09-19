/* eslint-disable no-unreachable */
import userApiClient from "../";

export const getAll = (data) => {
  return userApiClient.post("/ProfilePerson/All", data);
};

export const getOne = (profilePersonId) => {
  return userApiClient.get(`/ProfilePerson/${profilePersonId}`);
};

export const add = (data) => {
  return userApiClient.post("/ProfilePerson", data);
};

export const update = (data) => {
  return userApiClient.put("/ProfilePerson", data);
};

export const remove = () => {};
