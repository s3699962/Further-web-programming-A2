import React, {useEffect, useState} from "react";
import {getAllFollowing, getAllUsers, getFollowers} from "../data/repository";
import {serverErrorMessage} from "./Utils";
import ErrorMessage from "./ErrorMessage";
import {UserFollowTable} from "./UserFollowTable";

/** Forum component responsible for handling new posts and comments,
 * and deleting and editing of posts and comments, by the signed in user on their own posts.
 * */
function Friends(props) {
  const currentUser = props.user;
  const [users, setUsers] = useState([]);
  const [allFriends, setFriends] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    getAllUsers().then(setUsers);
    getAllFollowing(currentUser.email).then(setFriends);
    getFollowers(currentUser.email).then(setFollowers);
  }, []);


  const [activeTab, setActiveTab] = useState("allUsers");

  const setAllUsersActiveTab = () => setActiveTab("allUsers");
  const setFollowingActiveTab = () => setActiveTab("following");
  const setFollowersActiveTab = () => setActiveTab("followers");

  return (
      <div className={"bodyContainer"}>
        {serverError && <ErrorMessage errorMessage={serverErrorMessage}/>}
        <nav className={"containerTabs"}>
          <div className={activeTab === "allUsers" ? "activeTabButton tabButton" : "tabButton"}>
            <button onClick={setAllUsersActiveTab}>Everyone</button>
          </div>
          <div className={activeTab === "following" ? "activeTabButton tabButton" : "tabButton"}>
            <button className={"mainHeader"} onClick={setFollowingActiveTab}>Following</button>
          </div>
          <div className={activeTab === "followers" ? "activeTabButton tabButton" : "tabButton"}>
            <button className={"mainHeader"} onClick={setFollowersActiveTab}>Followers</button>
          </div>
        </nav>
        <UserFollowTable
            users={users}
            allFriends={allFriends}
            followers={followers}
            currentUser={currentUser}
            type={activeTab}
            setFriends={setFriends}
            setServerError={setServerError}
        />
      </div>
  );


}

export default Friends;


