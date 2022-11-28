import React, { useState, useEffect, useReducer } from "react";
import { render } from "react-dom";
import { NavLink } from "react-router-dom";

import { addCommentToTicket } from "../api";
import { getUser } from "../auth";
import "./activeTickets.css";

const Activetickets = ({ tickets, devs }) => {
  let user = getUser();
  const [html, setHtml] = useState(null);
  const [trigger, setTrigger] = useState(false);

  function renderCommentBox() {
    return (
      <div>
        <input>this is text area</input>
      </div>
    );
  }

  return (
    <div>
      <div className="tickets-main-container">
        {tickets.length
          ? tickets.map((ticket) => {
              if (ticket.comments === null) {
                return (
                  <div className="tickets-container">
                    <div className="listed-ticket">
                      <h3> {ticket.title}</h3>
                      <p>Origin of Problem: {ticket.category}</p>
                      <p>Severity: {ticket.severity}</p>
                      <p>Category: {ticket.category}</p>
                      <p>Created by: {ticket.author}</p>
                      <p>At: {ticket.time}</p>
                      <p>ID: {ticket.id}</p>
                      <h4 className="description">Description</h4>
                      <p>{ticket.description}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="tickets-container">
                    <div className="listed-ticket">
                      <h3> {ticket.title}</h3>
                      <p>Origin of Problem: {ticket.category}</p>
                      <p>Severity: {ticket.severity}</p>
                      <p>Category: {ticket.category}</p>
                      <p>Created by: {ticket.author}</p>
                      <p>At: {ticket.time}</p>
                      <p>ID: {ticket.id}</p>
                      <h4 className="description">Description</h4>
                      <p>{ticket.description}</p>
                      <h4 className="description">Dev Notes:</h4>
                      <p>{ticket.comments}</p>
                    </div>
                  </div>
                );
              }
            })
          : null}
      </div>
    </div>
  );
};

export default Activetickets;
