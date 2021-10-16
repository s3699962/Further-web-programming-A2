const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {

  // join tables and include all the data needed to display posts
  const posts = await db.post.findAll({
    include: [
      db.user,
      { model: db.comment, include: [{ model: db.user, attributes: ['name'] }, db.comment_like] },
      db.post_like
    ]
  });
  res.json(posts);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const post = await db.post.create({
    text: req.body.text,
    dateTime: req.body.dateTime,
    userEmail: req.body.userEmail
  });

  res.json(post);
};

exports.delete = async (req, res) => {
  await db.post.destroy({where: {id: req.params.id}});
  res.json(null);
};

exports.update = async (req, res) => {
  console.log("request");
  const post = await db.post.update({
    text: req.body.text,
  }, {
    where: {id: req.params.id}
  });
  res.json(post)
};
