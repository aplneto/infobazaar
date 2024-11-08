import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://infobazaar.local/api/",
  timeout: 10000,
  withCredentials: true,
});

export default AxiosInstance;
