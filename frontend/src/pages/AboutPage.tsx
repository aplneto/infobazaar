import App from "../App";

export default function HomePage() {
  return (
    <>
      <App>
        <section className="py-5">
          <div className="container my-auto">
            <h2 className="text-center mb-4">About InfoBazaar</h2>
            <div className="row text-center justify-content-center">
              <div className="col-md-6 col-lg-3 mb-4">
                <div className="card bg-dark border-light">
                  <div className="card-body">
                    <h5 className="card-title">Anonymous Transactions</h5>
                    <p className="card-text">
                      Transactions are conducted through secure cryptocurrency
                      channels, ensuring total anonymity for all participants.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 mb-4">
                <div className="card bg-dark border-light">
                  <div className="card-body">
                    <h5 className="card-title">Verified Services</h5>
                    <p className="card-text">
                      Our marketplace administration verifies all products and
                      services to guarantee quality and reliability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 mb-4">
                <div className="card bg-dark border-light">
                  <div className="card-body">
                    <h5 className="card-title">Privacy Comes First</h5>
                    <p className="card-text">
                      We keep no personal records on our servers, prioritizing
                      your privacy and maintaining complete anonymity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 mb-4">
                <div className="card bg-dark border-light">
                  <div className="card-body">
                    <h5 className="card-title">Invitation-Only</h5>
                    <p className="card-text">
                      Only selected providers and clients are granted invitation
                      codes, keeping the marketplace exclusive and secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </App>
    </>
  );
}
