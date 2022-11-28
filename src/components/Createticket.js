import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../auth";
import { createATicket } from "../api";
import "./createTicket.css";

const Createticket = () => {
  let [title, setTitle] = useState("");
  let [category, setCategory] = useState("");
  let [description, setDescription] = useState("");
  let [author, setAuthor] = useState("");
  let [time, setTime] = useState("");
  let [severity, setSeverity] = useState("");
  let user = getUser();

  function getCategoryOption() {
    let selectElement = document.querySelector("#dropdownCategory");
    let output = selectElement.options[selectElement.selectedIndex].value;
    // console.log(output);
    return output;
  }

  function getSeverityOption() {
    let selectElement = document.querySelector("#dropdownSeverity");
    let output = selectElement.options[selectElement.selectedIndex].value;
    return output;
  }

  function getDate() {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    return date;
  }
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            console.log(time);
            console.log(title);
            console.log(category);
            console.log(description);
            console.log(author);
            const data = await createATicket(
              title,
              description,
              category,
              author,
              time,
              severity
            );
            console.log(data);
            if (data) {
              alert("Ticket was created.");
            } else {
              alert("Ticket creation failed.");
            }

            setTitle("");
            setDescription("");
            setCategory("");
            setAuthor("");
            setTime("");
            setSeverity("");
            location.reload();
          } catch (error) {
            throw error;
          }
        }}
      >
        <h4>Title</h4>
        <input
          className="title_box"
          value={title}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <h4>Select Category:</h4>
        <select
          name="category"
          id="dropdownCategory"
          value={category}
          onChange={() => {
            let selected_category1 = getCategoryOption();
            // console.log("this is selected catyegory", selected_category);
            setCategory(selected_category1);
          }}
        >
          <option></option>
          <option value="FrontEnd">FrontEnd</option>
          <option value="Backend">Backend</option>
          <option value="Api issue">Api issue</option>
        </select>
        <h4>Select Severity:</h4>
        <select
          name="severity"
          id="dropdownSeverity"
          value={severity}
          onChange={() => {
            let selected_category2 = getSeverityOption();
            console.log("this is selected category2", selected_category2);
            setSeverity(selected_category2);
          }}
        >
          <option></option>
          <option value="Level 1">Level 1</option>
          <option value="Level 2">Level 2</option>
          <option value="level 3">Level 3</option>
          <option value="level 4">Level 4</option>
        </select>
        <h4>Description</h4>
        <textarea
          className="large_inputbox"
          value={description}
          placeholder="Please include steps to replicate issue."
          type="text"
          onChange={(e) => {
            setDescription(e.target.value);
            setAuthor(user.username);
            let current_date = getDate();
            // console.log(date);
            setTime(current_date);
          }}
        ></textarea>
        {/* <button>Submit Ticket</button> */}
        <button className="loginButton">
          <a>Submit Ticket</a>
        </button>
      </form>
    </div>
  );
};

export default Createticket;
