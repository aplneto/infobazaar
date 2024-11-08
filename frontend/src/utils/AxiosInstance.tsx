import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://www.infobazaar.store/api/",
  timeout: 10000,
  withCredentials: true,
});

export default AxiosInstance;
