import React from "react";
import {FollowRow} from "./FollowRow";

export const UserFollowTable = ({users, allFriends, followers, currentUser, type, setFriends, setServerError}) => {

  const generateAllUsersRows = () => {
    return users?.filter(user => user.email !== currentUser.email)
        .map(user => ({ ...user,
          following: isUserAFriend(user.email)
        }));

    };

  const generateFriendsRows = () => {
    return allFriends?.map(friend => ({...friend,
      email    : friend.followingUser,
      name     : users?.find(user => user.email === friend.followingUser).name,
      following: true
    }));
  };

  const generateFollowersRows = () => {
    return followers?.map(follower => ({...follower,
      email    : follower.userEmail,
      name     : users?.find(user => user.email === follower.userEmail).name,
      following: isUserAFriend(follower.userEmail)
    }));
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