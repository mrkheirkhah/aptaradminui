/* eslint-disable no-unreachable */
import userApiClient from "./";

export const add = (data) => {
  return userApiClient.post("​/Server", data);
};

export const update = (data) => {
  return userApiClient.put("​/Server", data);
};

export const remove = (data) => {
  return userApiClient.delete("​/Server", data);
};

export const getAll = (data) => {
  // return Promise.resolve({
  //   data: [
  //     {
  //       serverID: 1,
  //       title: "Balance",
  //       loadBalance: 1,
  //       address: "217.218.216.2",
  //       ip: "192.168.28.131",
  //       macAddress: "‎005056A21B16",
  //       version: null,
  //       isActive: false,
  //       deleteDate: null,
  //     },
  //     {
  //       serverID: 2,
  //       title: "سرور 2",
  //       loadBalance: null,
  //       address: null,
  //       ip: "192.168.2.2",
  //       macAddress: null,
  //       version: "1.0.0.0",
  //       isActive: false,
  //       deleteDate: null,
  //     },
  //     {
  //       serverID: 3,
  //       title: "سرور 3",
  //       loadBalance: null,
  //       address: null,
  //       ip: "192.168.3.3",
  //       macAddress: null,
  //       version: "2.0.0.0",
  //       isActive: false,
  //       deleteDate: null,
  //     },
  //     {
  //       serverID: 4,
  //       title: "سرور 4",
  //       loadBalance: null,
  //       address: null,
  //       ip: "10.10.10.10",
  //       macAddress: null,
  //       version: null,
  //       isActive: true,
  //       deleteDate: null,
  //     },
  //     {
  //       serverID: 5,
  //       title: "سرور 6",
  //       loadBalance: null,
  //       address: null,
  //       ip: "10101",
  //       macAddress: null,
  //       version: null,
  //       isActive: false,
  //       deleteDate: null,
  //     },
  //     {
  //       serverID: 7,
  //       title: "سرور 9",
  //       loadBalance: null,
  //       address: null,
  //       ip: null,
  //       macAddress: null,
  //       version: null,
  //       isActive: false,
  //       deleteDate: null,
  //     },
  //     {
  //       serverID: 11,
  //       title: "balance",
  //       loadBalance: 1,
  //       address: "217.218.216.2",
  //       ip: "192.168.28.131",
  //       macAddress: "‎005056A21B16",
  //       version: null,
  //       isActive: true,
  //       deleteDate: null,
  //     },
  //     {
  //       serverID: 13,
  //       title: "web",
  //       loadBalance: 2,
  //       address: "web.aptar.ir",
  //       ip: "192.168.28.132",
  //       macAddress: "",
  //       version: null,
  //       isActive: true,
  //       deleteDate: null,
  //     },
  //     {
  //       serverID: 1035,
  //       title: "matlab",
  //       loadBalance: 0,
  //       address: "192.168.28.22",
  //       ip: "192.168.28.22",
  //       macAddress: "005056A28046",
  //       version: null,
  //       isActive: true,
  //       deleteDate: null,
  //     },
  //   ],
  //   index: 0,
  //   size: 10,
  //   count: 9,
  // });
  return userApiClient.post("/Server/All", data);
};

export const catalog = () => {
  // return Promise.resolve([
  //   {
  //     id: 4,
  //     title: "سرور 4",
  //   },
  //   {
  //     id: 11,
  //     title: "balance",
  //   },
  //   {
  //     id: 13,
  //     title: "web",
  //   },
  //   {
  //     id: 1035,
  //     title: "matlab",
  //   },
  // ]);
  return userApiClient.get("/Server​/Catalog");
};

export const getOne = (serverId) => {
  // return Promise.resolve({
  //   serverID: 1,
  //   title: "Balance",
  //   loadBalance: 1,
  //   address: "217.218.216.2",
  //   ip: "192.168.28.131",
  //   macAddress: "‎005056A21B16",
  //   version: null,
  //   isActive: false,
  //   deleteDate: null,
  // });
  return userApiClient.get(`/Server/${serverId}`);
};
