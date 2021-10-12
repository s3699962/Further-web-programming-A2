import React from "react";
import {SmallButton} from "./Buttons";
import WarningMessage from "./WarningMessage";
import ErrorMessage from "./ErrorMessage";

/** This is the input component for adding new comments*/
export function CommentInputSection({newCommentErrorMessage, onSubmit, onCancel, handleInputChange, comment}) {
  return (
      <div className="commentInputSection">
        <div className="postInputContainer" >
          <textarea name="comment" id="comment" className="postInput" rows="1"
                    placeholder={"Write a comment..."} value={comment} onChange={handleInputChange}/>
        </div>
        { newCommentErrorMessage !== null && <WarningMessage message={newCommentErrorMessage}/>}
        <SmallButton type="submit" value={"Add Comment"} onClick={onSubmit} />
        <SmallButton type="cancel" value={"Cancel"} onClick={onCancel} />
      </div>
  )
}

/** This re-useable component is conditionally rendered when editing posts and comments in the forum */

export function EditInputSection({inputName, errorMessage, onSubmit, onCancel, handleInputChange, editedValue, initialText, submitButtonText}) {
  return (
      <div className="commentInputSection editInput">
          <textarea name={inputName} id="comment" className="postInput" rows="1"
                    placeholder={initialText} value={editedValue} onChange={handleInputChange}/>
          { errorMessage !== null &&
            <div className="warningWrapper">
              <WarningMessage message={errorMessage}/>
            </div>
          }
          <SmallButton type="Post" onClick={onSubmit} value={submitButtonText} />
          <SmallButton type="cancel" value="Cancel" onClick={onCancel} />
      </div>
  )
}

/** Common Input section used on forms */

export const FormInputSection = ({name, value, handleInputChange, validate, placeHolderText, label, isValid, errorMessage}) => {
  return (
      <>
        <div className="form-group">
          <div className={"formComponentContainer labelContainer"}>
            <label htmlFor={name} className="label">{label}</label>
          </div>
          <div className={"formComponentContainer inputContainer"}>
            <input type={name} name={name} id={name} className="formInput" placeholder={placeHolderText}
                   value={value} onChange={handleInputChange} onBlur={validate}/>
          </div>
        </div>
        {/* Display a message on validation fail */}
        {!isValid && <ErrorMessage errorMessage={errorMessage}/>}
      </>
  )
};
