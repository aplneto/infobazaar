import { redirect } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function LogoutPage() {
  const { logout } = useAuth();
  return <div></div>;
}
