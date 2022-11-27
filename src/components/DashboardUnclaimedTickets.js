import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./dashboard.css";
import { addPointToUser, addTicketToDev, deleteTicket, removeTicketFromDev} from "../api";
import { getUser } from "../auth";

const DashboardUnclaimedTickets = ({ devs, unclaimedTickets, tickets }) => {
  // console.log("this is unclaimedTickets", unclaimedTickets);
  // console.log("this is devs", devs);
  return (
    <div>
      {/* we want all unclaimed tickets up at the top */}
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
                    <button
                      className="ticket-buttons"
                      onClick={async (e) => {
                        let user = getUser();
                        // need a removeTicketFromDev
                        removeTicketFromDev(user.userId)
                        addTicketToDev(ticket.id, user.userId);
                        alert("Ticket successfully added");
                      }}
                    >
                      Claim
                    </button>
                    <button
                      className="ticket-buttons"
                      onClick={async (e) => {
                        let user = getUser();
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
      {/* we want user with claimed ticket, then their claimed ticket */}

      {/* then all inactive devs at the bottom */}
    </div>
  );
};

export default DashboardUnclaimedTickets;
