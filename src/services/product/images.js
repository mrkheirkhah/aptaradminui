/* eslint-disable no-unreachable */
import userApiClient from "../";

export const catalog = () => {
  return userApiClient.get("/ProductImage/Catalog");
};

export const getOne = (productId) => {
  return userApiClient.get(`/ProductImage/All`, {
    params: { productID: productId },
  });
};

export const getAll = (productId) => {
  return userApiClient.get("/ProductImage/All", {
    params: { productID: productId },
  });
};

export const remove = (data) => {
  return userApiClient.delete("/ProductImage", data);
};

export const add = (data) => {
  return userApiClient.post("/ProductImage/Upload", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
