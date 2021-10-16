import axios from "axios";

/** --- Constants ------------------------------------------------------------------------------------ */

const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

/** --- User ----------------------------------------------------------------------------------------- */

async function verifyUser(email, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { email, password } });
  const user = response.data;

  // the login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function deleteUser(email) {

  return await axios.delete(API_HOST + `/api/users/${email}`);
}

async function updateUser(user, email) {
  return await axios.put(API_HOST + `/api/users/${email}`, user);
}

async function getAllUsers() {
  const response = await axios.get(API_HOST + `/api/users`);
  return response.data;
}

/** --- Post ----------------------------------------------------------------------------------------- */

async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

async function deletePost(id) {
  return await axios.delete(API_HOST + `/api/posts/${id}`);
}

async function updatePost(request, id) {
  return await axios.put(API_HOST + `/api/posts/${id}`, request);
}

/** ---- Comment ------------------------------------------------------------------------------------- */

async function createComment(comment) {
  const response = await axios.post(API_HOST + "/api/comment", comment);

  return response.data;
}

async function deleteComment(id) {
  return await axios.delete(API_HOST + `/api/comment/${id}`);
}

async function updateComment(request, id) {
  return await axios.put(API_HOST + `/api/comment/${id}`, request);
}

/** ---- Post Like ----------------------------------------------------------------------------------- */

async function createPostLike(like) {
  const response = await axios.post(API_HOST + "/api/post-like", like);

  return response.data;
}

async function deletePostLike(id) {
  return await axios.delete(API_HOST + `/api/post-like/${id}`);
}

/** ---- Comment Like -------------------------------------------------------------------------------- */

async function createCommentLike(like) {
  const response = await axios.post(API_HOST + "/api/comment-like", like);

  return response.data;
}

async function deleteCommentLike(id) {
  return await axios.delete(API_HOST + `/api/comment-like/${id}`);
}

/** ---- Follow -------------------------------------------------------------------------------------- */

//follow a user
async function createFollow(follow) {
  const response = await axios.post(API_HOST + "/api/follow", follow);

  return response.data;
}
//unFollow a user
async function unfollow(id) {
  return await axios.delete(API_HOST + `/api/follow/${id}`);
}

async function getAllFollowing(userEmail) {
  const response = await axios.get(API_HOST + `/api/follow/${userEmail}`);
  return response.data;
}

async function getFollowers(userEmail) {
  const response = await axios.get(API_HOST + `/api/follow/followers/${userEmail}`);
  return response.data;
}

/** --- Helper functions to interact with local storage ---------------------------------------------- */

function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser,
  findUser,
  createUser,
  deleteUser,
  getPosts,
  createPost,
  getUser,
  removeUser,
  deletePost,
  createComment,
  createPostLike,
  deleteComment,
  deletePostLike,
  updateUser,
  createCommentLike,
  deleteCommentLike,
  getAllUsers,
  getAllFollowing,
  createFollow,
  unfollow,
  getFollowers,
  updatePost,
  updateComment
}
