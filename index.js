const express = require("express");
const server = express();
const api = require('./api')
const cors = require("cors");
server.use(cors());

const morgan = require("morgan");
server.use(morgan("dev"));

// handle application/json requests
server.use(express.json());

// here's our static files
const path = require("path");
server.use(express.static(path.join(__dirname, "build")));
// api
server.use('/api', require('./api'));
// client to db connection
const { client } = require("./db/users");
// listening port
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);
  try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});
