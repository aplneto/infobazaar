import { useLocation, useNavigate } from "react-router-dom";
import App from "../App";
import AxiosInstance from "../utils/AxiosInstance";
import { FormEvent } from "react";

function obfuscateEmail(email: string) {
  const [username, domain] = email.split("@");
  if (username.length <= 2) {
    return `${username[0]}***@${domain}`;
  }

  const obfuscatedUsername = `${username[0]}${"*".repeat(username.length - 2)}${
    username[username.length - 1]
  }`;
  const [domainName, domainExtension] = domain.split(".");

  const obfuscatedDomain = `${domainName[0]}${"*".repeat(
    domainName.length - 2
  )}${domainName[domainName.length - 1]}`;
  return `${obfuscatedUsername}@${obfuscatedDomain}.${domainExtension}`;
}

export default function ConfirmEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event: FormEvent) => {
    event.preventDefault();
    AxiosInstance.post("reset/", {
      username: location.state.username,
      email: location.state.email,
    }).then(() => {
      alert(
        "We've sent you an e-mail with instructions on how to recover your password."
      );
      navigate(`/new-password?username?=${location.state.username}`);
    });
  };

  return (
    <App>
      <div className="container my-5 d-flex justify-content-center">
        <div className="card bg-dark border-light p-4 col-12 col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Confirm Your Email</h2>
          <p className="text-center">
            We found the email associated with your username. Please confirm to
            receive password recovery instructions.
          </p>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <p className="form-control bg-dark text-light border-light">
              {obfuscateEmail(location.state.email)}
            </p>
          </div>

          <form>
            <button
              type="submit"
              className="btn btn-outline-light w-100"
              onClick={handleClick}
            >
              Confirm and Send Instructions
            </button>
          </form>
        </div>
      </div>
    </App>
  );
}
