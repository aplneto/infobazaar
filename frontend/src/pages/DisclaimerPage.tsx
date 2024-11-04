import App from "../App";

export default function HomePage() {
  return (
    <>
      <App>
        <div className="container my-auto">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card bg-dark border-light p-4">
                <h2 className="text-center mb-4">Maintenance Notice</h2>
                <p className="lead text-center">
                  InfoBazaar is temporarily down due to recent cyberattacks.
                </p>
                <p>
                  Our team is currently addressing a series of cyberattacks
                  aimed at InfoBazaar. We have taken proactive measures to
                  ensure the marketplace remains secure, and we’re working
                  around the clock to restore full functionality.
                </p>
                <p>
                  We want to assure you that{" "}
                  <strong>no user data has been compromised</strong>. Even in
                  the unlikely event of a breach, InfoBazaar’s encrypted
                  database is designed to protect your anonymity at all times.
                  Our cryptographic safeguards mean that sensitive information
                  cannot be accessed by unauthorized parties.
                </p>
                <p className="text-center mt-4">
                  Thank you for your patience and trust.
                </p>
                <p className="text-center">- The InfoBazaar Team</p>
              </div>
            </div>
          </div>
        </div>
      </App>
    </>
  );
}
