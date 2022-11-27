import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { loginUser, allUsers, registerUser } from "../api";
import { storeToken, storeUser } from "../auth";
import "./login.css";


const Register = () => {

  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const { token }= await registerUser(username, password)
            if (!token){
              alert("registration failed.")
            }
            else{
              alert("Registration successful.")
            }
            storeToken(token)
            setUsername("")
            setPassword("")
            location.reload();
            // console.log(token);
          } catch (error) {
            throw error;
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
        <button className="loginButton">Register Dev</button>
      </form>
    </div>
  );
};

export default Register;
