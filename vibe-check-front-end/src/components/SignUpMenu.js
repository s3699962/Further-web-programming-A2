import React, {useState} from "react";
import Login from "./Login";
import SignUp from "./SignUp";

/** The sign up menu is the parent component that renders the
 * login form or sign up form depending on what tab the user has clicked (activeTab)
 * */

function SignUpMenu(props) {
  const [activeTab, setActiveTab] = useState("login");

  const setLoginActiveTab = () => setActiveTab("login");
    const setSignUpActiveTab = () => setActiveTab("signUp");

  return (
    <div className={"bodyContainer"}>
      <nav className={"containerTabs"}>
        <div className={activeTab === "login" ? "activeTabButton tabButton" : "tabButton"}>
          <button onClick={setLoginActiveTab}>Login</button>
        </div>
        <div className={activeTab === "signUp" ? "activeTabButton tabButton" : "tabButton"}>
          <button className={"mainHeader"} onClick={setSignUpActiveTab}>Sign Up</button>
        </div>
      </nav>
      {activeTab === "login" && <Login {...props}/>}
      {activeTab === "signUp" && <SignUp {...props}/>}
    </div>

  );
}

export default SignUpMenu;
