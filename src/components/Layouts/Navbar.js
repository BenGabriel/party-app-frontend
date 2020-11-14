import React, { useContext, Fragment } from "react";
import { FaGlassCheers, FaHeart } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";
const Navbar = () => {
  const { logout, clearError, userAuth, user } = useContext(AuthContext);

  const OnlogOut = () => {
    logout();
    clearError();
  };
  const userLinks = (
    <Fragment>
      <li>Hello, {user && user.name}</li>
      <span className="sm-hide">|</span>
      <li>
        <a href="#!" onClick={OnlogOut}>
          <span className="sm-hide">Logout</span>
          <i>
            <GrLogout />
          </i>
        </a>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <span className="sm=hide">|</span>
      <li>
        <Link to="/login">login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar">
      <div className="logo">
        <h1>
          <FaGlassCheers /> Bens Party
        </h1>
        <p>
          Made with <FaHeart /> by Ben
        </p>
      </div>
      <ul>{userAuth ? userLinks : authLinks}</ul>
    </div>
  );
};

export default Navbar;
