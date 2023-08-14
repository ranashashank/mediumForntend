import React from "react";
import "./Navbar.css"
import Logo from "../assets/logo1.png"
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className="Navbar">
      <div className="nav-container">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="links">
          <div>
            <Link to={"/"} className="btn">
              Home
            </Link>
            {!props.authorization && (
              <Link to={"/login"} className="btn">
                Sign In
              </Link>
            )}
            {!props.authorization && (
              <Link to={"/register"} className="btn">
                Sign Up
              </Link>
            )}
            {props.authorization && (
              <Link to={"/logout"} className="btn">
                Sign Out
              </Link>
            )}
            {props.authorization && (
              <Link to={"/mypost"} className="btn">
                My Post
              </Link>
            )}
            {props.authorization && (
              <Link to={"/myProfile"} className="btn">
                My Profile
              </Link>
            )}
            {props.authorization && (
              <Link to={"/Topiclist"} className="btn">
                Topic List
              </Link>
            )}
            {props.authorization && (
              <Link to="/savedPost" className="btn">
              Saved
           </Link>
            )}
             
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
