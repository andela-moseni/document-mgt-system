module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          message: 'Title cannot be empty.',
        },
        is: /^[a-z ]+$/i,
        len: [4, 20],
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
          as: 'users',
        });
      },
    },
  });
  return Role;
};
