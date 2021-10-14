const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const comments = await db.comment.findAll();

  res.json(comments);
};

// Create a comment in the database.
exports.create = async (req, res) => {
  const comments = await db.comment.create({
    text: req.body.text,
    userEmail: req.body.userEmail,
    postId: req.body.postId
  });

  res.json(comments);
};

//Delete a comment
exports.delete = async(req, res) => {
  await db.comment.destroy({where: {id: req.params.id}});
  res.json(null);
};

// Update comment
exports.update = async (req, res) => {
  await db.comment.update({
    text: req.body.text,
  }, {
    where: {id: req.params.id}
  });
  res.json(null)
};

