import { useEffect, useState } from "react";
import App from "../App";
import AxiosInstance from "../utils/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "../AuthContext";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ProductTable from "../components/ProductTable";

interface UserProfile {
  id: number;
  user: string;
  avatar: string;
  bio: string;
  active: boolean;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { username } = useParams();

  const [balance, setBalance] = useState(0);

  const [profileData, setProfileData] = useState({
    id: -1,
    user: "",
    avatar: "",
    bio: "",
    active: false,
  });

  const [productsArray, setproductsArray] = useState([]);

  useEffect(() => {
    AxiosInstance.get<UserProfile>(`profile/${username ? username : user}/`)
      .then((response: AxiosResponse) => {
        setProfileData({ ...profileData, ...response.data });
      })
      .catch((error: AxiosError) => {
        navigate("/");
      });
    AxiosInstance.get(`products/${username ? username : user}/`).then(
      (response: AxiosResponse) => {
        setproductsArray(response.data);
      }
    );
    AxiosInstance.get("/balance/").then((response: AxiosResponse) => {
      setBalance(response.data.credits);
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
              {profileData.user == user ? (
                <Link to="/credits" className="btn btn-link disabled">
                  <p className="mb-4">$ {balance}</p>
                </Link>
              ) : (
                ""
              )}
              <p className="mb-4">{profileData.bio}</p>

              <h4 className="mb-3">Last Posted Products</h4>
              <div className="table-responsive">
                <ProductTable productsArray={productsArray} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </App>
  );
}
