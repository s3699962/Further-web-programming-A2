import React from "react";
import {FollowRow} from "./FollowRow";

/** This is the table component that displays the users information and follow/unfollow buttons.
 * It is a generic component that generates row depending on whether the user wants to view
 * all users, friends, or their followers
 * */
export const UserFollowTable = ({users, allFriends, followers, currentUser, type, setFriends, setServerError}) => {

  // generate rows with all users information to display
  // in rows in the table
  const generateAllUsersRows = () => {
    return users?.filter(user => user.email !== currentUser.email)
        .map(user => ({
          ...user,
          following: isUserAFriend(user.email)
        }));

  };

  // generate rows with friends information only to display
  // in rows in the table
  const generateFriendsRows = () => {
    return allFriends?.map(friend => {
          const user = users?.find(user => user.email === friend.followingUser);
          return ({
            ...friend,
            email    : friend.followingUser,
            name     : user.name,
            avatarId : user.avatarId,
            following: true
          })
        }
    )
  };

  // generate rows with followers information only to display
  // in rows in the table
  const generateFollowersRows = () => {
    return followers?.map(follower => {
      const user = users?.find(user => user.email === follower.userEmail);
      return ({
        ...follower,
        email    : follower.userEmail,
        name     : user.name,
        avatarId : user.avatarId,
        following: isUserAFriend(follower.userEmail)
      })
    });
  };

  const isUserAFriend = (userEmail) => {
    return allFriends.find(friend => friend.followingUser === userEmail);
  };

  // toggle which rows are generated depending
  // on which tab the user has selected
  const rows = () => {
    switch (type) {
      case 'allUsers' :
        return generateAllUsersRows();
      case 'following':
        return generateFriendsRows();
      case 'followers' :
        return generateFollowersRows();
    }
  };

  return (
      <div>
        {rows()?.map((row, index) =>
            <FollowRow
                user={row}
                index={index}
                allFriends={allFriends}
                setFriends={setFriends}
                setServerError={setServerError}
                currentUser={currentUser}
            />
        )}
      </div>
  );
};