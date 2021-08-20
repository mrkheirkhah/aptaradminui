/* eslint-disable no-unreachable */
import userApiClient from "../";

export const add = (data) => {
  return userApiClient.post("​/Option/All", data);
};

export const update = (data) => {
  return userApiClient.put("​/Option", data);
};

export const remove = (data) => {
  return userApiClient.delete("​/Option", data);
};

export const getAll = (data) => {
  // return Promise.resolve({
  //   data: [
  //     {
  //       optionID: 1,
  //       title: "دو هسته ای",
  //       optionTypeID: 1,
  //       value: 2,
  //       isActive: true,
  //       deleteDate: null,
  //       optionType: null,
  //     },
  //     {
  //       optionID: 2,
  //       title: "چهار هسته ای",
  //       optionTypeID: 1,
  //       value: 4,
  //       isActive: true,
  //       deleteDate: null,
  //       optionType: null,
  //     },
  //     {
  //       optionID: 3,
  //       title: "هشت هسته ای",
  //       optionTypeID: 1,
  //       value: 8,
  //       isActive: true,
  //       deleteDate: null,
  //       optionType: null,
  //     },
  //     {
  //       optionID: 4,
  //       title: "هشت گیگ بایت",
  //       optionTypeID: 2,
  //       value: 8,
  //       isActive: true,
  //       deleteDate: null,
  //       optionType: null,
  //     },
  //     {
  //       optionID: 5,
  //       title: "شانزده گیگ بایت",
  //       optionTypeID: 2,
  //       value: 16,
  //       isActive: true,
  //       deleteDate: null,
  //       optionType: null,
  //     },
  //     {
  //       optionID: 6,
  //       title: "سی و دو گیگ بایت",
  //       optionTypeID: 2,
  //       value: 32,
  //       isActive: true,
  //       deleteDate: null,
  //       optionType: null,
  //     },
  //     {
  //       optionID: 10,
  //       title: "سی و دو هسته",
  //       optionTypeID: 1,
  //       value: 30220,
  //       isActive: true,
  //       deleteDate: null,
  //       optionType: null,
  //     },
  //     {
  //       optionID: 12,
  //       title: "test1",
  //       optionTypeID: 1,
  //       value: 322,
  //       isActive: false,
  //       deleteDate: null,
  //       optionType: null,
  //     },
  //     {
  //       optionID: 14,
  //       title: "test",
  //       optionTypeID: 1,
  //       value: 322,
  //       isActive: true,
  //       deleteDate: null,
  //       optionType: null,
  //     },
  //   ],
  //   index: 0,
  //   size: 10,
  //   count: 9,
  // });
  return userApiClient.post("/Option/All", data);
};

export const catalog = () => {
  // return Promise.resolve([
  //   {
  //     id: 1,
  //     title: "دو هسته ای",
  //   },
  //   {
  //     id: 2,
  //     title: "چهار هسته ای",
  //   },
  //   {
  //     id: 3,
  //     title: "هشت هسته ای",
  //   },
  //   {
  //     id: 4,
  //     title: "هشت گیگ بایت",
  //   },
  //   {
  //     id: 5,
  //     title: "شانزده گیگ بایت",
  //   },
  //   {
  //     id: 6,
  //     title: "سی و دو گیگ بایت",
  //   },
  //   {
  //     id: 10,
  //     title: "سی و دو هسته",
  //   },
  //   {
  //     id: 14,
  //     title: "test",
  //   },
  // ]);
  return userApiClient.get("/Option​/Catalog");
};

export const getOne = (optionId) => {
  // return Promise.resolve({
  //   optionID: 1,
  //   title: "دو هسته ای",
  //   optionTypeID: 1,
  //   value: 2,
  //   isActive: true,
  //   deleteDate: null,
  //   optionType: null,
  // });
  return userApiClient.get(`/Option/${optionId}`);
};
