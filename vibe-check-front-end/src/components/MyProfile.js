import React, { useState } from "react";
import {deleteUser, getUser} from "../data/repository";
import { useHistory } from 'react-router-dom';
import ConfirmationModal from "./ConfirmationModal";
import EditUserForm from "./EditUserForm";
import {formattedDate} from "./Utils";
import {DeleteIconButton, EditIconButton} from "./Buttons";

/** The profile component responsible for handling dsiplaying, editing and
 * deleting profile information.
 * */
function MyProfile(props) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const openEditForm = () => setIsEditEnabled(true);
  const closeEditForm = () => setIsEditEnabled(false);

  const user = props.user;
  const history = useHistory();

  //delete user profile handler
  const deleteUserProfile = async () => {
    await deleteUser(user.email);
    // Navigate to the home page.
    props.setActiveTab("home");
    history.push("/home");
    props.logoutUser();
  };

  //info to display on the confirmation modal
  const headerText = "Delete Account";
  const deleteMessage = "Are you sure you want to delete your account? Once successfully deleted, all your data will be lost."

  return (
    <div className={"bodyContainer"}>

      {/* render respective form when the edit button is clicked */}
      {isEditEnabled
        ? <>
            <EditUserForm {...props} user={user} closeEditForm={closeEditForm}/>
          </>
        : <>
          <h1 className="formHeader profileHeader ">My Profile</h1>
          <div className="profileBody">
            <i className="fa fa-user-circle userImage"/>
            <div className="userInfoContainer">
              <h3><strong>{user.name}</strong></h3>
              <p>{user.email}</p>
            </div>
            <div className="editContainer">
              <EditIconButton onClick={() => openEditForm()}/>
              <DeleteIconButton onClick={() => openModal()}/>
            </div>
          </div>
          <div className="profileBody">
            <div className="userText dateJoinedHeader">
              <p>Date Joined:</p>
            </div>
            <div className="userText">
              <p>{formattedDate(user.dateJoined)}</p>
            </div>
          </div>
            {/*Confirmation modal displayed when the delete button is clicked*/}
          <ConfirmationModal modalIsOpen={modalIsOpen} headerText={headerText} closeModal={closeModal} message={deleteMessage} onSubmit={deleteUserProfile}/>
        </>
      }
    </div>
  );
}

export default MyProfile;
