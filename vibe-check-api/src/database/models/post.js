module.exports = (sequelize, DataTypes) =>
  sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(600),
      allowNull: false
    },
    dateTime: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    imageId: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
