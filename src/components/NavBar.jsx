import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import Logo from "./Logo";
import { Globe, PlusCircle } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Logo />
      <div className="menu">
        <Link>
          <Globe size={21} strokeWidth={1.6} />
        </Link>
        <Link to="/new" className="new-wish">
          <span>New Wish</span>
          <PlusCircle size={21} strokeWidth={1.6} />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
