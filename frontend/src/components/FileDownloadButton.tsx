import { useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";

interface Props {
  product: string;
  file: string;
  description: string;
}

export default function FileDownloadButton({
  product,
  file,
  description,
}: Props) {
  const onClick = () => {
    AxiosInstance.get(product).catch((error) => {
      alert("File unavailable");
    });
  };
  return (
    <button
      className="btn btn-outline-danger"
      data-toggle="tooltip"
      data-placement="top"
      title={description}
      onClick={onClick}
    >
      {file}
    </button>
  );
}
