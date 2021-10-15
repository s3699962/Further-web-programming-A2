const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.comment = require("./models/comment.js")(db.sequelize, DataTypes);
db.post_like = require("./models/post_like.js")(db.sequelize, DataTypes);
db.comment_like = require("./models/comment_like.js")(db.sequelize, DataTypes);
db.follow = require("./models/follow.js")(db.sequelize, DataTypes);

//Relate the comment to post and user
db.post.hasMany(db.comment, { onDelete: "cascade", onUpdate: "cascade", hooks: true });
db.user.hasMany(db.comment, { onDelete: "cascade", onUpdate: "cascade", hooks: true });
db.comment.belongsTo(db.post, { foreignKey: { allowNull: false } });
db.comment.belongsTo(db.user, { foreignKey: { allowNull: false } });

// Relate post_like to post and user
db.post.hasMany(db.post_like, { onDelete: "cascade", onUpdate: "cascade", hooks: true });
db.user.hasMany(db.post_like, { onDelete: "cascade", onUpdate: "cascade", hooks: true });
db.post_like.belongsTo(db.post, { foreignKey: { allowNull: false } });
db.post_like.belongsTo(db.user, { foreignKey: { allowNull: false } });

// Relate comment_like to comment and user
db.comment.hasMany(db.comment_like, { onDelete: "cascade", onUpdate: "cascade", hooks: true });
db.user.hasMany(db.comment_like, { onDelete: "cascade", onUpdate: "cascade", hooks: true });
db.comment_like.belongsTo(db.comment, { foreignKey: { allowNull: false } });
db.comment_like.belongsTo(db.user, { foreignKey: { allowNull: false } });

//Relate post and user
db.user.hasMany(db.post, { onDelete: "cascade", onUpdate: "cascade", hooks: true });
db.post.belongsTo(db.user, { foreignKey: { allowNull: false }});

//Relate follow and user
db.user.hasMany(db.follow, { onDelete: "cascade", onUpdate: "cascade", hooks: true });
db.follow.belongsTo(db.user, { foreignKey: { allowNull: false }});

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();
  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  
  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if(count > 0)
    return;

  const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({ email: "jroga@gmail.com", password_hash: hash, name: "Jeanette Roga", dateJoined: "2021-09-01T23:42:32.598Z" });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ email: "mbfielding@gmail.com", password_hash: hash, name: "Matthew Fielding", dateJoined: "2021-09-01T23:42:32.598Z" });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ email: "david@gmail.com", password_hash: hash, name: "David Richard", dateJoined: "2021-09-01T23:42:32.598Z" });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ email: "k@gmail.com", password_hash: hash, name: "Keith Peter", dateJoined: "2021-09-01T23:42:32.598Z" });

  await db.post.create({ text: "Beautiful weather today! Spring is here! :)", dateTime: "2021-09-01T23:42:32.598Z", userEmail: "jroga@gmail.com" });

  await db.post.create({ text: "I won the competition!!", dateTime: "2021-09-10T23:42:32.598Z", userEmail: "mbfielding@gmail.com" });

  await db.comment.create({ text: "Yes it's great!", userEmail: "jroga@gmail.com", postId: 1 });

  await db.post_like.create({ userEmail: "jroga@gmail.com", postId: 1 });

  await db.comment_like.create({ userEmail: "jroga@gmail.com", commentId: 1 });

  await db.follow.create({ userEmail: "jroga@gmail.com", followingUser: "mbfielding@gmail.com"});
  await db.follow.create({ userEmail: "jroga@gmail.com", followingUser: "k@gmail.com"});
  await db.follow.create({ userEmail: "david@gmail.com", followingUser: "jroga@gmail.com"});
}

module.exports = db;
