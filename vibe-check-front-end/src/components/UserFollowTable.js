import React from "react";
import {FollowRow} from "./FollowRow";

export const UserFollowTable = ({users, allFriends, followers, currentUser, type, setFriends, setServerError}) => {

  const generateAllUsersRows = () => {
    return users?.filter(user => user.email !== currentUser.email)
        .map(user => ({
          ...user,
          following: isUserAFriend(user.email)
        }));

  };

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