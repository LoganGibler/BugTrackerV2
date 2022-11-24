import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./activedevs.css";

const Activedevs = ({ devs, tickets }) => {
  // console.log(tickets.length);
  // console.log(devs.length);
  return (
    <div>
      <div className="devs-main-container">
        {devs.length
          ? devs.map((dev) => {
              if (dev.claimedticket !== 0) {
                return (
                  <div className="dev-container">
                    <div className="listed-dev">
                      <h3 className="text">{dev.username}</h3>
                      <p className="text">ID: {dev.id}</p>
                      <p className="text">
                        Total Tickets Solved: {dev.ticketssolved}
                      </p>
                      {tickets.length ? (
                        tickets.map((ticket) => {
                          let count = 0;
                          if (dev.claimedticket === ticket.id) {
                            return (
                              <div className="ticket-container">
                                <div className="ticket">
                                  <p className="text">
                                    Currently working on: {ticket.title},
                                    created by {ticket.author} on {ticket.time}
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        })
                      ) : (
                        <p> Currently Offline. </p>
                      )}
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

export default Activedevs;
