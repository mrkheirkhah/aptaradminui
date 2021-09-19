/* eslint-disable no-unreachable */
import userApiClient from "./";

export const statusCatalog = () => {
  return userApiClient.get("/TicketStatus/Catalog");
};

export const categoryCatalog = () => {
  return userApiClient.get("/TicketCategory/Catalog");
};

export const getAll = (data) => {
  return userApiClient.post("/Ticket/All", data);
};

export const getOne = (ticketId) => {
  return userApiClient.get(`/Ticket/${ticketId}`);
};

export const getAttachment = (ticketId, fileName) => {
  return userApiClient.get(`/TicketAttachment/${ticketId}/${fileName}`);
};

export const updateStatus = (data) => {
  return userApiClient.put("/Ticket/Status", data);
};

export const reply = (data) => {
  return userApiClient.put("/Ticket/Reply", data);
};
