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
db.like = require("./models/like.js")(db.sequelize, DataTypes);

//Relate the comment to post and user
db.post.hasMany(db.comment, { onDelete: "cascade", onUpdate: "cascade", hooks: true });
db.user.hasMany(db.comment, { onDelete: "cascade", onUpdate: "cascade", hooks: true });
db.comment.belongsTo(db.post, { foreignKey: { allowNull: false } });
db.comment.belongsTo(db.user, { foreignKey: { allowNull: false } });

// Relate like to post and user
db.post.hasMany(db.like, { onDelete: "cascade", onUpdate: "cascade", hooks: true });
db.user.hasMany(db.like, { onDelete: "cascade", onUpdate: "cascade", hooks: true });
db.like.belongsTo(db.post, { foreignKey: { allowNull: false } });
db.like.belongsTo(db.user, { foreignKey: { allowNull: false } });

//Relate post and user
db.user.hasMany(db.post, { onDelete: "cascade", onUpdate: "cascade", hooks: true });
db.post.belongsTo(db.user, { foreignKey: { allowNull: false }});

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

  await db.post.create({ text: "Beautiful weather today! Spring is here! :)", dateTime: "2021-09-01T23:42:32.598Z", userEmail: "jroga@gmail.com" });

  await db.post.create({ text: "I won the competition!!", dateTime: "2021-09-10T23:42:32.598Z", userEmail: "mbfielding@gmail.com" });

  await db.comment.create({ text: "Yes it's great!", userEmail: "jroga@gmail.com", postId: 1 });

  await db.like.create({ userEmail: "jroga@gmail.com", postId: 1 })
}

module.exports = db;
