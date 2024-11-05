import { useEffect, useState } from "react";
import App from "../App";
import AxiosInstance from "../utils/AxiosInstance";
import { AxiosResponse } from "axios";
import CommentBox from "../components/CommentBox";
import { useParams } from "react-router-dom";
type Comment = {
  author: string;
  content: string;
  product: number;
  created_at: string;
};

type Product = {
  owner: string;
  price: number;
  description: string;
  title: string;
  categories: string[];
  public: boolean;
};

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product>();
  const [comments, setComments] = useState<Comment[]>([]);

  const [pageUsers, setPageUSers] = useState<{ [username: string]: string }>(
    {}
  );

  const recoverUserInfo = function (username: string) {
    if (username in pageUsers) {
      return pageUsers[username];
    }

    AxiosInstance.get(`/profile/${username}/`).then(
      (response: AxiosResponse) => {
        setPageUSers({
          ...pageUsers,
          [response.data.user]: response.data.avatar,
        });
      }
    );

    return "";
  };

  useEffect(() => {
    AxiosInstance.get<Product>(`product/${id}/`).then(
      (response: AxiosResponse) => {
        setProduct(response.data);
      }
    );
    // Get the comments data
    AxiosInstance.get<Comment[]>(`comments/${id}/`).then(
      (response: AxiosResponse) => {
        setComments(response.data);
      }
    );
  }, []);
  return (
    <App>
      <div className="container my-4">
        <div className="card bg-dark border-light p-4 mb-4">
          <h2 className="text-center mb-4">{product?.title}</h2>

          <div className="d-flex align-items-center mb-4">
            <img
              src="owner-avatar.jpg"
              alt="Owner Avatar"
              className="rounded-circle me-3"
              width="50"
              height="50"
            />
            <span>{product?.owner}</span>
          </div>

          <p>{product?.description}</p>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Price: ${product?.price}</h4>
            <button type="button" className="btn btn-outline-success">
              Buy Now
            </button>
          </div>

          <h4>Associated Files</h4>
          <ul>
            <li>
              <a
                href="#"
                className="text-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download File 1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download File 2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download File 3
              </a>
            </li>
          </ul>
        </div>

        <div className="card bg-dark border-light p-4 mb-4">
          <h4 className="mb-3">Comments</h4>
          <div className="mb-3">
            <div className="border-bottom border-light pb-2 mb-2">
              <strong>User1</strong>{" "}
              <span className="text-muted">2024-11-03 15:30</span>
              <p>Great project! Looking forward to more updates.</p>
            </div>

            <div className="border-bottom border-light pb-2 mb-2">
              <strong>User2</strong>{" "}
              <span className="text-muted">2024-11-03 16:00</span>
              <p>Very impressive work! Can’t wait to try it out.</p>
            </div>
          </div>

          <form>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">
                Add a Comment
              </label>
              <textarea
                className="form-control bg-dark text-light border-light"
                id="comment"
                rows={3}
                placeholder="Write your comment here..."
              ></textarea>
            </div>
            <button type="submit" className="btn btn-outline-light">
              Submit Comment
            </button>
          </form>
        </div>
      </div>
    </App>
  );
}
