module.exports = (sequelize, DataTypes) =>
  sequelize.define("follow", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    followingUser: {
      type: DataTypes.STRING(80),
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
