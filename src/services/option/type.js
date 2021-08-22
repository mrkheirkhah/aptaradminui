/* eslint-disable no-unreachable */
import userApiClient from "../";

export const add = (data) => {
  return userApiClient.post("/OptionType", data);
};

export const update = (data) => {
  return userApiClient.put("/OptionType", data);
};

export const remove = (data) => {
  return userApiClient.delete("/OptionType", data);
};

export const getAll = (data) => {
  // return Promise.resolve({
  //   data: [
  //     {
  //       optionTypeID: 1,
  //       title: "CPU",
  //       deleteDate: null,
  //     },
  //     {
  //       optionTypeID: 2,
  //       title: "Ram",
  //       deleteDate: null,
  //     },
  //     {
  //       optionTypeID: 4,
  //       title: "Hard Disk",
  //       deleteDate: null,
  //     },
  //   ],
  //   index: 0,
  //   size: 10,
  //   count: 3,
  // });
  return userApiClient.post("/OptionType/All", data);
};

export const catalog = () => {
  // return Promise.resolve([
  //   {
  //     id: 1,
  //     title: "CPU",
  //   },
  //   {
  //     id: 2,
  //     title: "Ram",
  //   },
  //   {
  //     id: 4,
  //     title: "Hard Disk",
  //   },
  // ]);
  return userApiClient.get("/OptionType/Catalog");
};

export const getOne = (optionTypeId) => {
  // return Promise.resolve({
  //   data: {
  //     optionTypeID: 1,
  //     title: "CPU",
  //     deleteDate: null,
  //   },
  // });

  return userApiClient.get(`/OptionType/${optionTypeId}`);
};
