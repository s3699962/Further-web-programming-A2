module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    email: {
      type: DataTypes.STRING(80),
      primaryKey: true
    },
    password_hash: {
      type: DataTypes.STRING(96),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    dateJoined: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
