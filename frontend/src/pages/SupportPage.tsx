import { ChangeEvent, FormEvent, useState } from "react";
import App from "../App";
import AxiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function SupportPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleClick = (event: FormEvent<HTMLButtonElement>) => {
    AxiosInstance.post("message/", { content: message }).then(() => {
      alert(
        "Your message has been set. Check the e-mail address provided on the message in a couple of hours."
      );
      navigate("/");
    });
  };
  return (
    <App>
      <div className="container my-auto">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card bg-dark border-light p-4">
              <h2 className="text-center mb-4">Customer Support</h2>
              <p className="lead text-center">Talk to customer suport</p>
              <p>
                Our customer support team is available 24/7 for your
                convenience. Send us a message if you need any assistance. And
                don't worry, we use state of the art AES cryptography, so all
                your messages are safe with us.
              </p>
              <p className="text-center">
                Don't forget to inform your name and email.
              </p>
              <textarea
                className="form-control bg-dark text-light border-light"
                id="fileDescription"
                placeholder="Enter your message"
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="btn btn-outline-light"
                onClick={handleClick}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </App>
  );
}
