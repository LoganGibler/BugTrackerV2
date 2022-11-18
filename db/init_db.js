const { client } = require("./index.js");
const { createUser, createTicket, addTicketToUser } = require("./index.js");
 
async function dropTables() {
  try {
    console.log("Starting to drop tables");
    await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS tickets;
        `);
  } catch (error) {
    console.log("Error dropping tables.");
    throw error;
  }
}

async function buildTables() {
  try {
    console.log("Starting to build tables");
    await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            claimedticket INTEGER,
            ticketssolved INTEGER
        );
        CREATE TABLE tickets(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            category VARCHAR(255),
            claimed BOOLEAN
        );
        `);
    console.log("Finished building tables");
  } catch (error) {
    console.log("Error building tables");
    throw error;
  }
}

async function createInitalUsers() {
  try {
    // console.log("attempting to create initial users...");
    const userOne = await createUser({
      username: "logan",
      password: "123",
    });
    const userTwo = await createUser({
      username: "payton",
      password: "admin",
    });
    return [userOne, userTwo];
  } catch (error) {
    // console.log("Error creating inital users!");
    throw error;
  }
}
async function createInitalTicket() {
  try {
    // console.log("trying to create sample tickets");
    const ticketOne = await createTicket({
      title: "Login Button problems",
      description:
        "Login Button Leaks login token to front end console. Likely a uncommented console.log().",
      category: "Front End",
    });
    const ticketTwo = await createTicket({
      title: "Only getting unclaimed tickets",
      description:
        "When I click the button that shows all unsolved tickets, it shows only unclaimed tickets.",
      category: "Back End",
    });
    // console.log(ticketTwo);
    return [ticketOne, ticketTwo];
  } catch (error) {
    // console.log("error creating tickets");
    throw error;
  }
}

async function addTicketToUserTest(){
    try {
        const ticketTest1 = await addTicketToUser({
            claimedticket: 2,
            id: 1,
        })

        return [ticketTest1]
    } catch (error) {
        throw error
    }
}

async function rebuildDB() {
  try {
    console.log("starting to build DB");
    client.connect();
    await dropTables();
    await buildTables();
    await createInitalUsers();
    await createInitalTicket();
    await addTicketToUserTest();
    console.log("finished building DB");
  } catch (error) {
    console.log("error during rebuild DB");
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
