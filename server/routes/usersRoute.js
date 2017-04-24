import UsersController from '../controllers/UsersController.js';

const usersRoute = (router) => {
  // create a new user or get all users
  router.route('/users')
    .post(UsersController.createUser)
    .get(UsersController.listUsers);

  // Get, update and delete a particular user
  router.route('/users/:id')
    .get(UsersController.retrieveUser)
    .put(UsersController.updateUser)
    .delete(UsersController.deleteUser);

  // Login a user
  router.route('/users/login')
    .post(UsersController.login)
  
  // Logout a user 
  router.route('/users/logout')
    .post(UsersController.logout);
};

export default usersRoute;