import axios from "axios";
import { getRequestHeaders } from "../utils";
import { addAxiosInterceptors } from "../helpers/axios";

const userApiClient = axios.create({
  baseURL: "http://admin.aptar.ir/api", //https://cors-anywhere.herokuapp.com/
  headers: getRequestHeaders(true),
});

addAxiosInterceptors(userApiClient);

export default userApiClient;
