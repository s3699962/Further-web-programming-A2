import React from "react";

/** Common component to display error messages on validation of user info */
function ErrorMessage({errorMessage}) {
  return (
      <div className="form-group errorMessageContainer">
        <span className="error message">
          <i className="fa fa-exclamation-triangle"/>
          {errorMessage}
          </span>
      </div>
  );
}

export default ErrorMessage;
