import React, {useState, useEffect} from "react";
import {formattedDate} from "./Utils";
import {createComment, createPostLike, deletePostLike, deletePost, updatePostsList} from "../data/repository";
import ConfirmationModal from "./ConfirmationModal";
import {DeleteIconButton, EditIconButton, SmallInvertedIconButton} from "./Buttons";
import {CommentContainer} from "./CommentContainer";
import {CommentInputSection, EditInputSection} from "./InputSections";

function PostContainer({user, currentPost, posts, setPosts, setServerError}) {
  const [enableEditPost, setEnableEditPost] = useState(false);
  const [comment, setComment] = useState("");
  const [editedPost, setEditedPost] = useState("");
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const [newCommentErrorMessage, setNewCommentErrorMessage] = useState(null);
  const [editPostErrorMessage, setEditPostErrorMessage] = useState(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const like = currentPost.post_likes.some(like => user.email === like.userEmail);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "comment") setComment(value);
    if (name === "editedPost") setEditedPost(value);
    clearErrorMessages();
  };

  const openDeletePostModal = () => setShowDeletePostModal(true);

  const closeDeletePostModal = () => setShowDeletePostModal(false);

  const toggleEditPost = () => {
    setEnableEditPost(!enableEditPost);
  };

  const toggleCommentInput = () => {
    if (showCommentInput) setComment("");
    setShowCommentInput(!showCommentInput);
    setNewCommentErrorMessage(null);
  };

  const handleAddComment = async () => {
    // Trim the post text.
    if (comment.trim() === "") {
      setNewCommentErrorMessage("Your comment is empty. Please enter a message or press cancel.");
      return;
    }

    const newComment = {
      userEmail: user.email,
      text     : comment,
      postId   : currentPost.id
    };
    try {
      const response = await createComment(newComment);

      const editedPostList = [...posts];
      const index = editedPostList.findIndex(post => post.id === currentPost.id);
      const post = editedPostList[index];

      editedPostList[index].comments = [...post.comments, {...response, user: {name: user.name}, comment_likes: []}];
      //update the posts list in state
      setPosts(editedPostList);

      setComment("");
      setShowCommentInput(false);
      clearErrorMessages();
    } catch (error) {
      setServerError(true)
    }
  };

  const handlePostLike = async () => {
    const editedPostList = [...posts];
    const index = editedPostList.findIndex(post => post.id === currentPost.id);
    const post = editedPostList[index];

    if (!like) {
      //create the like
      const response = await createPostLike({userEmail: user.email, postId: currentPost.id});
      editedPostList[index].post_likes = [...post.post_likes, response];

    } else {
      //delete the like
      const likeId = currentPost.post_likes.find(like => user.email === like.userEmail).id;
      await deletePostLike(likeId);
      editedPostList[index].post_likes = editedPostList[index].post_likes.filter(like => like.id !== likeId)
    }
    setPosts(editedPostList);
  };

  const onCancelEditPost = () => {
    clearEditState();
  };

  //TODO
  const handleEditPost = () => {
    if (editedPost.trim() === "") {
      setEditPostErrorMessage("Your post is empty. Please enter a message, or you can cancel or delete the post.");
      return;
    }
    const editedPostList = [...posts];
    const index = editedPostList.findIndex(post => post.id === currentPost.id);
    editedPostList[index].text = editedPost;
    setPosts(editedPostList);
    //update the posts in localStorage
    updatePostsList(posts[index]);

    //clear the state
    clearEditState();
  };

  const handleDeletePost = async () => {
    setPosts(posts.filter(post => post.id !== currentPost.id));
    closeDeletePostModal();
    //delete from backend
    await deletePost(currentPost.id);
    clearEditState();
  };

  const clearEditState = () => {
    setEditedPost("");
    setEnableEditPost(false);
    clearErrorMessages();
  };

  const clearErrorMessages = () => {
    setEditPostErrorMessage(null);
    setNewCommentErrorMessage(null);
  };

  const deletePostModalText = "Are you sure you want to delete this post? The posts and its comments will be forever lost.";
  const deletePostModalHeader = "Delete Post";

  return (

      <div className="postsContainer">
        <div>
          <div className="postUserInfo">
            <h3 className="text-primary">
              <i className="fa fa-user-circle userImage"/> {currentPost.user.name}
            </h3>
            <p className="postDate">{formattedDate(currentPost.dateTime)}</p>
          </div>
          {user.email === currentPost.user.email &&
          <div className="editContainer">
            <EditIconButton onClick={toggleEditPost}/>
            <DeleteIconButton onClick={openDeletePostModal}/>
          </div>
          }
          <ConfirmationModal
              message={deletePostModalText}
              headerText={deletePostModalHeader}
              modalIsOpen={showDeletePostModal}
              closeModal={closeDeletePostModal}
              onSubmit={handleDeletePost}
          />
        </div>

        {enableEditPost
            ? <EditInputSection
                errorMessage={editPostErrorMessage}
                onSubmit={handleEditPost}
                onCancel={onCancelEditPost}
                handleInputChange={handleInputChange}
                editedValue={editedPost}
                initialText={currentPost.text}
                submitButtonText={"Edit Post"}
                inputName={"editedPost"}
            />
            : <p className="postText">"{currentPost.text}"</p>
        }

        <div className="repliesSection">
          <div className="likesContainer">
            <i className="fa fa-heart"/> {currentPost.post_likes.length} Likes
          </div>
          <SmallInvertedIconButton onClick={handlePostLike} type={"like"} value={like ? "Unlike" : "Like"}/>
          <SmallInvertedIconButton onClick={toggleCommentInput} type={"comment"} value={"Comment"}/>
        </div>

        {showCommentInput &&
        <CommentInputSection
            newCommentErrorMessage={newCommentErrorMessage}
            onSubmit={() => handleAddComment(currentPost.id)}
            onCancel={() => toggleCommentInput(currentPost.id)}
            handleInputChange={handleInputChange}
        />
        }
        {currentPost.comments.map(comment =>
            <CommentContainer
                user={user}
                editedPost={currentPost}
                currentComment={comment}
                posts={posts}
                setPosts={setPosts}
                setServerError={setServerError}
            />
        )}
      </div>
  )
}

export default PostContainer;