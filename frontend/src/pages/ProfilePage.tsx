import { useEffect, useState } from "react";
import App from "../App";
import AxiosInstance from "../utils/AxiosInstance";
import { AxiosResponse } from "axios";
import { useAuth } from "../AuthContext";
import { useLocation } from "react-router-dom";

interface UserProfile {
  id: number;
  user: string;
  avatar: string;
  bio: string;
  active: boolean;
}

export default function ProfilePage() {
  const { user } = useAuth();

  let { state } = useLocation();

  const [profileData, setProfileData] = useState({
    id: -1,
    user: "",
    avatar: "",
    bio: "",
    active: false,
  });

  useEffect(() => {
    console.log(user);
    AxiosInstance.get<UserProfile>(
      `/profile/${state.username ? state.username : user}`
    ).then((response: AxiosResponse) => {
      setProfileData({ ...profileData, ...response.data });
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
                      <th>Date of Publication</th>
                      <th>Price</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Product 1</td>
                      <td>2024-11-01</td>
                      <td>$50</td>
                      <td>15</td>
                    </tr>
                    <tr>
                      <td>Product 2</td>
                      <td>2024-10-28</td>
                      <td>$120</td>
                      <td>32</td>
                    </tr>
                    <tr>
                      <td>Product 3</td>
                      <td>2024-10-20</td>
                      <td>$75</td>
                      <td>8</td>
                    </tr>
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
