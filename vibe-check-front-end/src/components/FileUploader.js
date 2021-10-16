import React from 'react';
import {UploadButton} from "./Buttons";

/** This component is to manage the uploading of files for the forum posts
 * and comments, and profile avatars.
 * */
const FileUploader = ({onFileContentChanged, forumUploadButton, value}) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // click the hidden file input element
  // when the UploadButton is clicked
  const handleClick = event => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  // function to handle the user-selected file
  const handleChange = event => {
    //This is if no file is selected and the upload was cancelled
    if (event.target.files.length === 0) {
      onFileContentChanged(null);
      return
    }
    // convert image to base64
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
};
export default FileUploader;