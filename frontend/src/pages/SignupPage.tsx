import { ChangeEvent, FormEvent, useState } from "react";
import App from "../App";
import AxiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [passwordConfirmation, setConfirmation] = useState("");
  const [invitationCode, setInvitationCode] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (passwordConfirmation == formData.password) {
      AxiosInstance.get(`invitation_code/${invitationCode}/`)
        .then((response: AxiosResponse) => {
          AxiosInstance.put("signup/", formData).finally(() => {
            navigate("/registration-success");
          });
        })
        .catch((error: AxiosError) => {
          alert("You need a valid invitation code to register here");
        });
    }
  };
  return (
    <>
      <App>
        <div className="container my-auto">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card bg-dark border-light p-4">
                <h2 className="text-center mb-4">Register for InfoBazaar</h2>
                <form name="signupForm" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-light"
                      id="username"
                      name="username"
                      placeholder="Choose a username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control bg-dark text-light border-light"
                      id="email"
                      placeholder="Enter your email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control bg-dark text-light border-light"
                      id="password"
                      placeholder="Create a password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmation" className="form-label">
                      Confirmation
                    </label>
                    <input
                      type="password"
                      className="form-control bg-dark text-light border-light"
                      id="confirmation"
                      placeholder="Confirm your password"
                      required
                      value={passwordConfirmation}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setConfirmation(event.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmation" className="form-label">
                      Invitation Code
                    </label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-light"
                      id="invitation"
                      placeholder="Your invitation code"
                      required
                      value={invitationCode}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setInvitationCode(event.target.value);
                      }}
                    />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-outline-light">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </App>
    </>
  );
}
