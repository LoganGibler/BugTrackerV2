const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET = "neverTell" } = process.env;

const {
  getUserByUsername,
  allUsers,
  createUser,
  addPointToUser,
} = require("../db/users");

usersRouter.get("/", async (req, res) => {
  console.log("request to users");
  const users = await allUsers();

  res.send({
    users,
  });
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log("this is username", username);
  console.log("this is password", password);
  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    console.log("checking if user exists");
    const user = await getUserByUsername(username);
    // console.log(user)
    if (user.username === username && user.password === password) {
      const token = jwt.sign(
        {
          id: user.id,
          username: username,
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      const userId = user.id;

      res.send({ username, userId, token });
    } else {
      res.send("error sending data, users.js api");
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    let checkifexists = await getUserByUsername(username);
    if (checkifexists !== undefined) {
      res.send("user already exists");
    } else {
      let user = await createUser(username, password);
      // console.log("this is user",user)
      const userId = user.id;
      const token = jwt.sign(
        {
          id: user.id,
          username: username,
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      // console.log("this is token",token)
      res.send({ username, userId, token });
    }
  } catch (error) {
    throw error;
  }
});

usersRouter.post("/addpoint", async (req, res) => {
  const { userId } = req.body;
  try {
    const pointsAdded = addPointToUser(userId);

    res.send({
      pointsAdded,
    });
  } catch (error) {
    throw error;
  }
});

module.exports = usersRouter;
