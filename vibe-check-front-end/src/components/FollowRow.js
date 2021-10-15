import {createFollow, unfollow} from "../data/repository";
import React, {useState} from "react";
import ConfirmationModal from "./ConfirmationModal";
import {SmallToggledButton} from "./Buttons";

export function FollowRow ({user, index, allFriends, setFriends, setServiceError, currentUser, setServerError}) {
  const [showUnfollowModal, setShowUnfollowModal] = useState(false);
  const openUnfollowModal = () => setShowUnfollowModal(true);
  const closeUnfollowModal = () => setShowUnfollowModal(false);

  const handleFollow = async() => {
    try {
      //if the user is not already followed, unfollow them and remove from list
      if (user.following) {
        const followId = allFriends.find(follow => follow.followingUser === user.email).id;
        await unfollow(followId);
        setFriends(allFriends.filter(follow => follow.id !== followId));
        closeUnfollowModal();
      } else {
        // else create the follow and save to state
        const response = await createFollow({ userEmail: currentUser.email, followingUser: user.email});
        setFriends([...allFriends, response])
      }
    } catch (error) {
      setServerError(true);
      closeUnfollowModal();
    }
  };

  const unfollowModalText = "Are you sure you want to unfollow your friend?";
  const unfollowModalHeader = "Unfollow";

  const className = (index % 2 === 1) ? 'followRow withBackGround' : 'followRow';
  return (
      <div className={className}>
        <div className="nameContainer">
          {user.name}
          <div className="emailContainer">{user.email}</div>
        </div>
        <div className="followButtonContainer">
          <SmallToggledButton inverted={user.following} value={user.following ? "Following" : "Follow"} onClick={user.following ? openUnfollowModal : handleFollow}/>
        </div>
        <ConfirmationModal
            message={unfollowModalText}
            headerText={unfollowModalHeader}
            modalIsOpen={showUnfollowModal}
            closeModal={closeUnfollowModal}
            onSubmit={handleFollow}
        />

      </div>
  )
}