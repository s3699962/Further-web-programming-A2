import React from "react";

/** Common buttons used in other components */

export function SmallButton({type, onClick, value}) {
  const className = (type === "cancel") ? "cancelButton smallPostButton" : "submitButton smallPostButton";
  return (
      <button className={className} value={type} onClick={onClick}>{value}</button>
  )
}

export function LargeButton({onClick, value, type}) {
  return (
      <button className={type} value={value} onClick={onClick}>{value}</button>
  )
}

export function EditIconButton({onClick}) {
  return (
      <button className="smallButton" onClick={onClick}>
        <i className="fa fa-pencil editImage"/>
        edit
      </button>
  )
}

export function DeleteIconButton({onClick}) {
  return (
      <button className="smallButton" onClick={onClick}>
        <i className="fa fa-trash editImage"/>
        delete
      </button>
  )
}

export function UploadButton({onClick, value, forumUploadButton}) {

  const className = forumUploadButton ? "commentButton addPostButton forumUploadButton" : "commentButton addPostButton";
  return (
      <button className={className} onClick={onClick}>
        <i className="fa fa-camera editImage"/>
        &nbsp;{value}
      </button>
  )
}

export function SmallInvertedIconButton({onClick, type, value, disabled}) {
  const icon = () => {
    if (type === "like") {
      return "fa fa-thumbs-up";
    } else if (type === "dislike") {
      return "fa fa-thumbs-down";
    }
    else return "fa fa-comment";
  };
  const className = disabled ? "commentButton disabledSmallButton" : "commentButton";

  return (
      <button className={className} onClick={onClick} disabled={disabled}>
        <i className={icon()}/> {value}
      </button>
  )
}

export function LargeMaxWidthButton({name, disabled, onSubmit, value}) {
  return (
      <button className={name} disabled={disabled} onClick={onSubmit}>{value}</button>
  )
}

export function SmallToggledButton({inverted, onClick, value}) {
  const className = inverted ? "commentButton toggledButton" : "commentButton invertedCommentButton toggledButton";
  return (
        <button className={className} onClick={onClick}>{value}</button>
    )
}


