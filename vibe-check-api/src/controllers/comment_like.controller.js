const db = require("../database");

// Create a like for a comment in the database.
exports.create = async (req, res) => {
  const like = await db.comment_like.create({
    userEmail: req.body.userEmail,
    commentId: req.body.commentId,
    like: req.body.like
  });

  res.json(like);
};

// Unlike by deleting a like in the database
exports.delete = async(req, res) => {
  await db.comment_like.destroy({where: {id: req.params.id}});
  res.json(null);
};
