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
      <div className="tickets-main-container">
        {tickets.length
          ? tickets.map((ticket) => {
              // console.log(ticket);
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
                    <p className="description">
                      Description: {ticket.description}
                    </p>
                    {devs.length
                      ? devs.map((dev) => {
                          if (user.userId === dev.id) {
                            return (
                              <button className="comment-button">
                                Add Comment
                              </button>
                            );
                          }
                        })
                      : null}
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
