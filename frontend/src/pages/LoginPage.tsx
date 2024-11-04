import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import App from "../App";

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, []);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    AxiosInstance.post("/login/", loginData).then((response) => {
      if (response.status == 200) {
        login(response.data?.username);
        navigate("/");
      }
    });
  };

  return (
    <App>
      <div className="container my-auto">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card bg-dark border-light p-4">
              <h2 className="text-center mb-4">Login to InfoBazaar</h2>
              <form name="loginFor" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    aria-describedby="emailHelp"
                    placeholder="Your username"
                    value={loginData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Password"
                    value={loginData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <p className="text-center">
                    By signing up you accept our{" "}
                    <Link to="/disclaimer">terms of use</Link>.
                  </p>
                </div>
                <div className="col-md-12 text-center ">
                  <button
                    type="submit"
                    className=" btn btn-block mybtn btn-primary tx-tfm"
                  >
                    Login
                  </button>
                </div>
                <div className="col-md-12 ">
                  <div className="login-or">
                    <hr className="hr-or" />
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <p className="text-center"></p>
                </div>
                <div className="form-group">
                  <p className="text-center">
                    Don't have an account?{" "}
                    <Link to="/signup">Sign up here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </App>
  );
}
