import App from "../App";

export default function RegistrationAlertPage() {
  return (
    <App>
      <div className="container my-auto">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card bg-dark border-light p-4">
              <h2 className="text-center mb-4">Registration Confirmation</h2>
              <p className="lead text-center">
                Thank you for signing up to InfoBazaar.
              </p>
              <p>
                If your registration attempt was valid, you should soon receive
                a confirmation email in your inbox.
              </p>
              <p>
                Please check your email and follow the instructions provided to
                complete the login process. If you don't see the email, be sure
                to check your spam or junk folder, or try again later.
              </p>
              <p className="text-center mt-4">
                Thank you for choosing InfoBazaar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </App>
  );
}
