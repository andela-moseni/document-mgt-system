'use strict';
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'title field cannot be empty.'
        }
      }
    },
    content: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'content field cannot be empty.'
        }
      }
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
      validate: {
        isIn: [['private', 'public', 'role']]
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'type field cannot be empty.'
        }
      }
    },
    OwnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Document.belongsTo(models.User, {
          foreignKey: 'OwnerId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Document;
};