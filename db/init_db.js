const { client } = require("./index.js");
const {
  createUser,
  createTicket,
  addTicketToUser,
  getUserByUsername,
  getAllUnclaimedTickets,
} = require("./index.js");

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
            claimed BOOLEAN,
            author VARCHAR(255) NOT NULL,
            time VARCHAR(255) NOT NULL
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
    const userOne = await createUser("Logan", "123");
    const userTwo = await createUser("Payton", "123");
    return [userOne, userTwo];
  } catch (error) {
    // console.log("Error creating inital users!");
    throw error;
  }
}
async function createInitalTicket() {
  try {
    // console.log("trying to create sample tickets");
    const ticketOne = await createTicket(
      "Login Button problems",
      "Login Button Leaks login token to front end console. Likely a uncommented console.log().",
      "FrontEnd",
      "Logan",
      "11/21/2022"
    );
    const ticketTwo = await createTicket(
      "Registration Problems",
      "Not getting notified if registration works. Please add alert box.",
      "FrontEnd",
      "Logan",
      "11/23/2022"
    );
    const ticketThree = await createTicket(
      "UnclaimedTicketProblem",
      "This is an unclaimed Ticket. I need to see if this query works.",
      "Backend",
      "Logan",
      "11/23/2022"
    )
    // console.log(ticketOne, ticketTwo, ticketThree)
    return [ticketOne, ticketTwo, ticketThree];
  } catch (error) {
    // console.log("error creating tickets");
    throw error;
  }
}

async function addTicketToUserTest() {
  try {
    const ticketTest1 = await addTicketToUser(1,1);
    const ticketTest2 = await addTicketToUser(2,2);
    // console.log("this is after adding ticket to user",ticketTest1, ticketTest2)
    return [ticketTest1, ticketTest2];
  } catch (error) {
    throw error;
  }
}

async function getUserByUsernameTest() {
  try {
    const testUser1 = await getUserByUsername("Logan");
    const testUser2 = await getUserByUsername("Payton");
    // console.log("these are the users", testUser1, testUser2);
    return [testUser1, testUser2];
  } catch (error) {
    throw error;
  }
}

async function fetchAllUnclaimedTickets() {
  const data = await getAllUnclaimedTickets();
  console.log("these are unclaimed tickets",data);
  return [data];
}

async function rebuildDB() {
  try {
    console.log("starting to build DB");
    client.connect();
    await dropTables();
    await buildTables();
    await createInitalUsers();
    await createInitalTicket();
    await getUserByUsernameTest();
    await addTicketToUserTest();
    await fetchAllUnclaimedTickets();
    console.log("finished building DB");
  } catch (error) {
    console.log("error during rebuild DB");
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
