import { FormEvent } from "react";
import App from "../App";
import { useNavigate } from "react-router-dom";

export default function PurchaseCredits() {
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("You're not supposed to be here!");
    navigate("/");
    return false;
  };
  return (
    <App>
      <div className="container my-5">
        <h2 className="text-center mb-4">Purchase Credits</h2>
        <div className="row justify-content-center">
          <div className="col-12 col-md-4 mb-4">
            <div className="card bg-dark border-light text-center h-100">
              <div className="card-body">
                <h4 className="card-title">100 Credits</h4>
                <p className="text-muted">
                  <s>$100.00</s>
                </p>
                <p className="display-6">$100.00</p>
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="credits" value={100} />
                  <input type="hidden" name="value" value={100} />
                  <input type="hidden" name="discount" value={0} />
                  <button className="btn btn-outline-light w-100" type="submit">
                    Buy
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div className="card bg-dark border-light text-center h-100">
              <div className="card-body">
                <h4 className="card-title">500 Credits</h4>
                <p className="text-muted">
                  <s>$500.00</s>
                </p>
                <p className="display-6">$450.00</p>
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="credits" value={500} />
                  <input type="hidden" name="value" value={450} />
                  <input type="hidden" name="discount" value={10} />
                  <button className="btn btn-outline-light w-100" type="submit">
                    Buy
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div className="card bg-dark border-light text-center h-100">
              <div className="card-body">
                <h4 className="card-title">1000 Credits</h4>
                <p className="text-muted">
                  <s>$1000.00</s>
                </p>
                <p className="display-6">$750.00</p>
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="credits" value={1000} />
                  <input type="hidden" name="value" value={750} />
                  <input type="hidden" name="discount" value={25} />
                  <button className="btn btn-outline-light w-100" type="submit">
                    Buy
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </App>
  );
}
