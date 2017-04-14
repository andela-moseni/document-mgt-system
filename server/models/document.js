'use strict';
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type:DataTypes.TEXT,
      allowNull: false,
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