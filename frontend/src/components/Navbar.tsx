import { Link } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import { AuthProvider, useAuth } from "../AuthContext";
import { useEffect } from "react";

function getUnauthenticatedButtons() {
  return (
    <>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link
            to="/login"
            className="nav-link btn btn-outline-secondary"
            aria-current="page"
          >
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/signup"
            className="nav-link btn btn-outline-secondary"
            aria-current="page"
          >
            Register
          </Link>
        </li>
      </ul>
    </>
  );
}

function getAuthenticatedButtons(username: string, logout: () => void) {
  return (
    <>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link
            to={{ pathname: `/profile/${username}` }}
            className="nav-link active"
            aria-current="page"
          >
            {username}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/#"
            className="nav-link btn btn-danger"
            aria-current="page"
            onClick={(_) => {
              AxiosInstance.get("/logout/").then((response) => {
                if (response.status == 200) {
                  logout();
                }
              });
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </>
  );
}

export default function Navbar() {
  const { user, login, logout } = useAuth();

  const checkLogin = () => {
    AxiosInstance.get("/me/").then((response) => {
      login(response.data?.username);
    });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">InfoBazaar</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link active" aria-current="page">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/store" className="nav-link active" aria-current="page">
                Store
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/disclaimer"
                className="nav-link active"
                aria-current="page"
              >
                Disclaimer
              </Link>
            </li>
          </ul>
          <div className="mx-auto order-0">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-secondary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        {user !== null
          ? getAuthenticatedButtons(user, logout)
          : getUnauthenticatedButtons()}
      </div>
    </nav>
  );
}
