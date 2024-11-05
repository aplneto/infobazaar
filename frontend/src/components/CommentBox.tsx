interface Props {
  username: string;
  content: string;
  avatar_url: string;
  created_at: string;
}

export default function CommentBox({
  username,
  content,
  avatar_url,
  created_at,
}: Props) {
  return (
    <div className="d-flex mb-3">
      <img src={avatar_url} alt={username} className="rounded-circle me-3" />
      <div>
        <p className="mb-0">
          <strong>{username}</strong>: <p>{created_at}</p>
        </p>
        <p>{content}</p>
      </div>
    </div>
  );
}
