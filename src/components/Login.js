import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { loginUser, allUsers } from "../api";
import { storeToken, storeUser } from "../auth";
import "./login.css";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  let history = useHistory();
  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");
  return (
    <div>
      <form
        className="Loginform"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            // console.log("passed in username", username);
            // console.log("passed in password", password);
            const activeUser = await loginUser(username, password);
            if (activeUser !== undefined) {
              // console.log("this is active user", activeUser);
              storeUser(activeUser);
              storeToken(activeUser);
              // console.log("logged in!!");
              setUsername("");
              setPassword("");
              setIsLoggedIn(true);
              history.push("/dashboard")
            } else {
              alert("Login Failed.")
            }
          } catch (error) {
            throw error;
          } finally {
            // nothing
          }
        }}
      >
        <p className="username_label">Username</p>
        <input
          className="username_input"
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            // console.log(username);
          }}
        ></input>
        <p className="password_label">Password</p>
        <input
          className="password_input"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            // console.log(password);
          }}
        ></input>
        <button className="loginButton">Submit</button>
      </form>
    </div>
  );
};

export default Login;
