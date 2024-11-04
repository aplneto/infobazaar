import { ReactNode, useEffect } from "react";

// import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

interface Props {
  children?: ReactNode;
}

export default function App({ children }: Props) {
  useEffect(() => {
    document.title = "InfoBazaar";
  });
  return (
    <>
      <div className="d-flex flex-column min-vh-100 bg-dark text-light">
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  );
}
