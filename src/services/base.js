/* eslint-disable no-unreachable */
import userApiClient from "./";

export const getStates = () => {
  // return Promise.resolve({
  //   data: [
  //     {
  //       ID: 1,
  //       Title: "آذربایجان شرقی",
  //     },
  //     {
  //       ID: 2,
  //       Title: "آذربایجان غربی",
  //     },
  //     {
  //       ID: 3,
  //       Title: "اردبیل",
  //     },
  //     {
  //       ID: 4,
  //       Title: "کرمانشاه",
  //     },
  //     {
  //       ID: 5,
  //       Title: "زنجان",
  //     },
  //     {
  //       ID: 6,
  //       Title: "همدان",
  //     },
  //     {
  //       ID: 7,
  //       Title: "قزوین",
  //     },
  //     {
  //       ID: 8,
  //       Title: "مرکزی",
  //     },
  //     {
  //       ID: 9,
  //       Title: "ایلام",
  //     },
  //     {
  //       ID: 10,
  //       Title: "کردستان",
  //     },
  //     {
  //       ID: 11,
  //       Title: "چهارمحال و بختیاری",
  //     },
  //     {
  //       ID: 12,
  //       Title: "کهگیلویه و بویراحمد",
  //     },
  //     {
  //       ID: 13,
  //       Title: "لرستان",
  //     },
  //     {
  //       ID: 14,
  //       Title: "خوزستان",
  //     },
  //     {
  //       ID: 15,
  //       Title: "بوشهر",
  //     },
  //     {
  //       ID: 16,
  //       Title: "هرمزگان",
  //     },
  //     {
  //       ID: 17,
  //       Title: "فارس",
  //     },
  //     {
  //       ID: 18,
  //       Title: "کرمان",
  //     },
  //     {
  //       ID: 19,
  //       Title: "سیستان و بلوچستان",
  //     },
  //     {
  //       ID: 20,
  //       Title: "یزد",
  //     },
  //     {
  //       ID: 21,
  //       Title: "اصفهان",
  //     },
  //     {
  //       ID: 22,
  //       Title: "قم",
  //     },
  //     {
  //       ID: 23,
  //       Title: "تهران",
  //     },
  //     {
  //       ID: 24,
  //       Title: "سمنان",
  //     },
  //     {
  //       ID: 25,
  //       Title: "گیلان",
  //     },
  //     {
  //       ID: 26,
  //       Title: "مازندران",
  //     },
  //     {
  //       ID: 27,
  //       Title: "گلستان",
  //     },
  //     {
  //       ID: 28,
  //       Title: "خراسان شمالی",
  //     },
  //     {
  //       ID: 29,
  //       Title: "خراسان رضوی",
  //     },
  //     {
  //       ID: 30,
  //       Title: "خراسان جنوبی",
  //     },
  //     {
  //       ID: 31,
  //       Title: "البرز",
  //     },
  //   ],
  // });

  return userApiClient.get("/State/Catalog");
};

export const getServers = () => {
  return userApiClient.get("/Base/Servers");
};

export const getColorDepths = () => {
  return userApiClient.get("/ColorDepth/Catalog");
};

export const getLimitTypes = () => {
  return userApiClient.get("/LimitType/Catalog");
};

export const getOrderStatuses = () => {
  return userApiClient.get("/OrderStatus/Catalog");
};

export const getOrderPayTypes = () => {
  return userApiClient.get("/OrderPayType/Catalog");
};
