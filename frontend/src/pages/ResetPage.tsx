import { ChangeEvent, FormEvent, useState } from "react";
import App from "../App";
import AxiosInstance from "../utils/AxiosInstance";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPage() {
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleClick = (event: FormEvent) => {
    event.preventDefault();
    AxiosInstance.get(`email/${username}/`)
      .then((response: AxiosResponse) => {
        navigate("/confirm", {
          state: {
            email: response.data.email,
            username: username,
          },
        });
      })
      .catch(() => {
        navigate("/");
      });
  };
  return (
    <App>
      <div className="container my-5 d-flex justify-content-center">
        <div className="card bg-dark border-light p-4 col-12 col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Password Recovery</h2>
          <p className="text-center">
            Enter your username to receive instructions for resetting your
            password.
          </p>

          <form>
            <div className="mb-3 text-center">
              <label htmlFor="username" className="form-label text-secondary">
                <b>Username</b>
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-light"
                id="username"
                placeholder="Enter your username"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-light w-100"
              onClick={handleClick}
            >
              Send Instructions
            </button>
          </form>
        </div>
      </div>
    </App>
  );
}
