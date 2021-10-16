const db = require("../database");

// Create a follow in the database.
exports.create = async (req, res) => {
  const follow = await db.follow.create({
    userEmail: req.body.userEmail,
    followingUser: req.body.followingUser
  });

  res.json(follow);
};

//unfollow by deleting from the db
exports.delete = async(req, res) => {
  await db.follow.destroy({where: {id: req.params.id}});
  res.json(null);
};

//get follows for a specific user
exports.get = async (req, res) => {
  const follows = await db.follow.findAll({where: {userEmail: req.params.userEmail}});

  res.json(follows);
};

//get followers for a specific user
exports.getFollowers = async (req, res) => {
  const follows = await db.follow.findAll({where: {followingUser: req.params.userEmail}});

  res.json(follows);
};
