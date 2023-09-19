import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer bg-dark text-light p3">
      <h2 className="text-center">All Right Reserved &copy; RAF-STORE</h2>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
}

export default Footer;
