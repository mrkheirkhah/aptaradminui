export const getRequestHeaders = (withBearer = true) => {
  const headers = {};
  const tokenKey = process.env.VUE_APP_ENV_APPLICATION_TOKEN_KEY;
  let token = null;
  if (localStorage) token = localStorage.getItem(tokenKey);
  if (token) {
    headers.Authorization = withBearer ? "Bearer " + token : token;
  } else {
    headers.Authorization = "";
  }
  headers["Content-Type"] = "application/json";
  headers["Accept"] = "application/json";
  return headers;
};

export const changeObjKeysFromPascalToCamel = (data) => {
  let obj, newObj;
  if (Array.isArray(data)) {
    obj = [...data];
  } else {
    obj = Object.create({});
    Object.assign(obj, data);
  }

  if (Array.isArray(obj)) {
    return obj.map(function(value) {
      if (typeof value === "object") {
        value = changeObjKeysFromPascalToCamel(value);
      }
      return value;
    });
  } else {
    newObj = {};
    for (const origKey in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(origKey)) {
        const newKey = smalizeFirstLetter(origKey);
        let value = obj[origKey];
        if (
          Array.isArray(value) ||
          (value !== null && value.constructor === Object)
        ) {
          value = changeObjKeysFromPascalToCamel(value);
        }
        newObj[newKey] = value;
      }
    }
    return newObj;
  }
};

export const properStatus = (data) => {
  return data ? "فعال" : "غیر‌فعال";
};

export const smalizeFirstLetter = (string) => {
  return (string.charAt(0).toLowerCase() + string.slice(1)).toString();
};

export const captalizeFirstLetter = (string) => {
  return (string.charAt(0).toUpperCase() + string.slice(1)).toString();
};

export const checkEmail = (email) => {
  const emailPattern = new RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  return emailPattern.test(email);
};

export const checkPhoneNumber = (phoneNumber) => {
  const phnumber = /([0-9]{3})+?-+[0-9]{8}/;
  return phnumber.test(phoneNumber);
};

export const checkMobileNumber = (phoneNumber) => {
  const mobilePattern = /09+[0-9]{9}/;
  return mobilePattern.test(phoneNumber);
};
