/* eslint-disable no-unreachable */
import userApiClient from "../";

export const getAllProductsImages = (productId) => {
  return Promise.resolve([
    {
      id: 8,
      title: "5_3.png",
      thumbnail: "/api/productImage/5_3.png",
    },
  ]);
  return userApiClient.get(`/ProductImage/All?productID=${productId}`);
};

export const getAllProductsImagesCataolog = (data) => {
  return Promise.resolve([
    {
      id: 1,
      title: "تصویر",
    },
    {
      id: 2,
      title: "تصویر کوچک",
    },
    {
      id: 3,
      title: "آیکون",
    },
  ]);
  return userApiClient.get("/ProductImage/Catalog", data);
};

export const getProductImage = (fileName) => {
  return Promise.resolve();

  return userApiClient.get(
    `http://admin.aptar.ir/api/ProductImage/${fileName}`
  );
};

export const addPerson = (data) => {
  // { fileOption, id, file, priority }
  return userApiClient.post("​/ProductImage/Upload", data);
};

export const deleteProductImage = (data) => {
  return userApiClient.delete("​/ProductImage", data);
};
