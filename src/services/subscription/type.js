/* eslint-disable no-unreachable */
import userApiClient from "../";

export const catalog = () => {
  // return Promise.resolve([
  //   {
  //     id: 1,
  //     title: "زمانی",
  //   },
  //   {
  //     id: 2,
  //     title: "مصرفی",
  //   },
  // ]);
  return userApiClient.get("/SubscriptionType/Catalog");
};
