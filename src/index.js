import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import {
  DashboardUnclaimedTickets,
  DashboardDevs,
  Activedevs,
  Activetickets,
  Navigation,
  Createticket,
  Login,
  Register,
} from "./components";

import { getAllTickets, getAllDevs, getAllUnclaimedTickets } from "./api";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [username, setUsername] = useState("");
  const [tickets, setTickets] = useState([]);
  const [devs, setDevs] = useState([]);
  const [unclaimedTickets, setUnclaimedTickets] = useState([]);

  async function fetchAllUnclaimedTickets() {
    const data = await getAllUnclaimedTickets();
    // console.log("this is unclaimedTickets",data)
    setUnclaimedTickets(data);
  }

  async function fetchAllTickets() {
    const data = await getAllTickets();
    // console.log(data);
    setTickets(data);
  }

  async function fetchAllDevs() {
    const data = await getAllDevs();
    setDevs(data);
  }

  useEffect(() => {
    fetchAllTickets();
    fetchAllDevs();
    fetchAllUnclaimedTickets()

    // console.log(unclaimedTickets);
  }, []);

  return (
    <Router>
      <div id="App">
        <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              username={username}
              setUsername={setUsername}
            />
          </Route>
          <Route path="/activedevs">
            <Activedevs
              devs={devs}
              setDevs={setDevs}
              tickets={tickets}
              setTickets={setTickets}
            />
          </Route>
          <Route path="/activetickets">
            <Activetickets tickets={tickets} setTickets={setTickets} />
          </Route>
          <Route path="/createticket">
            <Createticket />
          </Route>
          <Route path="/dashboard">
            <DashboardUnclaimedTickets devs={devs} unclaimedTickets={unclaimedTickets} tickets={tickets}/>
            <DashboardDevs devs={devs} tickets={tickets}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
