import axios from "axios";
import { addAxiosInterceptors } from "../helpers/axios";

const userApiClient = axios.create({
  baseURL: "http://admin.aptar.ir/api",
});

addAxiosInterceptors(userApiClient);

export default userApiClient;
