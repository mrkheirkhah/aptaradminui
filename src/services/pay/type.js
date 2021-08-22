/* eslint-disable no-unreachable */
import userApiClient from "../";

export const update = (data) => {
  return userApiClient.put("/PayType", data);
};

export const getAll = (data) => {
  // return Promise.resolve({
  //   data: [
  //     {
  //       payTypeID: 3,
  //       title: "درگاه بانکی",
  //       isActive: false,
  //       deleteDate: null,
  //     },
  //     {
  //       payTypeID: 4,
  //       title: "کارت به کارت",
  //       isActive: false,
  //       deleteDate: null,
  //     },
  //   ],
  //   index: 0,
  //   size: 10,
  //   count: 2,
  // });
  return userApiClient.post("/PayType/All", data);
};

export const catalog = () => {
  // return Promise.resolve([
  //   {
  //     id: 2,
  //     title: "تست",
  //   },
  //   {
  //     id: 5,
  //     title: "متلب",
  //   },
  //   {
  //     id: 7,
  //     title: "2متلب1",
  //   },
  //   {
  //     id: 8,
  //     title: "ی2متلب1",
  //   },
  //   {
  //     id: 9,
  //     title: "یس2متلب1",
  //   },
  //   {
  //     id: 11,
  //     title: "matlab.exe",
  //   },
  // ]);
  return userApiClient.get("/PayType/Catalog");
};

export const getOne = (categoryId) => {
  // return Promise.resolve({
  //   payTypeID: 3,
  //   title: "درگاه بانکی",
  //   isActive: false,
  //   deleteDate: null,
  // });
  return userApiClient.get(`/PayType/${categoryId}`);
};
