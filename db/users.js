const { Client } = require("pg");
const DB_NAME = "bugtracker";
const DB_URL =
  process.env.DATABASE_URL || `postgres://postgres@localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);
// database methods

async function createUser(reportFields) {
  const { username, password } = reportFields;
  try {
    const {
      rows: [users],
    } = await client.query(
      `
    INSERT INTO users(username, password, claimedTicket, ticketssolved)
    VALUES ($1, $2, 0, 0)
    RETURNING *
    `,
      [username, password]
    );

    return users;
  } catch (error) {
    console.log("Error creating user.");
    throw error;
  }
}


async function allUsers(){
    try {
        const {rows: [users],} = await client.query(`
            SELECT username FROM users
            RETURNING *
        `);
        return users
    } catch (error) {
        throw error
    }
}


async function getUserById(userId){
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE id=$1
    `,
      [userId]
    );
    return user;
  } catch (error) {
    throw error
  }
}

module.exports = {
  client,
  createUser,
  allUsers,
  getUserById,
};
