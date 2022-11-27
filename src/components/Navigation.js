import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./navigation.css";

const Navigation = ({ isLoggedIn, setIsLoggedIn, loggedIn }) => {
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
          {!loggedIn ? null : (
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
            {loggedIn ? (
              <li className="nav-item">
                <a className="nav-link" onClick={()=>{
                  history.push("/currenttask")
                }}>Current Task</a>
              </li>
            ) : null}
            {loggedIn ? (
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

            {loggedIn ? null : (
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
            {loggedIn ? (
              <li>
                <a
                  type="submit"
                  onClick={() => {
                    setIsLoggedIn(false);
                    window.localStorage.removeItem("isLoggedIn", false)
                    history.push("/login");
                    localStorage.clear()
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
