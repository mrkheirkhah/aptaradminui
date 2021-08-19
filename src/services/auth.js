import axios from "axios";
import { getRequestHeaders } from "../utils";
import { addAxiosInterceptors } from "../helpers/axios";

const userApiClient = axios.create({
  baseURL: "http://admin.aptar.ir/api",
  headers: getRequestHeaders(),
});

addAxiosInterceptors(userApiClient);

export const Login = ({ username, password }) => {
  const data = {
    UserID: 0,
    UserName: username,
    Password: password,
    Caption: "",
  };

  // return Promise.resolve({
  //   data: {
  //     UserID: 1,
  //     UserName: "sa",
  //     Password: null,
  //     Caption: "ادمین آپتار",
  //     Token:
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiVXNlcklEXCI6MSxcIlVzZXJOYW1lXCI6XCJzYVwiLFwiQ2FwdGlvblwiOlwi2KfYr9mF24zZhiDYotm-2KrYp9ixXCIsXCJ0aHVtYm5haWxcIjpcImh0dHA6Ly9hZG1pbi5hcHRhci5pci9maWxlU2VydmVyLzEvYXZhdGFyLnBuZ1wifSIsIm5iZiI6MTYyOTE0NzA3NywiZXhwIjoxNjMxNzM5MDc3LCJpYXQiOjE2MjkxNDcwNzd9.noQYcSD0D8yC0YT28b-ZOlyFbuXQJl8UPVKlW7G95JY",
  //   },
  // });

  // eslint-disable-next-line no-unreachable
  return userApiClient.post("/User/Post", data, {
    headers: { "Content-Type": "application/json" },
  });
};
