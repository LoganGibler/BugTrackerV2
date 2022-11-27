import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../auth";
import "./currenttask.css"

const Currenttask = ({ tickets, devs }) => {
  let user = getUser();
  console.log(user);
  return (
    <div>
      <div className="current-task-container">
        <h1>Welcome, {user.username}!</h1>
        {devs.length
          ? devs.map((dev) => {
              console.log(devs);
              if (user.userId === dev.id) {
                console.log(dev.username);
                console.log(dev.id);
                if (dev.claimedticket !== 0) {
                  return (
                    <div className="current-task-main-container">
                      <div className="current-task-dev">
                        <h3>
                          Welcome to your personal tasklist, {dev.username}.
                        </h3>
                        <p>Here is your current Claimed Ticket :</p>
                      </div>
                      {tickets.length
                        ? tickets.map((ticket) => {
                            if (dev.claimedticket === ticket.id) {
                              return (
                                <div className="tickets-main-container-currenttask">
                                  <div listed-ticket-currenttask>
                                    <h3>{ticket.title}</h3>
                                    <p>Created By: {ticket.author} "insert email"</p>
                                    
                                    <p>Created: {ticket.time}</p>
                                    <p>{ticket.description}</p>
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
                  return <h1>Start by claiming a ticket!</h1>;
                }
              }
            })
          : null}
      </div>
    </div>
  );
};

export default Currenttask;
