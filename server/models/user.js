/* eslint-disable no-underscore-dangle */

import bcrypt from 'bcrypt-nodejs';

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        User.hasMany(models.Document, {
          foreignKey: 'OwnerId',
          as: 'documents',
        });

        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE',
        });
      },
    },
instanceMethods: {
      /**
       * Compare plain password to user's hashed password
       * @method
       * @param {String} password
       * @return {Boolean} password match: true or false
       */
      validatePassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      /**
       * Hash the password
       * @method
       * @return {Void} no return
       */
      hashPassword() {
        const salt = bcrypt.genSaltSync(8);
        this.password = bcrypt.hashSync(this.password, salt);
      }
    },

    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },

      beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return User;
};