const db = require("../database");

// Create a like for a post in the database.
exports.create = async (req, res) => {
  const like = await db.post_like.create({
    userEmail: req.body.userEmail,
    postId: req.body.postId,
    like: req.body.like
  });

  res.json(like);
};

//unlike by deleting the like
exports.delete = async(req, res) => {
  await db.post_like.destroy({where: {id: req.params.id}});
  res.json(null);
};
