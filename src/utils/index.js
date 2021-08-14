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
