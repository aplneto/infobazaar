import { useEffect, useState } from "react";
import App from "../App";
import ProductTable from "../components/ProductTable";
import AxiosInstance from "../utils/AxiosInstance";
import { AxiosResponse } from "axios";

export default function HomePage() {
  const [productsArray, setProductsArray] = useState([]);

  useEffect(() => {
    AxiosInstance.get("products/").then((response: AxiosResponse) => {
      setProductsArray(response.data);
    });
  }, []);

  return (
    <App>
      <div className="container my-auto">
        <div className="row justify-content-center"></div>
        <ProductTable productsArray={productsArray} />
      </div>
    </App>
  );
}
