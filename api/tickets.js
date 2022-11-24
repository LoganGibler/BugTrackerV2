const express = require("express");
const ticketsRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
  createTicket,
  getAllTickets,
  getAllUnclaimedTickets,
} = require("../db");

require("dotenv").config();
const { JWT_SECRET = "neverTell" } = process.env;

ticketsRouter.get("/", async (req, res) => {
  const tickets = await getAllTickets();

  res.send({ tickets });
});

ticketsRouter.post("/createticket", async (req, res, next) => {
  const { title, category, description, author, time } = req.body;
  try {
    const newTicket = await createTicket(
      title,
      description,
      category,
      author,
      time
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
  const tickets = await getAllUnclaimedTickets();
  console.log(tickets);
  res.send({
    tickets,
  });
});

module.exports = ticketsRouter;
