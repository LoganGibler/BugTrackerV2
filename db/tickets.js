// const ticketsRouter = require("../api/tickets");
const { client } = require("./users");

async function createTicketDB(
  title,
  description,
  category,
  author,
  time,
  severity
) {
  try {
    const {
      rows: [ticket],
    } = await client.query(
      `
    INSERT INTO tickets(title, description, category, claimed, author, time, severity)
    VALUES ($1, $2, $3, false, $4, $5, $6)
    RETURNING *
    `,
      [title, description, category, author, time, severity]
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
  // console.log("this is userId passed into db", userId);
  try {
    const {
      rows: [claimedticket],
    } = await client.query(`
      SELECT claimedticket FROM users
      WHERE id=${userId};
    `);

    let claimedTicketId = claimedticket.claimedticket;
    // console.log("this is claimed ticket", claimedTicketId);
    // console.log(typeof claimedTicketId)

    const {
      rows: [updatedticket],
    } = await client.query(`
      UPDATE tickets
      SET
      claimed=FALSE
      WHERE id=${claimedTicketId};
    `);

    const {
      rows: [ticket],
    } = await client.query(`
      SELECT * FROM tickets
      WHERE id=${claimedTicketId};
    `);

    let value = 0;
    const { rows } = await client.query(`
        UPDATE users
        SET
        claimedticket=${value}
        WHERE id=${userId}; 
      `);

    const {
      rows: [changeduser],
    } = await client.query(`
        SELECT * FROM users
        WHERE id=${userId};
      `);
    // console.log("after removeClaim runs:");
    // console.log("this is  changeduser", changeduser);
    // console.log("this is updated ticket", ticket);
    return [changeduser, ticket];
  } catch (error) {
    throw error;
  }
}

async function addTicketToUserDB(ticketId, userId) {
  try {
    const {
      rows: [updateuser],
    } = await client.query(`
       UPDATE users
       SET 
       claimedticket = ${ticketId}
       WHERE id = ${userId};
    `);

    const {
      rows: [user],
    } = await client.query(`
       SELECT * FROM users
       WHERE id=${userId}
    `);

    const {
      rows: [changedticket],
    } = await client.query(`
        UPDATE tickets
        SET 
        claimed=TRUE
        WHERE id=${ticketId};
    `);

    const {
      rows: [ticket],
    } = await client.query(`
       SELECT * FROM tickets
       WHERE id=${ticketId}
    `);

    // console.log(
    //   "This is stuff after addtickettouser runs, claimedticket shouldnt be 0:",
    //   user
    // );
    // console.log("this is new claimedTicket:", ticket);
    return ticket;
  } catch (error) {
    throw error;
  }
}


async function addCommentToTicketDB(ticketId, comment){
  console.log("this is comment:", comment)
  try {
    const {rows: [updatedticket],} = await client.query(`
      UPDATE tickets
      SET 
      comments=$1
      WHERE id=$2
    `, [comment, ticketId])

    const {rows: [ticket],} = await client.query(`
      SELECT * FROM tickets
      WHERE id=${ticketId}
    `)

    console.log("ticket with comment:",ticket)
    return updatedticket
  } catch (error) {
    throw error
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
  addCommentToTicketDB
};
