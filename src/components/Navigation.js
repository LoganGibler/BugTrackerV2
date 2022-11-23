import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./navigation.css";

const Navigation = ({ isLoggedIn, setIsLoggedIn }) => {
  const history = useHistory();

  return (
    <div>
      <header>
        <nav className="navbar">
          <a
            type="submit"
            className="nav-branding"
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            BugTracker
          </a>
          {!isLoggedIn ? null : (
            <div className="middle-menu">
              <li className="nav-item">
                <a
                  type="submit"
                  className="nav-link"
                  onClick={() => {
                    history.push("/dashboard");
                  }}
                >
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a
                  type="submit"
                  className="nav-link"
                  onClick={() => {
                    history.push("/activedevs");
                  }}
                >
                  Active Devs
                </a>
              </li>
              <li className="nav-item">
                <a
                  type="submit"
                  className="nav-link"
                  onClick={() => {
                    history.push("/activetickets");
                  }}
                >
                  Active Tickets
                </a>
              </li>
              <li className="nav-item">
                <a
                  type="submit"
                  className="nav-link"
                  onClick={() => {
                    history.push("/register");
                  }}
                >
                  Register Dev
                </a>
              </li>
            </div>
          )}
          <ul className="nav-menu">
            {isLoggedIn ? (
              <li className="nav-item">
                <a
                  // type="submit"
                  className="nav-link"
                  onClick={() => {
                    history.push("/createticket");
                  }}
                >
                  Create Ticket
                </a>
              </li>
            ) : null}
            {isLoggedIn ? null : (
              <li className="nav-item">
                <a
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Login
                </a>
              </li>
            )}
            {isLoggedIn ? (
              <li>
                <a
                  type="submit"
                  onClick={() => {
                    setIsLoggedIn(false);
                    localStorage.clear();
                    history.push("/login");
                  }}
                >
                  Logout
                </a>
              </li>
            ) : null}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navigation;
