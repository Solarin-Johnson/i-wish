import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.scss";
import Logo from "./Logo";
import { Globe, PlusCircle } from "lucide-react";

const NavBar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <Logo />
      <div className="menu">
        <Link
          title="Home"
          to="/"
          className="global-wish"
          id={location.pathname === "/" ? "active" : ""}
        >
          <Globe size={21} strokeWidth={1.6} />
        </Link>
        <Link
          to="/new"
          title="New Wish"
          className="new-wish"
          id={location.pathname === "/new" ? "active" : ""}
        >
          <span>New Wish</span>
          <PlusCircle size={21} strokeWidth={1.6} />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
