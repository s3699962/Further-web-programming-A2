import React, {useState} from "react";
import {DeleteIconButton, EditIconButton, SmallInvertedIconButton} from "./Buttons";
import ConfirmationModal from "./ConfirmationModal";
import {EditInputSection} from "./InputSections";
import {createCommentDislike, createCommentLike, deleteComment, deleteCommentLike, makeImageUrl, updateComment} from "../data/repository";
import {sanitize} from "./Utils";

/** This component is responsible for displaying a comment in a post and handling the comment
 * deletion and editing.
 * */

export function CommentContainer({posts, setPosts, user, editedPost, currentComment, setServerError}) {

  const [editedComment, setEditedComment] = useState(currentComment.text);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [enableEditComment, setEnableEditComment] = useState(false);
  const [errorMessage, setEditCommentErrorMessage] = useState(null);
  const like = currentComment.comment_likes.find(like => user.email === like.userEmail);
  const isLiked = like && like.like;
  const isDisliked = like && !like.like;


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
  const handleEditComment = async () => {
    const sanitisedComment = sanitize(editedComment);
    if (sanitisedComment === "") {
      setEditCommentErrorMessage("Your comment is empty. Please enter a message, or you can cancel or delete the comment.");
      return;
    }
    const editedPostList = [...posts];
    const postIndex = editedPostList.findIndex(post => post.id === editedPost.id);
    const post = editedPostList[postIndex];
    const commentIndex = post.comments.findIndex(comment => comment.id === currentComment.id);
    editedPostList[postIndex].comments[commentIndex].text = sanitisedComment;

    try {
      //add to backend DB
      await updateComment({text: sanitisedComment}, currentComment.id);
      //update the posts in state
      setPosts(editedPostList);
    } catch (error) {
      setServerError(true);
    }
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

  const handleCommentLike = async () => {
    const editedPostList = [...posts];
    const postIndex = editedPostList.findIndex(post => post.id === currentComment.postId);
    const post = editedPostList[postIndex];

    const commentIndex = post.comments.findIndex(comment => comment.id === currentComment.id);
    const comment = post.comments[commentIndex];

    try {
      if (!isLiked) {
        //create the like
        const response = await createCommentLike({userEmail: user.email, commentId: currentComment.id, like: true});
        editedPostList[postIndex].comments[commentIndex].comment_likes = [...comment.comment_likes, response];

      } else {
        //delete the like
        const likeId = currentComment.comment_likes.find(like => user.email === like.userEmail).id;
        await deleteCommentLike(likeId);
        editedPostList[postIndex].comments[commentIndex].comment_likes =
            editedPostList[postIndex].comments[commentIndex].comment_likes.filter(like => like.id !== likeId)
      }
      setPosts(editedPostList);
    } catch(error) {
      setServerError(true);
    }
  };

  const handleCommentDislike = async () => {
      const editedPostList = [...posts];
      const postIndex = editedPostList.findIndex(post => post.id === currentComment.postId);
      const post = editedPostList[postIndex];

      const commentIndex = post.comments.findIndex(comment => comment.id === currentComment.id);
      const comment = post.comments[commentIndex];

      try {
        if (!isDisliked) {
          //create the dislike
          const response = await createCommentDislike({userEmail: user.email, commentId: currentComment.id, like: false});
          editedPostList[postIndex].comments[commentIndex].comment_likes = [...comment.comment_likes, response];

        } else {
          //delete the dislike
          const dislikeId = currentComment.comment_likes.find(dislike => user.email === dislike.userEmail).id;
          await deleteCommentLike(dislikeId);
          editedPostList[postIndex].comments[commentIndex].comment_likes =
              editedPostList[postIndex].comments[commentIndex].comment_likes.filter(dislike => dislike.id !== dislikeId)
        }
        setPosts(editedPostList);
      } catch(error) {
        setServerError(true);
      }
    };

  const onCancelEditComment = () => {
      clearEditState();
  };

  /* clears all the variables for editing a comment */
  const clearEditState = () => {
    setEditedComment(currentComment.text);
    setEnableEditComment(false);
    setEditCommentErrorMessage(null);
  };

  return (
      <div className="commentContainer">
        <div>
          <div className="postUserInfo">
            <div className="commentName">
              <h4>{currentComment.user?.name}</h4>
            </div>
            <div className="repliesSection commentLikeSection">
              <div className="likesContainer">
                <i className="fa fa-thumbs-up"/> {currentComment.comment_likes.filter(like => like.like).length} Likes
              </div>
              <SmallInvertedIconButton onClick={handleCommentLike} type={"like"} disabled={isDisliked} value={isLiked ? "Unlike" : "Like"}/>
              <div className="likesContainer">
                <i className="fa fa-thumbs-down"/> {currentComment.comment_likes.filter(dislike => !dislike.like).length} Dislikes
              </div>
              <SmallInvertedIconButton onClick={handleCommentDislike} type={"dislike"} disabled={isLiked} value={isDisliked ? "Un-dislike" : "Dislike"}/>
            </div>
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
                initialText={currentComment.text}
                submitButtonText={"Edit Comment"}
                inputName={"editedComment"}
            />
            : <div className='commentContent'>
              <p>{currentComment.text}</p>
              {currentComment.imageId && <img className='image' height={"400"} src={makeImageUrl(currentComment.imageId)}/>}
            </div>
        }
      </div>
  )
}