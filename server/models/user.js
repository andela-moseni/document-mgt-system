/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'Name field cannot be empty.',
        },
        is: /^[a-z ]+$/i,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          message: 'Please input a valid email address.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'Password field cannot be empty.',
        },
        len: [4, 20],
      },
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    roleTitle: {
      allowNull: false,
      type: DataTypes.STRING,
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
         */
      hashPassword() {
        const salt = bcrypt.genSaltSync(8);
        this.password = bcrypt.hashSync(this.password, salt);
      },
    },

    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },

      beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      },
    },
  });
  return User;
};
