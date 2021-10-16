import React, {useState, useEffect} from "react";
import {addAnAvatar, deleteUser, getUser, makeImageUrl, setUser} from "../data/repository";
import {useHistory} from 'react-router-dom';
import ConfirmationModal from "./ConfirmationModal";
import EditUserForm from "./EditUserForm";
import {formattedDate, serverErrorMessage} from "./Utils";
import {DeleteIconButton, EditIconButton} from "./Buttons";
import FileUploader from "./FileUploader";
import ErrorMessage from "./ErrorMessage";

/** The profile component responsible for handling dsiplaying, editing and
 * deleting profile information.
 * */
function MyProfile(props) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [errorState, setErrorState] = useState(false);

  //add uploaded file content and save to database
  const onFileContentChanged = (fileContent) => {
    setFileContent(fileContent);
    addAvatar(fileContent)
  };

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

  //save avatar to database
  const addAvatar = async (fileContent) => {
    try {
      const response = await addAnAvatar(user.email, {image: fileContent});
      const updatedUser = {...user, avatarId: response};
      props.loginUser(updatedUser);
      setUser(updatedUser);
    } catch (error) {
      setErrorState(true);
    }
  };

  //info to display on the confirmation modal
  const headerText = "Delete Account";
  const deleteMessage = "Are you sure you want to delete your account? Once successfully deleted, all your data will be lost."

  const avatarButtonText = user.avatarId ? "Change your avatar" : "Add an avatar";

  return (
      <div className={"bodyContainer"}>
        {errorState && <ErrorMessage errorMessage={serverErrorMessage}/>}
        {/* render respective form when the edit button is clicked */}
        {isEditEnabled
            ? <>
              <EditUserForm {...props} user={user} closeEditForm={closeEditForm}/>
            </>
            : <>
              <h1 className="formHeader profileHeader ">My Profile</h1>
              <div className="profileBody">
                {user.avatarId
                    ? <div className="profileImage">
                      <img className='image' height={"128px"} src={makeImageUrl(user.avatarId)} alt={"profileImage"}/>
                    </div>
                    : <i className="fa fa-user-circle userImage"/>
                }
                <div className="userInfoContainer">
                  <h3><strong>{user.name}</strong></h3>
                  <p>{user.email}</p>
                  <div className="profileBody">
                    <div className="userText dateJoinedHeader">
                      <p>Date Joined:</p>
                    </div>
                    <div className="userText">
                      <p>{formattedDate(user.dateJoined)}</p>
                    </div>
                  </div>
                </div>
                <div className="editContainer">
                  <EditIconButton onClick={() => openEditForm()}/>
                  <DeleteIconButton onClick={() => openModal()}/>
                </div>
              </div>
              <div className="uploadProfileImage">
                <FileUploader onFileContentChanged={onFileContentChanged} value={avatarButtonText}/>
              </div>

              {/*Confirmation modal displayed when the delete button is clicked*/}
              <ConfirmationModal modalIsOpen={modalIsOpen} headerText={headerText} closeModal={closeModal} message={deleteMessage}
                                 onSubmit={deleteUserProfile}/>
            </>
        }
      </div>
  );
}

export default MyProfile;
