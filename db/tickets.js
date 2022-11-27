// const ticketsRouter = require("../api/tickets");
const { client } = require("./users");

async function createTicketDB(title, description, category, author, time) {
  try {
    const {
      rows: [ticket],
    } = await client.query(
      `
    INSERT INTO tickets(title, description, category, claimed, author, time)
    VALUES ($1, $2, $3, false, $4, $5)
    RETURNING *
    `,
      [title, description, category, author, time]
    );
    return ticket;
  } catch (error) {
    throw error;
  }
}

async function getAllTicketsDB() {
  try {
    const { rows: tickets } = await client.query(`
        SELECT * FROM tickets;
        `);
    return tickets;
  } catch (error) {
    throw error;
  }
}

async function getAllUnclaimedTicketsDB() {
  try {
    const { rows: tickets } = await client.query(`
        SELECT * FROM tickets
        WHERE claimed=false;
        `);
    return tickets;
  } catch (error) {
    throw error;
  }
}

async function getAllFrontEndTicketsDB() {
  try {
    const { rows: tickets } = await client.query(`
            SELECT * FROM tickets
            WHERE category="FrontEnd";
        `);
    return tickets;
  } catch (error) {
    throw error;
  }
}

async function getAllBackEndTicketsDB() {
  try {
    const { rows: tickets } = await client.query(`
            SELECT * FROM tickets
            WHERE category="BackEnd";
        `);
    return tickets;
  } catch (error) {
    throw error;
  }
}
// set user-claimedticket to ticketID
// need to get userID and ticketID, kinda weird?
async function addTicketToUserDB(ticketId, userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
       UPDATE users
       SET 
       claimedticket = ${ticketId}
       WHERE id = ${userId};
    `);

    const {
      rows: [ticket],
    } = await client.query(`
        UPDATE tickets
        SET 
        claimed=True
        WHERE id=${ticketId};
    `);
    return ticket;
  } catch (error) {
    throw error;
  }
}

// async function solveTicketDB() {
//   const solved = "Solved";
//   try {
//     const {
//       rows: [tickets],
//     } = await client.query(`
//             UPDATE tickets
//             SET
//             category = ${solved};
//         `);
//     return tickets;
//   } catch (error) {
//     throw error;
//   }
// }

async function getTicketByUsername(username) {}

async function deleteTicketDB(ticketId) {
  try {
    const {
      rows: [ticket],
    } = await client.query(
      `
          DELETE FROM tickets
          WHERE id=$1;
          `,
      [ticketId]
    );
    return ticket;
  } catch (error) {
    throw error;
  }
}

// let claimedTicketId;
async function removeClaimFromTicketDB(userId) {
  try {
    const {
      rows: [claimedticket],
    } = await client.query(`
      SELECT claimedticket FROM users
      WHERE id=${userId};
    `);

    let claimedTicketId = claimedticket.claimedticket;
    console.log("this is claimed ticket", claimedTicketId);
    // console.log(typeof claimedTicketId)
    const {
      rows: [ticket],
    } = await client.query(`
      UPDATE tickets
      SET
      claimed=FALSE
      WHERE id=${claimedTicketId};
    `,);
    console.log("this is changed ticket",ticket)
    return ticket
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTicketDB,
  getAllTicketsDB,
  getAllUnclaimedTicketsDB,
  getAllFrontEndTicketsDB,
  getAllBackEndTicketsDB,
  deleteTicketDB,
  addTicketToUserDB,
  // solveTicketDB,
  removeClaimFromTicketDB,
  // addFalseToTicket,
};
