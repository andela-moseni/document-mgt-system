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

  // Get all documents belonging to a user
  router.route('/users/:id/documents')
    .get(UsersController.retrieveDocuments);

  // Search users
  router.route('/search/users')
    .get(UsersController.searchUsers);
};

export default usersRoute;