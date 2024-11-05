import { useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { AxiosResponse } from "axios";

type ProductFile = {
  id: number;
  product: string;
  file: string;
  description: string;
};

interface Prop {
  project_id: string | number | undefined;
}

function trimName(file_name: string) {
  return file_name.split("/").slice(-1)[0];
}

export default function FileDownloadButton({ project_id }: Prop) {
  const [productList, setProductList] = useState<ProductFile[]>([]);

  useEffect(() => {
    AxiosInstance.get(`/files/${project_id}/`).then(
      (response: AxiosResponse) => {
        setProductList(response.data);
      }
    );
  }, []);

  const onClick = (download_link: string) => {
    return function () {
      AxiosInstance.get<ProductFile[]>(download_link, {
        responseType: "blob",
      })
        .then((response: AxiosResponse) => {
          let fileURL = URL.createObjectURL(new Blob([response.data]));
          let link = document.createElement("a");
          link.href = fileURL;
          link.setAttribute("download", trimName(download_link));
          document.body.appendChild(link);
          link.click();

          URL.revokeObjectURL(fileURL);
          document.body.removeChild(link);
        })
        .catch((error) => {
          alert("File unavailable");
        });
    };
  };

  return (
    <ul>
      {productList.map((product, index) => (
        <li key={index}>
          <a
            className="btn btn-outline-danger"
            data-toggle="tooltip"
            data-placement="top"
            title={product.description}
            onClick={onClick(product.file)}
            download
          >
            {trimName(product.file)}
          </a>
        </li>
      ))}
    </ul>
  );
}
