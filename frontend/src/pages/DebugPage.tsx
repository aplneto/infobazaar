import App from "../App";

export default function DebugPage() {
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
              />
            </div>
            <button type="submit" className="btn btn-outline-light w-100">
              Confirm Email
            </button>
          </form>
        </div>
      </div>{" "}
    </App>
  );
}
