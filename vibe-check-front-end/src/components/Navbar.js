import React from "react";
import {Link} from "react-router-dom";

/** Navbar displayed at the top of the app. it handles the routes and renders links
 * depending on whether the user is logged in or not
 * */
function Navbar(props) {
  const activeTab = props.activeNavTab;

  return (
      <nav className="navBar ">
        <Link className="navbar-brand" to="/">
          <div className="linkContainer brandContainer" onClick={() => props.setActiveNavTab("home")}>
            Vibe Check
          </div>
        </Link>
        <Link className="nav-link" to="/">
          <div className={activeTab === "home" ? "activeNavTab linkContainer" : "linkContainer"} onClick={() => props.setActiveNavTab("home")}>
            <i className="fa fa-home"/>
            Home
          </div>
        </Link>
        {props.user !== null &&
        <>
          <Link className="nav-link" to="/profile">
            <div className={activeTab === "profile" ? "activeNavTab linkContainer" : "linkContainer"} onClick={() => props.setActiveNavTab("profile")}>
              <i className="fa fa-id-card" />
              Profile
            </div>
          </Link>
          <Link className="nav-link" to="/forum">
            <div className={activeTab === "forum" ? "activeNavTab linkContainer" : "linkContainer"} onClick={() => props.setActiveNavTab("forum")}>
              <i className="fa fa-comments" />
              Forum
            </div>
          </Link>
        </>
        }
        {props.user === null
            ? <Link className="nav-link" to="/login">
              <div className={activeTab === "login" ? "activeNavTab linkContainer loginContainer" : "linkContainer loginContainer"}
                   onClick={() => props.setActiveNavTab("login")}>
                <i className="fa fa-sign-in" />
                Login
              </div>
            </Link>
            :
            <>
              <Link className="nav-link" to="/login" onClick={props.logoutUser}>
                <div className={activeTab === "login" ? "activeNavTab linkContainer loginContainer" : "linkContainer loginContainer"}
                     onClick={() => props.setActiveNavTab("login")}>
                  <i className="fa fa-sign-out" />
                  Logout
                </div>
              </Link>
              <div className="welcomeHeader">
                <span>Welcome, {props.user.name}</span>
              </div>
            </>
        }
      </nav>
  );
}

export default Navbar;
