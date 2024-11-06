import { Link } from "react-router-dom";
import App from "../App";

export default function HomePage() {
  return (
    <App>
      <section className="py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to InfoBazaar</h1>
          <p className="lead">
            The premier dark web marketplace for data leaks, malware, and more.
          </p>
          <button className="btn btn-outline-light btn-lg">Explore Now</button>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card bg-dark border-light">
                <div className="card-body">
                  <h5 className="card-title">Data Leaks</h5>
                  <p className="card-text">
                    Access a wide variety of confidential data.
                  </p>
                  <Link to="/store" className="btn btn-outline-light">
                    Shop Data Leaks
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card bg-dark border-light">
                <div className="card-body">
                  <h5 className="card-title">Malware</h5>
                  <p className="card-text">
                    Acquire custom malware for all your needs.
                  </p>
                  <Link to="/store" className="btn btn-outline-light">
                    Shop Malware
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card bg-dark border-light">
                <div className="card-body">
                  <h5 className="card-title">24h Support</h5>
                  <p className="card-text">
                    Ask for help via our secure messaging system.
                  </p>
                  <Link to="/support" className="btn btn-outline-light">
                    Send message
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-secondary">
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <h4>Trusted Vendors</h4>
              <p>Only verified vendors to ensure quality and safety.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <h4>Anonymous Transactions</h4>
              <p>Completely anonymous and secure for all transactions.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <h4>24/7 Support</h4>
              <p>Help is always available whenever you need it.</p>
            </div>
          </div>
        </div>
      </section>
    </App>
  );
}
