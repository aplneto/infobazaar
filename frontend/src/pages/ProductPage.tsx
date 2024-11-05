import { useEffect, useState } from "react";
import App from "../App";
import AxiosInstance from "../utils/AxiosInstance";
import { AxiosResponse } from "axios";
import CommentBox from "../components/CommentBox";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FileDownloadButtonList from "../components/FileDownloadButtonList";
import { BuyButton } from "../components/BuyButton";
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
    console.log("Ok");
  }, []);
  return (
    <App>
      <div className="container my-4">
        <div className="card bg-dark border-light p-4 mb-4">
          <h2 className="text-center mb-4">{product?.title}</h2>

          <div className="d-flex align-items-center mb-4">
            {/* <RoundAvatar username={product?.owner} /> */}
            <span>
              A product by{" "}
              <Link to={{ pathname: `/profile/${product?.owner}` }}>
                {product?.owner}
              </Link>
            </span>
          </div>

          <p>{product?.description}</p>

          <BuyButton product={product} id={parseInt((id && id) || "-1")} />

          <h4>Associated Files</h4>
          <FileDownloadButtonList project_id={id} />
        </div>

        <div className="card bg-dark border-light p-4 mb-4">
          <h4 className="mb-3">Comments</h4>
          <div className="mb-3">
            {comments.map((comment, index) => (
              <CommentBox
                content={comment.content}
                username={comment.author}
                created_at={comment.created_at}
                key={index}
              />
            ))}
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
