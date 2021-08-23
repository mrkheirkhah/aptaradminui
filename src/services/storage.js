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
  // return Promise.resolve({
  //   data: [
  //     {
  //       storageID: 1,
  //       title: "5   گیگابایت",
  //       price: "2999",
  //       value: "5368709120",
  //       enable: 1,
  //       timePeriod: 1,
  //       createDate: "2021-01-01T00:00:00",
  //       userID: 1,
  //       deleteDate: null,
  //       user: null,
  //     },
  //     {
  //       storageID: 2,
  //       title: "10   گیگابایت",
  //       price: "3999",
  //       value: "10737418240",
  //       enable: 1,
  //       timePeriod: 1,
  //       createDate: "2021-01-01T00:00:00",
  //       userID: 1,
  //       deleteDate: null,
  //       user: null,
  //     },
  //     {
  //       storageID: 3,
  //       title: "20  گیگابایت",
  //       price: "6999",
  //       value: "21474836480",
  //       enable: 1,
  //       timePeriod: 1,
  //       createDate: "2021-01-01T00:00:00",
  //       userID: 1,
  //       deleteDate: null,
  //       user: null,
  //     },
  //     {
  //       storageID: 4,
  //       title: "100 گیگابایت",
  //       price: "19999",
  //       value: "107374182400",
  //       enable: 1,
  //       timePeriod: 1,
  //       createDate: "2021-01-01T00:00:00",
  //       userID: 1,
  //       deleteDate: null,
  //       user: null,
  //     },
  //     {
  //       storageID: 5,
  //       title: "200 گیگ",
  //       price: "100000",
  //       value: "2000000",
  //       enable: 1,
  //       timePeriod: 1,
  //       createDate: null,
  //       userID: null,
  //       deleteDate: null,
  //       user: null,
  //     },
  //     {
  //       storageID: 6,
  //       title: "200 گیگ",
  //       price: "100000",
  //       value: "2000000",
  //       enable: 1,
  //       timePeriod: 1,
  //       createDate: null,
  //       userID: null,
  //       deleteDate: null,
  //       user: null,
  //     },
  //     {
  //       storageID: 7,
  //       title: "200 گیگ",
  //       price: "یسبسیب",
  //       value: "2000000",
  //       enable: 1,
  //       timePeriod: 1,
  //       createDate: null,
  //       userID: null,
  //       deleteDate: null,
  //       user: null,
  //     },
  //   ],
  //   index: 0,
  //   size: 10,
  //   count: 7,
  // });
  return userApiClient.post("/Storage/All", data);
};

export const catalog = () => {
  // return Promise.resolve([
  //   {
  //     id: 1,
  //     title: "5   گیگابایت",
  //   },
  //   {
  //     id: 2,
  //     title: "10   گیگابایت",
  //   },
  //   {
  //     id: 3,
  //     title: "20  گیگابایت",
  //   },
  //   {
  //     id: 4,
  //     title: "100 گیگابایت",
  //   },
  //   {
  //     id: 5,
  //     title: "200 گیگ",
  //   },
  //   {
  //     id: 6,
  //     title: "200 گیگ",
  //   },
  //   {
  //     id: 7,
  //     title: "200 گیگ",
  //   },
  // ]);
  return userApiClient.get("/Storage/Catalog");
};

export const getOne = (storageId) => {
  // return Promise.resolve({
  //   storageID: 1,
  //   title: "5   گیگابایت",
  //   price: "2999",
  //   value: "5368709120",
  //   enable: 1,
  //   timePeriod: 1,
  //   createDate: "2021-01-01T00:00:00",
  //   userID: 1,
  //   deleteDate: null,
  //   user: null,
  // });
  return userApiClient.get(`/Storage/${storageId}`);
};
