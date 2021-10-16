import React, {useState} from "react";
import {updateUser} from "../data/repository";
import ConfirmationModal from "./ConfirmationModal";
import {UserInfoForm} from "./UserInfoForm";
import ErrorMessage from "./ErrorMessage";
import {sanitize, serverErrorMessage} from "./Utils";

/** This component handles the editing of user information. It is rendered
 * when the user clicks the edit button in their profile.
 * */
function EditUserForm(props) {
  const currentUser = props.user;
  const [newUserInfo, setNewUserInfo] = useState({name: "", email: "", password: "", dateJoined: ""});
  const [isDirtied, setIsDirtied] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [errorState, setErrorState] = useState(false);

  const openEditModal = () => setIsOpen(true);
  const closeEditModal = () => setIsOpen(false);

  const modalMessage = "Are you sure you want to update your details?";
  const modalTitle = "Edit Account";

  // change handler.
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

  //handling the submitted data and updating user info
  const handleSubmit = async () => {
    if (newUserInfo.email.trim() === "") {
      newUserInfo.email = currentUser.email;
    }

    if (newUserInfo.name.trim() === "") {
      newUserInfo.name = currentUser.name;
    }

    if (newUserInfo.password.trim() === "") {
      newUserInfo.password = currentUser.password;
    }

    newUserInfo.dateJoined = currentUser.dateJoined;

    //updating in DB
    try {
      await updateUser(newUserInfo, currentUser.email);
      props.loginUser(newUserInfo);
      //return to the profile on submit
      props.closeEditForm()
    } catch (error) {
      setErrorState(true);
      closeEditModal()
    }
  };

  return (
      <div className="formRow">
        <h1 className="formHeader">Update Your Account Details</h1>
        {errorState && <ErrorMessage errorMessage={serverErrorMessage}/>}
        <UserInfoForm userInfo={newUserInfo} handleInputChange={handleInputChange} onSubmit={openEditModal}
                      isEdit={true} onCancel={props.closeEditForm} isDirtied={isDirtied} />

        {/* modal is rendered to confirm submit of editing of info*/}
        <ConfirmationModal
            message={modalMessage}
            headerText={modalTitle}
            modalIsOpen={modalIsOpen}
            closeModal={closeEditModal}
            onSubmit={handleSubmit}
        />
      </div>
  );
}

export default EditUserForm;
