import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import { deleteTicket } from "../../db";
import { addPointToUser, addTicketToDev, deleteTicket, removeTicketFromDev } from "../api";
import { getUser } from "../auth";
import "./activeTickets.css";

const Activetickets = ({ tickets }) => {
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
                    <button
                      className="ticket-buttons"
                      onClick={async (e) => {
                        let user = getUser();
                        removeTicketFromDev(user.userId)
                        addTicketToDev(ticket.id, user.userId);
                        alert("Ticket successfully added")
                      }}
                    >
                      Claim
                    </button>
                    <button
                      className="ticket-buttons"
                      onClick={async (e) => {
                        let user = getUser();
                        // Solved Button (DELETE and add point)
                        // functioncall from api
                        addPointToUser(user.userId);
                        deleteTicket(ticket.id);
                        alert("Ticket Solved, point added.")
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
