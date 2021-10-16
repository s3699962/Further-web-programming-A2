import React from 'react';
import {UploadButton} from "./Buttons";


const FileUploader = ({onFileContentChanged, forumUploadButton, value}) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    event.target.files[0].arrayBuffer().then(text => {
      onFileContentChanged(new Buffer(text).toString("base64"));
    });
  };
  return (
      <>
        <UploadButton onClick={handleClick} value={value} forumUploadButton={forumUploadButton}/>
        <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{display: 'none'}}
            accept={"image/*"}
        />
      </>
  );
}
export default FileUploader;