import AxiosInstance from "../utils/AxiosInstance";

type Product = {
  owner: string;
  price: number;
  description: string;
  title: string;
  categories: string[];
  public: boolean;
};

interface Props {
  product?: Product;
  id: number;
}

export function BuyButton({ product, id }: Props) {
  const onClick = () => {
    if (confirm(`Would you like to buy ${product?.title}?`)) {
      AxiosInstance.post(`buy/`, { product: id });
    }
  };
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h4>Price: ${product?.price}</h4>
      <button
        type="button"
        className="btn btn-outline-success"
        onClick={onClick}
      >
        Buy Now
      </button>
    </div>
  );
}
