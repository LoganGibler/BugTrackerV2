import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./dashboard.css";
import {
  addPointToUser,
  addTicketToDev,
  deleteTicket,
  removeTicketFromDev,
} from "../api";
import { getUser } from "../auth";

const DashboardUnclaimedTickets = ({ devs, unclaimedTickets, tickets }) => {
  return (
    <div>
      <div className="tickets-main-container">
        {unclaimedTickets.length
          ? unclaimedTickets.map((ticket) => {
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
                          let user = getUser();
                          if (dev.id === user.userId) {
                            if (dev.claimedticket !== 0) {
                              //  if def has claimedticket, we must remove ticketfromdev first
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
                        let user = getUser();
                        addPointToUser(user.userId);
                        deleteTicket(ticket.id);
                        location.reload();
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
      {/* we want user with claimed ticket, then their claimed ticket */}

      {/* then all inactive devs at the bottom */}
    </div>
  );
};

export default DashboardUnclaimedTickets;
