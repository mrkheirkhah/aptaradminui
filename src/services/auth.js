import userApiClient from "./index";

export const Login = ({ username, password }) => {
  const data = {
    UserID: 0,
    UserName: username,
    Password: password,
    Caption: "",
  };

  return Promise.resolve({
    data: {
      UserID: 1,
      UserName: "sa",
      Password: null,
      Caption: "ادمین آپتار",
      Token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiVXNlcklEXCI6MSxcIlVzZXJOYW1lXCI6XCJzYVwiLFwiQ2FwdGlvblwiOlwi2KfYr9mF24zZhiDYotm-2KrYp9ixXCIsXCJ0aHVtYm5haWxcIjpcImh0dHA6Ly9hZG1pbi5hcHRhci5pci9maWxlU2VydmVyLzEvYXZhdGFyLnBuZ1wifSIsIm5iZiI6MTYyODk3Mzk0NiwiZXhwIjoxNjMxNTY1OTQ2LCJpYXQiOjE2Mjg5NzM5NDZ9.ATqGnd5QMVW363qoj0qhx-lOrO3Mp2adBWXDvYhXv-E",
    },
  });

  // eslint-disable-next-line no-unreachable
  return userApiClient.post("/User/Login", data, {
    headers: { "Content-Type": "application/json" },
  });
};
