module.exports = (sequelize, DataTypes) =>
  sequelize.define("comment", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(600),
      allowNull: false
    },
    imageId: {
      type     : DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
