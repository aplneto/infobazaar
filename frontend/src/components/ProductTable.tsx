import { Link } from "react-router-dom";

type Product = {
  id: number;
  owner: string;
  price: number;
  description: string;
  title: string;
  categories: string[];
  public: boolean;
  last_updated: string;
  comments: number;
};

interface Props {
  productsArray: Product[];
}
export default function ProductTable({ productsArray }: Props) {
  return (
    <table className="table table-dark table-bordered border-light table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Last Update</th>
          <th>Price</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        {productsArray.map((product: Product, index) => (
          <tr key={index}>
            <td>
              <Link to={`/product/${product.id}`}>{product.title}</Link>
            </td>
            <td>
              {[new Date(product.last_updated)]
                .map(
                  (date: Date) =>
                    `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`
                )
                .join()}
            </td>
            <td>$ {product.price}</td>
            <td>{product.comments}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
