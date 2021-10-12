import React from "react";
import home_image from "../home_image.jpg"

/** Home component to display some information and a picture. */
function Home(props) {
  return (
    <div className="bodyContainer">
      <div>
        <h1 className="formHeader profileHeader">Vibe Check</h1>
        {props.user && <h4><strong>Hello {props.user.name}!</strong></h4>}
      </div>
      <div className="homeAboutContainer">
        <div className="mainInfo textContainer">
          {MAIN_ABOUT_INFO}
        </div>
        <div className="mainInfo">
          <img src={home_image} alt="Home Page" height="200"/>
        </div>
        <div className="loginInfo">
          {!props.user && LOGIN_INFO}
        </div>
      </div>
    </div>
  );
}

export default Home;


export const MAIN_ABOUT_INFO = "Vibe Check is a new university-wide student social networking web application. Students often liaise " +
    "with other fellow students, friends at university to discuss questions, " +
    "queries, issues and suggestions about the courses they are studying. Vibe Check will also provide a friendly network to" +
    " keep in touch with each other during extended periods of COVID-19 lockdown." +
    " Students will be able to sign up easily with their personal information, make posts and view posts from other students. They will have the ability to " +
    "reply and comment on other student's posts as well. Additionally, they can edit any of their own profile information, posts and comments so they are" +
    " always in control.";

export const LOGIN_INFO = "Login or sign up today to meet new people!";