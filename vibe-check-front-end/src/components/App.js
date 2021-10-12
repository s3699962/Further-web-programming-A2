import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import MyProfile from "./MyProfile";
import Forum from "./Forum";
import { getUser, removeUser} from "../data/repository";
import './../App.css'
import SignUpMenu from "./SignUpMenu";

/** The main App component. It defines the routes and what components will be rendered */
function App() {
  const [user, setUser] = useState(getUser());
  const [activeNavTab, setActiveNavTab] = useState(window.location.pathname.substring(1) || "home");

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };

  //This sets the active tab in the nav bar. It is for styling purposes
  const setActiveTab = (activeNavTab) => setActiveNavTab(activeNavTab);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar user={user} logoutUser={logoutUser} setActiveNavTab={setActiveTab} activeNavTab={activeNavTab}/>
        <main role="main" className={"main"}>
          <div className="container my-3 parentBody">
            <Switch>
              <Route path="/login" render={props => (
                  <SignUpMenu {...props} loginUser={loginUser} setActiveNavTab={setActiveTab}/>
              )}/>
              <Route path="/profile">
                <MyProfile user={user} setActiveTab={setActiveTab} logoutUser={logoutUser} loginUser={loginUser}/>
              </Route>
              <Route path="/forum">
                <Forum user={user} />
              </Route>
              <Route path="/">
                <Home user={user} />
              </Route>
            </Switch>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
