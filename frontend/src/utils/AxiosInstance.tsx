import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://infobazaar.store/api/",
  timeout: 10000,
  withCredentials: true,
});

export default AxiosInstance;
