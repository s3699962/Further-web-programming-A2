import React from "react";

/** Warning message component to display a warning to the
 *  user on inputing invalid info*/
function WarningMessage({message}) {
  return (
      <div className="warningContainer">
        <span className="message warning">
          <i className="fa fa-exclamation-triangle"/>
          {message}
          </span>
      </div>
  );
}

export default WarningMessage;
