const db = require("../database");

// Create a post in the database.
exports.create = async (req, res) => {
  const follow = await db.follow.create({
    userEmail: req.body.userEmail,
    followingUser: req.body.followingUser
  });

  res.json(follow);
};

exports.delete = async(req, res) => {
  await db.follow.destroy({where: {id: req.params.id}});
  res.json(null);
};

exports.get = async (req, res) => {
  const follows = await db.follow.findAll({where: {userEmail: req.params.userEmail}});

  res.json(follows);
};


exports.getFollowers = async (req, res) => {
  const follows = await db.follow.findAll({where: {followingUser: req.params.userEmail}});

  res.json(follows);
};
