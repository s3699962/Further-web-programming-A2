import React, {useState} from "react";
import {DeleteIconButton, EditIconButton} from "./Buttons";
import ConfirmationModal from "./ConfirmationModal";
import {EditInputSection} from "./InputSections";
import {deleteComment, updatePostsList} from "../data/repository";

/** This component is responsible for displaying a comment in a post and handling the comment
 * deletion and editing.
 * */

export function CommentContainer({posts, setPosts, user, editedPost, currentComment, setServerError}) {

  const [editedComment, setEditedComment] = useState("");
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [enableEditComment, setEnableEditComment] = useState(false);
  const [errorMessage, setEditCommentErrorMessage] = useState(null);

  /* text to pass to the confirmation modal component */
  const deleteCommentModalText = "Are you sure you want to delete this comment? It will be forever lost.";
  const deleteCommentModalHeader = "Delete Comment";

  const handleInputChange = (event) => {
      setEditedComment(event.target.value);
      setEditCommentErrorMessage(null);
  };

  const closeDeleteCommentModal = () => setShowDeleteCommentModal(false);

  const openDeleteCommentModal = () => setShowDeleteCommentModal(true);

  const toggleEditComment = () => setEnableEditComment(!enableEditComment);

  /* handles the editing of a comment*/
  //TODO
  const handleEditComment = () => {
    if (editedComment.trim() === "") {
      setEditCommentErrorMessage("Your comment is empty. Please enter a message, or you can cancel or delete the comment.");
      return;
    }
    const editedPostList = [...posts];
    const postIndex = editedPostList.findIndex(post => post.id === editedPost.id);
    const post = editedPostList[postIndex];
    const commentIndex = post.comments.findIndex(comment => comment.id === currentComment.id);
    editedPostList[postIndex].comments[commentIndex].comment = editedComment;

    setPosts(editedPostList);
    //update the posts in localStorage
    updatePostsList(posts[postIndex]);

    //clear the state
    clearEditState();
  };

  /* handles the deleting of a comment */
  const handleDeleteComment = async () => {
      try {
        await  deleteComment(currentComment.id);

        //delete the comment from the post list in the state
        const editedPostList = [...posts];
        const postIndex = posts.findIndex(post => post.id === editedPost.id);
        editedPostList[postIndex].comments = editedPostList[postIndex].comments.filter(comment => comment.id !== currentComment.id);
        // set post list in state
        setPosts(editedPostList);

        //reset the state
        closeDeleteCommentModal();
        clearEditState();
      } catch(error) {
        setServerError(true);
        closeDeleteCommentModal();
      }
  };

  const onCancelEditComment = () => {
      clearEditState();
  };

  /* clears all the variables for editing a comment */
  const clearEditState = () => {
    setEditedComment("");
    setEnableEditComment(false);
    setEditCommentErrorMessage(null);
  };

  return (
      <div className="commentContainer">
        <div>
          <div className="postUserInfo">
            <h4>{currentComment.user?.name}</h4>
          </div>
          {user.email === currentComment?.userEmail &&
          <div className="editContainer">
            <EditIconButton onClick={toggleEditComment}/>
            <DeleteIconButton onClick={openDeleteCommentModal}/>
          </div>
          }
          {/* This is the delete confirmation modal that pops up when the delete button is clicked */}
          <ConfirmationModal
              message={deleteCommentModalText}
              headerText={deleteCommentModalHeader}
              modalIsOpen={showDeleteCommentModal}
              closeModal={closeDeleteCommentModal}
              onSubmit={handleDeleteComment}
          />
        </div>
        {/* This edit comment section is only displayed when the edit button is clicked */}
        { enableEditComment
            ? <EditInputSection
                errorMessage={errorMessage}
                onSubmit={handleEditComment}
                onCancel={onCancelEditComment}
                handleInputChange={handleInputChange}
                editedValue={editedComment}
                initialText={currentComment.comment}
                submitButtonText={"Edit Comment"}
                inputName={"editedComment"}
            />
            : <p>{currentComment.text}</p>
        }
      </div>
  )
}