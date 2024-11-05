import { ChangeEvent, useEffect, useState } from "react";
import App from "../App";
import AxiosInstance from "../utils/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerificationPage() {
  const [vCode, setVCode] = useState("");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const username = searchParams.get("username");

  useEffect(() => {
    if (username === null) {
      navigate("/login");
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setVCode(value);
  };

  const handleClick = () => {
    AxiosInstance.post(`activate/${vCode}/`, { username: username })
      .then((response: AxiosResponse) => {
        navigate("/login");
        alert("You have successfully verified your account");
      })
      .catch((error: AxiosError) => {
        alert("Your veirification code is invalid");
      });
  };

  return (
    <App>
      <div className="container my-5 d-flex justify-content-center">
        <div className="card bg-dark border-light p-4 col-12 col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Email Confirmation</h2>
          <p className="text-center">
            A verification code has been sent to your email. Please check your
            inbox and enter the code below to confirm your email address.
          </p>

          <form>
            <div className="mb-3 text-center">
              <label
                htmlFor="verificationCode"
                className="form-label text-secondary"
              >
                <b>Verification Code</b>
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-light"
                id="verificationCode"
                placeholder="Enter your code"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-light w-100"
              onClick={handleClick}
            >
              Confirm Email
            </button>
          </form>
        </div>
      </div>{" "}
    </App>
  );
}
