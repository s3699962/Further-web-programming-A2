import React, {useState} from "react";
import {createUser} from "../data/repository";
import {UserInfoForm} from "./UserInfoForm";

/** Sign up component including a form for name, email and password */
function SignUp(props) {
  const [newUserInfo, setNewUserInfo] = useState({name: "", email: "", password: "", dateJoined: ""});
  const [isDirtied, setIsDirtied] = useState(false);

  // Generic change handler.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Copy newUserInfo.
    const temp = {...newUserInfo};

    // Update field and state.
    temp[name] = value;
    setNewUserInfo(temp);
    setIsDirtied(true);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    setNewUserInfo({...newUserInfo}, newUserInfo.dateJoined = new Date());

    // Create user.
    const user = await createUser(newUserInfo);

    //set user state
    props.loginUser(user);

    //setActiveTab in navbar as profile since this is the next component to render
    props.setActiveNavTab("profile");

    //navigate to the profile page
    props.history.push("/profile");
  };


  return (
    <div className="formRow">
      <h1 className="formHeader">Create a new account</h1>
      <UserInfoForm userInfo={newUserInfo} handleInputChange={handleInputChange}
                    onSubmit={handleSubmit} isEdit={false} isDirtied={isDirtied}/>
    </div>
  );
}

export default SignUp;
