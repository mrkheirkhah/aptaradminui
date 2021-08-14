import axios from "axios";
import { getRequestHeaders } from "../utils";

const userApiClient = axios.create({
  baseURL: "http://admin.aptar.ir/api",
  headers: getRequestHeaders(),
});

export default userApiClient;
