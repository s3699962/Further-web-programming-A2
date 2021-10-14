import React, {useState, useEffect} from "react";
import {createPost, getPosts} from "../data/repository";
import WarningMessage from "./WarningMessage";
import {LargeButton} from "./Buttons";
import PostContainer from "./PostContainer";
import {serverErrorMessage} from "./Utils";
import ErrorMessage from "./ErrorMessage";

/** Forum component responsible for handling new posts and comments,
 * and deleting and editing of posts and comments, by the signed in user on their own posts.
 * */
function Forum(props) {
  const user = props.user;
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState(null);
  const [newPostErrorMessage, setNewPostErrorMessage] = useState(null);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
      getPosts().then(setPosts);
  }, []);

  //handle inputing of new posts
  const handleInputChange = (event) => {
    const value = event.target.value;
    setPost(value);
    setNewPostErrorMessage(null);
  };

  //cancel action which reset state
  const onCancel = () => {
    setPost("");
    setNewPostErrorMessage(null);
  };

  //handle submitting a new post
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Trim the post text.
    const postTrimmed = post.trim();

    // sets a warning message to be displayed when validation fails
    if (postTrimmed === "") {
      setNewPostErrorMessage("Your post is empty. Please enter a message or press cancel.");
      return;
    }

    if (post.length > 600) {
      setNewPostErrorMessage("Your post cannot be greater than 600 characters.");
      return;
    }

    const newPost = {
      text      : postTrimmed,
      dateTime  : new Date(),
      userEmail : user.email,
      user      : user
    };

    try {
      //save to DB
      const response = await createPost(newPost);

      const updatedResponse = {...response, user: {name: user.name}, post_likes: [], comments: []};

      // Save to state.
      setPosts([...posts, updatedResponse]);
      // Clear the state
      setPost("");
      setNewPostErrorMessage(null);
    } catch(error) {
      setServerError(true);
    }
  };

  return (
      <>
        <div className={"bodyContainer newPostContainer"}>
          <form>
            {serverError && <ErrorMessage errorMessage={serverErrorMessage}/>}
            {/* adding a new post component */}
            <fieldset className="textBoxBorder">
              <legend>New Post</legend>
              <div className="postInputContainer">
              <textarea name="post" id="post" className="postInput" rows="3" placeholder={"Write a comment..."}
                        value={post} onChange={handleInputChange}/>
              </div>
              {newPostErrorMessage !== null && <WarningMessage message={newPostErrorMessage}/>}

              <div className="forumButtons">
                <LargeButton type="cancelButton" value="Cancel" onClick={onCancel}/>
                <LargeButton onClick={handleSubmit} value="Post" type="submitButton"/>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="bodyContainer">
          <div className="postHeader">
            <h2>Forum</h2>
          </div>
          <div>
            {/* iterate through the lists of post and display them accordingly*/}
            {posts?.length === 0
                ? <div className="postsContainer">No posts have been submitted.</div>
                : posts?.map(post =>
                    <PostContainer user={user} currentPost={post} posts={posts} setPosts={setPosts} setServerError={setServerError}/>
                )}
          </div>
        </div>
      </>
  );
}

export default Forum;