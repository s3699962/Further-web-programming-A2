import React, {useState} from "react";
import {formattedDate, sanitize} from "./Utils";
import {createComment, createPostLike, deletePostLike, deletePost, updatePost, makeImageUrl, createPostDislike} from "../data/repository";
import ConfirmationModal from "./ConfirmationModal";
import {DeleteIconButton, EditIconButton, SmallInvertedIconButton} from "./Buttons";
import {CommentContainer} from "./CommentContainer";
import {CommentInputSection, EditInputSection} from "./InputSections";

/** Component is used to manage displaying a post information along with
 * likes and comments.
 * */
function PostContainer({user, currentPost, posts, setPosts, setServerError}) {

  const [enableEditPost, setEnableEditPost] = useState(false);
  const [comment, setComment] = useState("");
  const [editedPost, setEditedPost] = useState(currentPost.text);
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const [newCommentErrorMessage, setNewCommentErrorMessage] = useState(null);
  const [editPostErrorMessage, setEditPostErrorMessage] = useState(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const like = currentPost.post_likes.find(like => user.email === like.userEmail);
  const isLiked = like && like.like;
  const isDisliked = like && !like.like;


  //Handle uploaded file content
  const onFileContentChanged = (fileContent) => {
    setFileContent(fileContent)
  };

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
    // Trim and sanitise the comment text.
    const sanitisedComment = sanitize(comment.trim());

    if (sanitisedComment === "") {
      setNewCommentErrorMessage("Your comment is empty. Please enter a message or press cancel.");
      return;
    }

    const newComment = {
      userEmail: user.email,
      text     : sanitisedComment,
      postId   : currentPost.id,
      image    : fileContent
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

    try {
      if (!isLiked) {
        //create the like
        const response = await createPostLike({userEmail: user.email, postId: currentPost.id, like: true});
        editedPostList[index].post_likes = [...post.post_likes, response];

      } else {
        //delete the like
        const likeId = currentPost.post_likes.find(like => user.email === like.userEmail).id;
        await deletePostLike(likeId);
        editedPostList[index].post_likes = editedPostList[index].post_likes.filter(like => like.id !== likeId)
      }
      setPosts(editedPostList);
    } catch (error) {
      setServerError(true);
    }
  };
  const handlePostDisLike = async () => {
    const editedPostList = [...posts];
    const index = editedPostList.findIndex(post => post.id === currentPost.id);
    const post = editedPostList[index];

    try {
      if (!isDisliked) {
        //create the dislike
        const response = await createPostDislike({userEmail: user.email, postId: currentPost.id, like: false});
        editedPostList[index].post_likes = [...post.post_likes, response];

      } else {
        //delete the dislike
        const likeId = currentPost.post_likes.find(like => user.email === like.userEmail).id;
        await deletePostLike(likeId);
        editedPostList[index].post_likes = editedPostList[index].post_likes.filter(like => like.id !== likeId)
      }
      setPosts(editedPostList);
    } catch (error) {
      setServerError(true);
    }
  };

  const onCancelEditPost = () => {
    clearEditState();
  };

  const handleEditPost = async () => {

    // Trim and sanitise the comment text.
    const sanitisedPost = sanitize(editedPost.trim());

    if (sanitisedPost === "") {
      setEditPostErrorMessage("Your post is empty. Please enter a message, or you can cancel or delete the post.");
      return;
    }
    const editedPostList = [...posts];
    const index = editedPostList.findIndex(post => post.id === currentPost.id);
    editedPostList[index].text = sanitisedPost;

    try {
      await updatePost({text: sanitisedPost}, currentPost.id);
      setPosts(editedPostList);
    } catch(error) {
      setServerError(true);
    }

    //clear the state
    clearEditState();
  };

  const handleDeletePost = async () => {
    setPosts(posts.filter(post => post.id !== currentPost.id));
    closeDeletePostModal();
    try {
      //delete from backend
      await deletePost(currentPost.id);

    } catch (error) {
      setServerError(true);
    }
    clearEditState();
  };

  const clearEditState = () => {
    setEditedPost(currentPost.text);
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
              <i className="fa fa-user-circle"/> {currentPost.user.name}
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
            : <>
              <p className="postText">"{currentPost.text}"</p>
              {currentPost.imageId && <img className='image' height={"400"} src={makeImageUrl(currentPost.imageId)}/>}
            </>
        }

        <div className="repliesSection">
          <div className="likesContainer">
            <i className="fa fa-thumbs-up"/> {currentPost.post_likes.filter(like => like.like).length} Likes
          </div>
          <SmallInvertedIconButton onClick={handlePostLike} type={"like"} disabled={isDisliked} value={isLiked ? "Unlike" : "Like"}/>
          <div className="likesContainer">
            <i className="fa fa-thumbs-down"/> {currentPost.post_likes.filter(dislike => !dislike.like).length} Dislikes
          </div>
          <SmallInvertedIconButton onClick={handlePostDisLike} type={"dislike"} disabled={isLiked} value={isDisliked ? "Un-dislike" : "Dislike"}/>
          <SmallInvertedIconButton onClick={toggleCommentInput} type={"comment"} value={"Comment"}/>
        </div>

        {showCommentInput &&
        <CommentInputSection
            newCommentErrorMessage={newCommentErrorMessage}
            onSubmit={() => handleAddComment(currentPost.id)}
            onCancel={() => toggleCommentInput(currentPost.id)}
            handleInputChange={handleInputChange}
            onFileContentChanged={onFileContentChanged}
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