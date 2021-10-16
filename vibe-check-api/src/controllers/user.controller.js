const db = require("../database");
const argon2 = require("argon2");
const {convertImage} = require("./Utils");


// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.email);

  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  const user = await db.user.create({
    email: req.body.email,
    password_hash: hash,
    name: req.body.name,
    dateJoined: req.body.dateJoined,
    avatarId: null
  });

  res.json(user);
};

//Delete a user
exports.delete = async (req, res) => {
  await db.user.destroy({where: {email: req.params.email}});
  res.json(null);
};


// Update user details
exports.update = async(req, res) => {

  let user;
  //if password is not being changed no need to update it
  if (!req.body.password) {
    //update all fields except password
    user = await db.user.update({
      email     : req.body.email,
      name      : req.body.name,
      dateJoined: req.body.dateJoined
    }, {
      where: {email: req.params.email}
    });
  } else {
    //create the hash of new password and save
    const hash = await argon2.hash(req.body.password, {type: argon2.argon2id});

    user = await db.user.update({
      email        : req.body.email,
      password_hash: hash,
      name         : req.body.name,
      dateJoined   : req.body.dateJoined
    }, {
      where: {email: req.params.email}
    });
  }

  res.json(user);
};

exports.addAvatar = async (req, res) => {
  const avatarId = convertImage(req.body.image);
  await db.user.update({ avatarId: avatarId}, { where: {email: req.params.email}});

  res.json(avatarId)
};