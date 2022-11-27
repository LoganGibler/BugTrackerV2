const { client } = require("./index.js");
const {
  createUser,
  createTicketDB,
  addTicketToUserDB,
  getUserByUsername,
  getAllUnclaimedTicketsDB,
  addPointToUser,
  removeClaimFromTicketDB
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
    const ticketOne = await createTicketDB(
      "Login Button problems",
      "Login Button Leaks login token to front end console. Likely a uncommented console.log().",
      "FrontEnd",
      "Logan",
      "11/21/2022"
    );
    const ticketTwo = await createTicketDB(
      "Registration Problems",
      "Not getting notified if registration works. Please add alert box. That way we know when stuff works. Also you need to fix the page refreshing Logan.",
      "FrontEnd",
      "Logan",
      "11/23/2022"
    );
    const ticketThree = await createTicketDB(
      "TicketProblem",
      "This is an unclaimed Ticket. I need to see if this query works. Hopefully it does. It is a very serious problem. I should add a urgency value.",
      "Backend",
      "Logan",
      "11/23/2022"
    );
    const ticketFour = await createTicketDB(
      "Microphone is too quite.",
      "It is super sad when no one can hear me because my microphone doesnt work. I think someone needs to help me update my drivers.",
      "Backend",
      "Payton",
      "11/23/2022"
    );
    const ticketFive = await createTicketDB(
      "Developer tools are filled.",
      "We should go through our code and make sure all not used console.logs and other irrelivant things are commented out. Cant be leaking our info!",
      "Backend",
      "Payton",
      "11/23/2022"
    );
    const ticketSix = await createTicketDB(
      "Google Chrome using so much ram.",
      "Google chrome seems to be taking up 80% of my cpu usage. Can we talk about that? I only have 4 tabs open!!!",
      "Backend",
      "Logan",
      "11/23/2022"
    );
    // console.log(ticketOne, ticketTwo, ticketThree)
    return [
      ticketOne,
      ticketTwo,
      ticketThree,
      ticketFour,
      ticketFive,
      ticketSix,
    ];
  } catch (error) {
    // console.log("error creating tickets");
    throw error;
  }
}

async function addTicketToUserTest() {
  try {
    // const ticketTest1 = await addTicketToUser(1,1);
    const ticketTest2 = await addTicketToUserDB(2, 2);
    const ticketTest1 = await addTicketToUserDB(1, 1);
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
  const data = await getAllUnclaimedTicketsDB();
  // console.log("these are unclaimed tickets", data);
  return [data];
}

// async function addPointToUserDBTest(){
//   try {
//     const data = await addPointToUser(1)
//     // console.log(data)
//     return [data]
//   } catch (error) {
//     throw error
//   }
// }

async function removeClaimFromTicketTest() {
  try {
    const data = await removeClaimFromTicketDB();
    console.log(data);
  } catch (error) {
    throw error;
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
    await getUserByUsernameTest();
    await addTicketToUserTest();
    await fetchAllUnclaimedTickets();
    // await addPointToUserDBTest()
    // await removeClaimFromTicketTest()
    console.log("finished building DB");
  } catch (error) {
    console.log("error during rebuild DB");
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
