/* eslint-disable no-unreachable */
import userApiClient from "../";

export const add = (data) => {
  return userApiClient.post("/Subscription", data);
};

export const update = (data) => {
  return userApiClient.put("/Subscription", data);
};

export const remove = (data) => {
  return userApiClient.delete("/Subscription", data);
};

export const getAll = (data) => {
  // return Promise.resolve({
  //   data: [
  //     {
  //       subscriptionID: 1,
  //       title: "یک ماهه",
  //       subscriptionTypeID: 2,
  //       value: 42,
  //       isActive: true,
  //       deleteDate: null,
  //       subscriptionType: null,
  //     },
  //     {
  //       subscriptionID: 2,
  //       title: "سه ماهه",
  //       subscriptionTypeID: 1,
  //       value: 0,
  //       isActive: true,
  //       deleteDate: null,
  //       subscriptionType: null,
  //     },
  //     {
  //       subscriptionID: 14,
  //       title: "شش ماهه",
  //       subscriptionTypeID: 1,
  //       value: 0,
  //       isActive: true,
  //       deleteDate: null,
  //       subscriptionType: null,
  //     },
  //   ],
  //   index: 0,
  //   size: 10,
  //   count: 3,
  // });
  return userApiClient.post("/Subscription/All", data);
};

export const catalog = () => {
  // return Promise.resolve([
  //   {
  //     id: 1,
  //     title: "یک ماهه",
  //   },
  //   {
  //     id: 2,
  //     title: "سه ماهه",
  //   },
  //   {
  //     id: 14,
  //     title: "شش ماهه",
  //   },
  // ]);
  return userApiClient.get("/Subscription/Catalog");
};

export const getOne = (subscriptionId) => {
  // return Promise.resolve({
  //   subscriptionID: 1,
  //   title: "یک ماهه",
  //   subscriptionTypeID: 2,
  //   value: 42,
  //   isActive: true,
  //   deleteDate: null,
  //   subscriptionType: null,
  // });
  return userApiClient.get(`/Subscription/${subscriptionId}`);
};
