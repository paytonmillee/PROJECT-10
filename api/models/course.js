"use strict";
const { Model, DataTypes } = require("sequelize");
const models = require("./index");

module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title can not be empty",
          },
          notNull: {
            msg: "Title cannot be empty",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description can not be empty",
          },
          notNull: {
            msg: "Description cannot be empty",
          },
        },
      },
      estimatedTime: {
        type: DataTypes.STRING,
      },
      materialsNeeded: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.NUMBER,
      },
    },
    { sequelize, modelName: "Course" }
  ),
    (Course.associate = (models) => {
      Course.belongsTo(models.User, { foreignKey: "userId" });
    });
  return Course;
};
