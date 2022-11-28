const express = require("express");
const ticketsRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
  createTicketDB,
  getAllTicketsDB,
  getAllUnclaimedTicketsDB,
  addTicketToUserDB,
  deleteTicketDB,
  removeClaimFromTicketDB,
  addCommentToTicketDB
} = require("../db/tickets");

require("dotenv").config();
const { JWT_SECRET = "neverTell" } = process.env;

ticketsRouter.get("/", async (req, res) => {
  const tickets = await getAllTicketsDB();

  res.send({ tickets });
});

ticketsRouter.post("/createticket", async (req, res, next) => {
  const { title, category, description, author, time, severity } = req.body;
  try {
    const newTicket = await createTicketDB(
      title,
      description,
      category,
      author,
      time,
      severity
    );
    // console.log(newTicket)
    res.send({
      newTicket,
    });
  } catch (error) {
    throw error;
  }
});

ticketsRouter.get("/unclaimed", async (req, res) => {
  const tickets = await getAllUnclaimedTicketsDB();
  // console.log(tickets);
  res.send({
    tickets,
  });
});

ticketsRouter.post("/claimticket", async (req, res, next) => {
  const { ticketId, userId } = req.body;
  // console.log("request to claim ticket");
  const data = await addTicketToUserDB(ticketId, userId);
  // console.log(data);
  res.send({
    data,
  });
})

ticketsRouter.post("/delete", async (req, res, next) => {
  const { ticketId } = req.body;

  const data = await deleteTicketDB(ticketId);
  res.send({
    data,
  });
});

ticketsRouter.post("/removeclaim", async (req, res, next) => {
  const { userId } = req.body;
  // console.log("request to unclaim ticket");
  const data = await removeClaimFromTicketDB(userId);
  // console.log("this is cracked data",data)
  res.send({ data });
});

ticketsRouter.post("/comment", async (req, res, next)=>{
  const {ticketId, comment} = req.body
  console.log(ticketId, comment)
  const data = await addCommentToTicketDB(ticketId, comment)
  console.log(data)
  res.send({
    data
  })
})

module.exports = ticketsRouter;
