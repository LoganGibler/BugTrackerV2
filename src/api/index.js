import axios from "axios";
import { title } from "process";
import { storeToken, storeUser } from "../auth";
const BASE = "http://localhost:5000/api";

// this is an example for an api call with axios

// export async function getUsers() {
//   try {
//     const { data } = await axios.get(`${ BASE }/users`);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

export async function loginUser(username, password) {
  try {
    const { data } = await axios.post(`http://localhost:5000/api/users/login`, {
      username: username,
      password: password,
    });
    storeToken(data.token);
    // console.log("this is data",data)
    return data;
  } catch (error) {
    // console.log("error at index.js api front end loginUser");
    throw error;
  }
}

export async function allUsers() {
  try {
    const res = await axios({
      method: "get",
      url: "http://localhost:5000/api/users",
    });
    // console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(username, password) {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/users/register",
      {
        username: username,
        password: password,
      }
    );
    // console.log(data)
    storeToken.apply(data.token);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createATicket(
  title,
  description,
  category,
  author,
  time
) {
  try {
    // console.log(title, description, category, author, time)
    const { data } = await axios.post(
      "http://localhost:5000/api/tickets/createticket",
      {
        title: title,
        category: category,
        description: description,
        author: author,
        time: time,
      }
    );

    // console.log(data)
    return data;
  } catch (error) {}
}

export async function getAllTickets(){
  try {
    const { data } = await axios.get("http://localhost:5000/api/tickets")
    return data.tickets
  } catch (error) {
    throw error
  }
}

export async function getAllDevs(){
try {
  const {data} = await axios.get("http://localhost:5000/api/users")

  return data.users
} catch (error) {
  throw data
}
}

export async function getAllUnclaimedTickets(){
  try {
    const {data} = await axios.get("http://localhost:5000/api/tickets/unclaimed")
    console.log(data)
    return data.tickets
  } catch (error) {
    throw error
  }
}
