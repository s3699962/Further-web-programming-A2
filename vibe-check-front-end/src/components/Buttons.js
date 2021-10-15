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

export function SmallInvertedIconButton({onClick, type, value}) {
  const icon = (type === "like") ? "fa fa-heart" : "fa fa-comment";
  return (
      <button className="commentButton" onClick={onClick}>
        <i className={icon}/> {value}
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


