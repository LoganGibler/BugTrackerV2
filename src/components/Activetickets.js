import React, { useState, useEffect, useReducer } from "react";
import { NavLink } from "react-router-dom";
// import { deleteTicket } from "../../db";
import {
  addPointToUser,
  addTicketToDev,
  deleteTicket,
  removeTicketFromDev,
} from "../api";
import { getUser } from "../auth";
import "./activeTickets.css";

const Activetickets = ({ tickets, devs }) => {
  let user = getUser();

  return (
    <div>
      {/* <h1>Welcome to the Activetickets Component</h1> */}
      <div className="tickets-main-container">
        {tickets.length
          ? tickets.map((ticket) => {
              // console.log(ticket);
              return (
                <div className="tickets-container">
                  <div className="listed-ticket">
                    <h3> {ticket.title}</h3>
                    <p>Origin of Problem: {ticket.category}</p>
                    <p>Created by: {ticket.author}</p>
                    <p>At: {ticket.time}</p>
                    <p>ID: {ticket.id}</p>
                    <p className="description">
                      Description: {ticket.description}
                    </p>
                    {devs.length
                      ? devs.map((dev) => {
                          if (user.userId === dev.id) {
                            if (dev.claimedticket !== 0) {
                              return (
                                <button
                                  className="ticket-buttons"
                                  onClick={async (e) => {
                                    removeTicketFromDev(user.userId);
                                    addTicketToDev(ticket.id, user.userId);
                                    location.reload();
                                    alert("Ticket successfully added");
                                  }}
                                >
                                  Claim
                                </button>
                              );
                            }
                            if (dev.claimedticket === 0) {
                              return (
                                <button
                                  className="ticket-buttons"
                                  onClick={async (e) => {
                                    addTicketToDev(ticket.id, user.userId);
                                    location.reload();
                                    alert("Ticket successfully added");
                                  }}
                                >
                                  Claim
                                </button>
                              );
                            }
                          }
                        })
                      : null}
                    <button
                      className="ticket-buttons"
                      onClick={async (e) => {
                        addPointToUser(user.userId);
                        deleteTicket(ticket.id);
                        alert("Ticket Solved, point added.");
                      }}
                    >
                      Solved
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Activetickets;
