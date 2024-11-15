import { Link } from "react-router-dom";
import { formatDate } from "../utils/DateFormater";

interface Props {
  username: string;
  content: string;
  created_at: string;
}

export default function CommentBox({ username, content, created_at }: Props) {
  return (
    <div className="border-bottom border-light pb-2 mb-2">
      <strong>
        <Link to={`/profile/${username}`}>{username}</Link>
      </strong>{" "}
      <span className="text-muted">{formatDate(created_at)}</span>
      <p>{content}</p>
    </div>
  );
}
