import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./dashboard.css";

const DashboardDevs = ({ devs, tickets }) => {
  return (
    <div>
      <div className="devs-main-container1">
        {devs.length
          ? devs.map((dev) => {
              if (dev.claimedticket !== 0) {
                return (
                  <div>
                    <div className="dashboard-dev-ticket">
                      <h3 className="dashboard-text">{dev.username}</h3>
                      {/* <p className="dashboard-text">ID: {dev.id}</p> */}
                      <p className="dashboard-text">
                        Total Tickets Solved: {dev.ticketssolved}
                      </p>
                      <p>Currently working on ticket {dev.claimedticket}</p>
                    </div>
                    {tickets.length
                      ? tickets.map((ticket) => {
                          if (dev.claimedticket === ticket.id) {
                            return (
                              <div className="tickets-container-dashboard">
                                <div className="listed-ticket-dashboard">
                                  <h3> {ticket.title}</h3>
                                  <p>Origin of Problem: {ticket.category}</p>
                                  <p>Created by: {ticket.author}</p>
                                  <p>At: {ticket.time}</p>
                                  <p>ID: {ticket.id}</p>
                                  <p className="description">
                                    Description: {ticket.description}
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        })
                      : null}
                  </div>
                );
              }
            })
          : null}
      </div>
    </div>
  );
};

export default DashboardDevs;
