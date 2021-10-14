const db = require("../database");

// Create a post in the database.
exports.create = async (req, res) => {
  const like = await db.comment_like.create({
    userEmail: req.body.userEmail,
    postId: req.body.postId
  });

  res.json(like);
};

exports.delete = async(req, res) => {
  await db.comment_like.destroy({where: {id: req.params.id}});
  res.json(null);
};
