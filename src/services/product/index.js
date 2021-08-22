/* eslint-disable no-unreachable */
import userApiClient from "../";

export const getAllProducts = (data) => {
  // return Promise.resolve({
  //   data: [
  //     {
  //       productID: 2,
  //       title: "تست",
  //       path: "تست",
  //       parameter: "تستsdvsdf",
  //       categoryID: 4,
  //       isActive: true,
  //       allSoftware: false,
  //       allowExecuteExe: false,
  //       serverID: 1,
  //       hasStock: true,
  //       stock: 100,
  //       price: 1000000,
  //       shortDescription: "",
  //       longDescription: null,
  //       softwareName: null,
  //       softwareInstalledPath: null,
  //       userID: null,
  //       createDate: null,
  //       isDelete: false,
  //       category: null,
  //       server: null,
  //     },
  //     {
  //       productID: 5,
  //       title: "متلب",
  //       path: "c:/NewFolder",
  //       parameter: "config",
  //       categoryID: 2,
  //       isActive: true,
  //       allSoftware: false,
  //       allowExecuteExe: true,
  //       serverID: 1,
  //       hasStock: true,
  //       stock: 10,
  //       price: 100000,
  //       shortDescription: "تست",
  //       longDescription: "تست",
  //       softwareName: null,
  //       softwareInstalledPath: null,
  //       userID: null,
  //       createDate: null,
  //       isDelete: false,
  //       category: null,
  //       server: null,
  //     },
  //     {
  //       productID: 7,
  //       title: "2متلب1",
  //       path: "c:/NewFolder",
  //       parameter: "config",
  //       categoryID: 2,
  //       isActive: true,
  //       allSoftware: false,
  //       allowExecuteExe: true,
  //       serverID: 1,
  //       hasStock: true,
  //       stock: 10,
  //       price: 0,
  //       shortDescription: "تست",
  //       longDescription: null,
  //       softwareName: null,
  //       softwareInstalledPath: null,
  //       userID: null,
  //       createDate: null,
  //       isDelete: false,
  //       category: null,
  //       server: null,
  //     },
  //     {
  //       productID: 8,
  //       title: "ی2متلب1",
  //       path: null,
  //       parameter: "config",
  //       categoryID: 2,
  //       isActive: true,
  //       allSoftware: false,
  //       allowExecuteExe: true,
  //       serverID: 1,
  //       hasStock: true,
  //       stock: 10,
  //       price: 0,
  //       shortDescription: "تست",
  //       longDescription: null,
  //       softwareName: null,
  //       softwareInstalledPath: null,
  //       userID: null,
  //       createDate: null,
  //       isDelete: false,
  //       category: null,
  //       server: null,
  //     },
  //     {
  //       productID: 9,
  //       title: "یس2متلب1",
  //       path: null,
  //       parameter: null,
  //       categoryID: 2,
  //       isActive: true,
  //       allSoftware: false,
  //       allowExecuteExe: true,
  //       serverID: 1,
  //       hasStock: true,
  //       stock: 10,
  //       price: 0,
  //       shortDescription: "تست",
  //       longDescription: null,
  //       softwareName: null,
  //       softwareInstalledPath: null,
  //       userID: null,
  //       createDate: null,
  //       isDelete: false,
  //       category: null,
  //       server: null,
  //     },
  //     {
  //       productID: 11,
  //       title: "matlab.exe",
  //       path: "c:\\program files\\matlab\\r2014a\\bin",
  //       parameter: "",
  //       categoryID: null,
  //       isActive: true,
  //       allSoftware: false,
  //       allowExecuteExe: false,
  //       serverID: 1035,
  //       hasStock: false,
  //       stock: 0,
  //       price: 0,
  //       shortDescription: null,
  //       longDescription: null,
  //       softwareName: "matlab.exe",
  //       softwareInstalledPath: "c:\\program files\\matlab\\r2014a\\bin",
  //       userID: null,
  //       createDate: null,
  //       isDelete: false,
  //       category: null,
  //       server: null,
  //     },
  //   ],
  //   index: 0,
  //   size: 10,
  //   count: 6,
  // });

  return userApiClient.post("/Product/All", data);
};

export const getProduct = (productId) => {
  // return Promise.resolve({
  //   data: {
  //     productID: 2,
  //     title: "تست",
  //     path: "تست",
  //     parameter: "تستsdvsdf",
  //     categoryID: 4,
  //     isActive: true,
  //     allSoftware: false,
  //     allowExecuteExe: false,
  //     serverID: 1,
  //     hasStock: true,
  //     stock: 100,
  //     price: 1000000,
  //     shortDescription: "",
  //     longDescription: null,
  //     softwareName: null,
  //     softwareInstalledPath: null,
  //     userID: null,
  //     createDate: null,
  //     isDelete: false,
  //     category: null,
  //     server: null,
  //   },
  // });

  return userApiClient.get(`/Product/${productId}`);
};

export const addProduct = (data) => {
  return userApiClient.post("/Product", data);
};

export const updateProduct = (data) => {
  return userApiClient.put("/Product", data);
};

export const deleteProduct = (data) => {
  return userApiClient.delete("/Product", data);
};

export const catalog = () => {
  return userApiClient.get("/Product/Catalog");
};
