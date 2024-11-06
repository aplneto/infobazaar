import { ChangeEvent, FormEvent, useState } from "react";
import App from "../App";
import AxiosInstance from "../utils/AxiosInstance";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AxiosResponse } from "axios";

export default function NewPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: searchParams.get("username"),
    password: "",
    confirmation: "",
  });

  const [code, setCode] = useState("");

  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClick = (event: FormEvent) => {
    console.log("NORWEGIAN REGGAETON");
    event.preventDefault();
    console.log(formData);
    if (formData.password == formData.confirmation) {
      AxiosInstance.post(`reset/${code}/`, formData)
        .then((response: AxiosResponse) => {
          navigate("/login");
        })
        .catch(() => {
          alert("Something went wrong!");
        });
    } else {
      alert("Password and confirmation must match!");
    }
  };
  return (
    <App>
      <div className="container my-5 d-flex justify-content-center">
        <div className="card bg-dark border-light p-4 col-12 col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Password Recovery</h2>
          <p className="text-center">
            Enter your new password alonside your recovery code below
          </p>

          <form>
            <div className="mb-3 text-center">
              <label htmlFor="username" className="form-label text-secondary">
                <b>Recovery Code</b>
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-light"
                id="code"
                name="code"
                placeholder="Enter your reset code"
                onChange={handleCodeChange}
              />
              <label htmlFor="username" className="form-label text-secondary">
                <b>Password</b>
              </label>
              <input
                type="password"
                className="form-control bg-dark text-light border-light"
                id="password"
                name="password"
                placeholder="Enter your new password"
                onChange={handleChange}
              />
              <label htmlFor="username" className="form-label text-secondary">
                <b>Confirm your password</b>
              </label>
              <input
                type="password"
                className="form-control bg-dark text-light border-light"
                id="confirmation"
                name="confirmation"
                placeholder="Enter your username"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-light w-100"
              onClick={handleClick}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </App>
  );
}
