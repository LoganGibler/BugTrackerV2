import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../auth";
import {
  addPointToUser,
  deleteTicket,
  removeTicketFromDev,
  addTicketToDev,
  addCommentToTicket,
} from "../api";
import "./currenttask.css";

const Currenttask = ({ tickets, devs, unclaimedTickets }) => {
  const [html, setHtml] = useState(null);
  let user = getUser();

  function renderCommentBox(ticket) {
    try {
      function getCommentInput() {
        let comment = document.getElementById("comment-area").value;
        console.log(comment);
        console.log(ticket.id);
        addCommentToTicket(ticket.id, comment);
      }

      return (
        <div>
          <textarea
            className="comment-input-area"
            id="comment-area"
            type="text"
            placeholder="Type comments here.."
          ></textarea>
          <button
            className="comment-button-submit"
            onClick={() => {
              getCommentInput();
              location.reload();
            }}
          >
            Submit Comment
          </button>
        </div>
      );
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <div className="everything-current-task">
        <div className="current-task-container">
          {devs.length
            ? devs.map((dev) => {
                // console.log(devs);
                if (user.userId === dev.id) {
                  // console.log(dev.username);
                  // console.log(dev.id);
                  if (dev.claimedticket !== 0) {
                    return (
                      <div className="current-task-main-container">
                        <div className="current-task-dev">
                          <h3>
                            Welcome to your personal tasklist, {dev.username}.
                          </h3>
                          <p>Total tasks completed: {dev.ticketssolved}</p>
                          <p>Here is your current Claimed Ticket :</p>
                        </div>
                        {tickets.length
                          ? tickets.map((ticket) => {
                              if (dev.claimedticket === ticket.id) {
                                return (
                                  <div className="tickets-main-container-currenttask">
                                    <div listed-ticket-currenttask>
                                      <h3>{ticket.title}</h3>
                                      <p>Created By: {ticket.author}</p>
                                      <p>*insert email of user*</p>
                                      <p>Created: {ticket.time}</p>
                                      <p className="description-currenttask">
                                        {ticket.description}
                                      </p>
                                      <h5 className="username-comment">Dev Notes:</h5>
                                      <p className="ticket-comments">{ticket.comments}</p>
                                      {html}
                                      <button
                                        className="ticket-buttons"
                                        onClick={async (e) => {
                                          let user = getUser();
                                          addPointToUser(user.userId);
                                          deleteTicket(ticket.id);
                                          location.reload();
                                          alert("Ticket Solved, point added.");
                                        }}
                                      >
                                        Solved
                                      </button>
                                      <button
                                        className="ticket-buttons"
                                        onClick={() => {
                                          setHtml(renderCommentBox(ticket));
                                        }}
                                      >
                                        {" "}
                                        Add Comment
                                      </button>
                                      <button
                                        className="ticket-buttons"
                                        onClick={async (e) => {
                                          let user = getUser();
                                          removeTicketFromDev(user.userId);
                                          location.reload();
                                          alert("Ticket unclaimed.");
                                        }}
                                      >
                                        Unclaim
                                      </button>
                                    </div>
                                  </div>
                                );
                              }
                            })
                          : null}
                      </div>
                    );
                  }
                  // return statement here if no claimed ticket
                  else {
                    // render unclaimed tickets here with buttons to claim
                    return (
                      <div>
                        <div className="unclaimed-tickets-main-container-currenttask">
                          <div>
                            <h3>
                              Welcome to your personalized task list,{" "}
                              {user.username}.
                            </h3>
                            <p>Total tasks completed: {dev.ticketssolved}</p>
                            <p>
                              You have no active ticket! Start by claiming a
                              ticket.
                            </p>
                          </div>
                          {unclaimedTickets.length
                            ? unclaimedTickets.map((ticket) => {
                                return (
                                  <div className="unclaimed-tickets-container-currenttask">
                                    <div className="unclaimed-listed-ticket-currenttask">
                                      <h3> {ticket.title}</h3>
                                      <p>
                                        Origin of Problem: {ticket.category}
                                      </p>
                                      <p>Created by: {ticket.author}</p>
                                      <p>At: {ticket.time}</p>
                                      <p>ID: {ticket.id}</p>
                                      <p className="description">
                                        Description: {ticket.description}
                                      </p>
                                      <button
                                        className="ticket-buttons"
                                        onClick={async (e) => {
                                          let user = getUser();
                                          // need a removeTicketFromDev
                                          // removeTicketFromDev(user.userId);
                                          addTicketToDev(
                                            ticket.id,
                                            user.userId
                                          );
                                          location.reload();
                                          alert("Ticket successfully added");
                                        }}
                                      >
                                        Claim
                                      </button>
                                    </div>
                                  </div>
                                );
                              })
                            : null}
                        </div>
                      </div>
                    );
                  }
                }
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Currenttask;
