import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import { AxiosResponse } from "axios";

export default function HomePage() {
  const [data, setData] = useState("");
  const [searchParams] = useSearchParams();

  const uuid = searchParams.get("uuid");

  useEffect(() => {
    AxiosInstance.get(`receipt/${uuid}`).then((response: AxiosResponse) => {
      setData(response.data["receipt"]);
    });
  }, []);
  return <img src={`data:image/png;base64,${data}`} />;
}
