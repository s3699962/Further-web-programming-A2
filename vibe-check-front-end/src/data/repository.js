import axios from "axios";

// Constants
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
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

// UpdateUserDetails
async function updateUser(user) {
  return await axios.put(API_HOST + `/api/users/${user.email}`, user);
}

// --- Post ---------------------------------------------------------------------------------------
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

//TODO: update post

// ---- Comment -----------------------------------------------------------------------------------

async function createComment(comment) {
  const response = await axios.post(API_HOST + "/api/comment", comment);

  return response.data;
}

async function deleteComment(id) {
  return await axios.delete(API_HOST + `/api/comment/${id}`);
}

//TODO: updateComment(id)

// ---- Post Like --------------------------------------------------------------------------------------

async function createPostLike(like) {
  const response = await axios.post(API_HOST + "/api/post-like", like);

  return response.data;
}

async function deletePostLike(id) {
  return await axios.delete(API_HOST + `/api/post-like/${id}`);
}

// ---- Comment Like --------------------------------------------------------------------------------------

async function createCommentLike(like) {
  const response = await axios.post(API_HOST + "/api/comment-like", like);

  return response.data;
}

async function deleteCommentLike(id) {
  return await axios.delete(API_HOST + `/api/comment-like/${id}`);
}

// ---- Follow ------------------------------------------------------------------------------------

//TODO: follow(follow)

//TODO: unFollow(id)

// --- Helper functions to interact with local storage --------------------------------------------
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
  deleteCommentLike
}






//Old code
//----------------------------------------------------------------------------------------------------------------
const USERS_KEY = "users";
//const USER_KEY = "user";
const POSTS_KEY = "posts";

// Initialise local storage "users" with data, if the data is already set this function returns immediately.
// function initUsers() {
//   // Stop if data is already initialised.
//   if(localStorage.getItem(USERS_KEY) !== null)
//     return;
//
//   // User data is hard-coded, passwords are in plain-text.
//   //This in an initial list of users. New users will be added to this list
//   const users = [
//     {
//       id: 0,
//       name: "Jeanette Roga",
//       email: "jeanette@gmail.com",
//       password: "abc123",
//       dateJoined: "2021-09-01T23:42:32.598Z"
//     },
//     {
//       id: 1,
//       name: "Matt Fielding",
//       email: "matt@gmail.com",
//       password: "Tester1@",
//       dateJoined: "2021-09-01T23:42:32.598Z"
//     }
//   ];
//
//   // Set data into local storage.
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));
// }

// Initialise local storage "users" with data, if the data is already set this function returns immediately.
// function initPosts() {
//   // Stop if data is already initialised.
//   if(localStorage.getItem(POSTS_KEY) !== null)
//     return;
//
//   // User data is hard-coded, passwords are in plain-text.
//   // initial list of posts. New posts and comments are added to this lists.
//   const posts = [
//     {
//       id: 0,
//       userId: 0,
//       name: "Jeanette Roga",
//       text: "Beautiful weather today! Spring is here! :)",
//       dateTime: "2021-09-01T23:42:32.598Z",
//       comments:[{id: 1, userId: 1, name: "Matt Fielding", comment: "So glad winter is over and the garden is full of flowers!"}],
//       likes: 3
//     },
//     {
//       id: 1,
//       userId: 1,
//       name: "Matt Fielding",
//       text: "I am having the best day today!",
//       dateTime: "2021-09-03T23:42:32.598Z",
//       comments:[],
//       likes: 1
//     }
//   ];
//
//   // Set data into local storage.
//   localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
// }
//
// function getUsers() {
//   // Extract user data from local storage.
//   const data = localStorage.getItem(USERS_KEY);
//
//   // Convert data to objects.
//   return JSON.parse(data);
// }

// Verify user login, the login is also persistent as it is stored in local storage.
// function verifyUser(email, password) {
//
//   const users = getUsers();
//   for(const user of users) {
//     if(email === user.email && password === user.password)
//     {
//       setUser(user);
//       return true;
//     }
//   }
//
//   return false;
// }
//
// function addNewUser(newUser, id) {
//   let users = getUsers();
//   // list of existing user ids which is used to set the new user id
//   const idList = users.map(user => user.id);
//
//   const newId = (id === undefined || null)
//       ? idList.length === 0 ? 0 : (Math.max(...idList) + 1)
//       : id;
//
//   const userWithId = {...newUser, id: newId};
//   users.push(userWithId);
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));
//   setUser(userWithId)
// }



// function updateUserDetails(newUserDetails) {
//   //remove the existing user from the userslist
//   // const usersList = getUsers();
//   //   // const currentUser = getUser();
//   //   // const editedList = usersList.filter(user => user.id !== currentUser.id);
//   //   // localStorage.setItem(USERS_KEY, JSON.stringify(editedList));
//   //   // //add back the user to the list with the updated info
//   //   // addNewUser(newUserDetails, currentUser.id);
//
//   return null
// }

// function getPosts() {
//   // Extract user data from local storage.
//   return JSON.parse(localStorage.getItem(POSTS_KEY));
// }

/*function addNewPost(newPost) {
  let posts = getPosts()

  posts.push(newPost);
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}*/

// function deletePost(postId) {
//   const postsList = getPosts();
//
//   const editedList = postsList.filter(post => post.id !== postId);
//
//   localStorage.setItem(POSTS_KEY, JSON.stringify(editedList));
// }

function updatePostsList(updatedPost) {
  const posts = getPosts();
  const foundIndex = posts.findIndex(post => post.id === updatedPost.id);
  posts[foundIndex] = updatedPost;
  //set the updated post back into the postsList
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}



export {

  //addNewUser,
  //deletePost,
  updatePostsList,
  // getPosts,
  // initPosts
}
