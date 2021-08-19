import Store from "../store/index";
import Router from "../router";
import { changeObjKeysFromPascalToCamel } from "../utils";

export const addAxiosInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use((request) => {
    return request;
  });

  // doing something with the response
  axiosInstance.interceptors.response.use(
    (response) => {
      const { status, statusText } = response;
      Store.dispatch(
        "addAlert",
        {
          messageHeader: getToastHeaderBasedOnStatusCode(status),
          type: getToastColorBasedOnStatusCode(status),
          messageBody: getToastMessageBasedOnStatusCode(status) || statusText,
          autoHide: true,
          timeout: 3000,
        },
        { root: true }
      );
      response.data = changeObjKeysFromPascalToCamel(response.data);
      return response;
    },
    (error) => {
      const { title, data, status } = error.response;
      const errmessage = title || error.message;
      if (status === 401) Router.push({ name: "Login" });
      if (Array.isArray(data) && data.length > 0) {
        for (const message of data) {
          Store.dispatch(
            "addAlert",
            {
              messageHeader: getToastHeaderBasedOnStatusCode(status),
              type: getToastColorBasedOnStatusCode(status),
              messageBody: message || "خطایی رخ داده لطفا دوباره تلاش کنید",
              autoHide: true,
              timeout: 3000,
            },
            { root: true }
          );
        }
      } else {
        Store.dispatch(
          "addAlert",
          {
            messageHeader: getToastHeaderBasedOnStatusCode(status),
            type: getToastColorBasedOnStatusCode(status),
            messageBody:
              getErrorMessage(data) ||
              getToastMessageBasedOnStatusCode(status, errmessage) ||
              "خطایی رخ داده لطفا دوباره تلاش کنید",
            autoHide: true,
            timeout: 3000,
          },
          { root: true }
        );
      }

      return Promise.reject(error);
    }
  );
};

const between = (x, min, max) => {
  return x >= min && x <= max;
};

const getToastHeaderBasedOnStatusCode = (statusCode) => {
  if (between(statusCode, 200, 399)) return "موفقیت آمیز";
  if (between(statusCode, 400, 499)) return "خطا";
  if (between(statusCode, 500, 599)) return "خطای سرور";
  return "خطای سرور";
};
const getToastColorBasedOnStatusCode = (statusCode) => {
  if (between(statusCode, 200, 399)) return "success";
  if (between(statusCode, 400, 499)) return "danger";
  if (between(statusCode, 500, 599)) return "warning";
  return "warning";
};
const getToastMessageBasedOnStatusCode = (statusCode, message) => {
  switch (statusCode) {
    case 200:
      return "موفقیت آمیز";
    case 201:
      return "ایجاد شد";
    case 202:
      return "قبول شد";
    case 301:
      return "منبع جابجا شده";
    case 302:
      return "یافت شد";
    case 401:
      return "دسترسی غیرمجاز";
    case 403:
      return "دسترسی مسدود";
    case 404:
      return "پیدا نشد";
    case 500:
      return "خطایی در سرور";
    case 502:
      return "Bad Gateway";
    case 503:
      return "سرور خارج ز دسترس";
    case 510:
      return "Not Extended";
    case 511:
      return "Network Authentication Required";
    default:
      return message;
  }
};
const getErrorMessage = (res) => {
  try {
    const errorArray = Object.values(res.errors);
    return errorArray.flat(4).join(" - \n ");
  } catch (ex) {
    return null;
  }
};
