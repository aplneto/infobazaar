import { useEffect, useState } from "react";
import App from "../App";
import AxiosInstance from "../utils/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "../AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface UserProfile {
  id: number;
  user: string;
  avatar: string;
  bio: string;
  active: boolean;
}

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

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [profileData, setProfileData] = useState({
    id: -1,
    user: "",
    avatar: "",
    bio: "",
    active: false,
  });

  const [productsArray, setproductsArray] = useState<Product[]>([]);

  useEffect(() => {
    AxiosInstance.get<UserProfile>(
      `/profile/${state.username ? state.username : user}/`
    )
      .then((response: AxiosResponse) => {
        setProfileData({ ...profileData, ...response.data });
      })
      .catch((error: AxiosError) => {
        navigate("/");
      });
    AxiosInstance.get<Product[]>(
      `/products/${state.username ? state.username : user}/`
    ).then((response: AxiosResponse) => {
      setproductsArray(response.data);
    });
  }, []);

  return (
    <App>
      <div className="container my-auto">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card bg-dark border-light p-4 text-center">
              <div className="mb-3">
                <img
                  src={profileData.avatar}
                  alt={profileData.user}
                  className="rounded-circle img-fluid"
                  width="150"
                />
              </div>

              <h3 className="mb-2">{profileData.user}</h3>

              <p className="mb-4">{profileData.bio}</p>

              <h4 className="mb-3">Last Posted Products</h4>
              <div className="table-responsive">
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
                    {productsArray.map((product: Product) => (
                      <tr>
                        <td>
                          {" "}
                          <Link to={`/product/${product.id}`}>
                            {product.title}
                          </Link>
                        </td>
                        <td>
                          {" "}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </App>
  );
}
