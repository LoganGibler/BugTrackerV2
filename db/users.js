const { Client } = require("pg");
const DB_NAME = "bugtracker";
const DB_URL =
  process.env.DATABASE_URL || `postgres://postgres@localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);
// database methods

async function createUser(username, password) {
  try {
    const {
      rows: [users],
    } = await client.query(
      `
    INSERT INTO users(username, password, claimedticket, ticketssolved)
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

async function allUsers() {
  try {
    const { rows } = await client.query(`
            SELECT * FROM users
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
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
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users 
      WHERE username=$1
    `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function addPointToUser(userId) {
  try {
    const {
      rows: [points],
    } = await client.query(
      `
      SELECT ticketssolved FROM users
      WHERE id=${userId}
    `
    );
    console.log(points.ticketssolved)
    let increasedPoints = points.ticketssolved + 1;
    console.log(increasedPoints)
    //     let increasedPoints = points + 1;

    const {
      rows: [user],
    } = await client.query(
      `
            UPDATE users
            SET
            ticketssolved=${increasedPoints}
            WHERE id=${userId};
        `
    );
    console.log(user);
        let value = 0
        const { rows } = await client.query(`
          UPDATE users
          SET
          claimedticket=${value}
          WHERE id=${userId};
        `)

    //     return claimedticketvalue;
    // return points;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
  allUsers,
  getUserById,
  getUserByUsername,
  addPointToUser,
};
