/* eslint-disable no-unreachable */
import userApiClient from "./";

export const add = (data) => {
  return userApiClient.post("​/Category", data);
};

export const update = (data) => {
  return userApiClient.put("​/Category", data);
};

export const remove = (data) => {
  return userApiClient.delete("​/Category", data);
};

export const getAll = (data) => {
  // return Promise.resolve({
  //   data: [
  //     {
  //       categoryID: 1,
  //       title: "آمار و ریاضی",
  //       isActive: true,
  //       deleteDate: null,
  //     },
  //     {
  //       categoryID: 2,
  //       title: "مهندسی",
  //       isActive: true,
  //       deleteDate: null,
  //     },
  //     {
  //       categoryID: 3,
  //       title: "طراحی سه بعدی",
  //       isActive: true,
  //       deleteDate: null,
  //     },
  //     {
  //       categoryID: 4,
  //       title: "مذهبی",
  //       isActive: true,
  //       deleteDate: null,
  //     },
  //   ],
  //   index: 0,
  //   size: 10,
  //   count: 4,
  // });
  return userApiClient.post("/Category/All", data);
};

export const catalog = () => {
  // return Promise.resolve([
  //   {
  //     id: 1,
  //     title: "آمار و ریاضی",
  //   },
  //   {
  //     id: 2,
  //     title: "مهندسی",
  //   },
  //   {
  //     id: 3,
  //     title: "طراحی سه بعدی",
  //   },
  //   {
  //     id: 4,
  //     title: "مذهبی",
  //   },
  // ]);
  return userApiClient.get("/Category​/Catalog");
};

export const getOne = (categoryId) => {
  // return Promise.resolve({
  //   categoryID: 1,
  //   title: "آمار و ریاضی",
  //   isActive: true,
  //   deleteDate: null,
  // });
  return userApiClient.get(`/Category/${categoryId}`);
};
