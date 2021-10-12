import React from "react";
import Modal from 'react-modal';
import {LargeButton} from "./Buttons";

/** This component is conditionally rendered when the user is prompted to confirm their action,
 * e.g deleting account, comment or post. This is using the react-modal.
 * */

function ConfirmationModal({message, headerText, modalIsOpen, closeModal, onSubmit}) {
  return (
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className="confirmationModal"
      >
        <div className="headerContainer">
          <h2>{headerText}</h2>
          <button onClick={closeModal}>
            <i className="fa fa-times-circle"/>
            close
          </button>
        </div>
        <div className="modalBody">{message}</div>
        <div className="modalButtons">
          <LargeButton type="cancelButton" value="Cancel" onClick={closeModal} />
          <LargeButton type="submitButton" onClick={onSubmit} value={"Confirm"} />
        </div>
      </Modal>
  );
}

export default ConfirmationModal;
