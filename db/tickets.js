const { client } = require("./users");

async function createTicket(reportFields) {
  const { title, description, category } = reportFields;

  try {
    const {
      rows: [ticket],
    } = await client.query(
      `
    INSERT INTO tickets(title, description, category, claimed)
    VALUES ($1, $2, $3, false)
    RETURNING *
    `,
      [title, description, category]
    );
    return ticket;
  } catch (error) {
    throw error;
  }
}

async function getAllTickets() {
  try {
    const { rows: tickets } = await client.query(`
        SELECT * FROM tickets;
        `);
    return tickets;
  } catch (error) {
    throw error;
  }
}

async function getAllUnclaimedTickets() {
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

async function getAllFrontEndTickets() {
  try {
    const { rows: tickets } = await client.query(`
            SELECT * FROM tickets
            WHERE category="Front End";
        `);
    return tickets;
  } catch (error) {
    throw error;
  }
}

async function getAllBackEndTickets() {
  try {
    const { rows: tickets } = await client.query(`
            SELECT * FROM tickets
            WHERE category="Back End";
        `);
    return tickets;
  } catch (error) {
    throw error;
  }
}
// set user-claimedticket to ticketID
// need to get userID and ticketID, kinda weird?
async function addTicketToUser(reportFields) {
  const { claimedticket, id } = reportFields;

  try {
    const {
      rows: [user],
    } = await client.query(`
       UPDATE users
       SET 
       claimedticket = ${claimedticket}
       WHERE id = ${id};
    `);

    const {
      rows: [ticket],
    } = await client.query(`
        UPDATE tickets
        SET 
        claimed=True
        WHERE id=${claimedticket};
    `);
    return user;
  } catch (error) {
    throw error;
  }
}

async function solveTicket(){
        const solved = "Solved"
    try {
        const {rows: [tickets]} = await client.query(`
            UPDATE tickets
            SET
            category = ${solved};
        `);
        return tickets
    } catch (error) {
        throw error
    }
}

async function getTicketByUsername(username) {}

async function deleteTicket(ticketId) {
  try {
    const {
      rows: [tickets],
    } = await client.query(`
          DELETE FROM tickets
          WHERE id=${ticketId};
          `);
    return products;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTicket,
  getAllTickets,
  getAllUnclaimedTickets,
  getAllFrontEndTickets,
  getAllBackEndTickets,
  deleteTicket,
  addTicketToUser,
  solveTicket,
};
