import UsersController from '../controllers/UsersController';
import UsersAuthentication from '../middlewares/UsersAuthentication';

/**
 * Define users routes
 * @param {function} router
 */
const usersRoute = (router) => {
  // create a new user or get all users
  router.route('/users')
    .post(UsersController.createUser)
    .get(UsersAuthentication.verifyToken, UsersController.listUsers);

  // Get, update and delete a particular user
  router.route('/users/:id')
    .get(UsersAuthentication.verifyToken, UsersController.retrieveUser)
    .put(UsersAuthentication.verifyToken, UsersController.updateUser)
    .delete(UsersAuthentication.verifyToken, UsersController.deleteUser);

  // Login a user
  router.route('/users/login')
    .post(UsersController.login);

  // Logout a user
  router.route('/users/logout')
    .post(UsersAuthentication.verifyToken, UsersController.logout);

  // Get all documents belonging to a user
  router.route('/users/:id/documents')
    .get(UsersAuthentication.verifyToken,
    UsersController.retrieveUserDocuments);

  // Search users
  router.route('/search/users')
    .get(UsersAuthentication.verifyToken, UsersController.searchUsers);
};

export default usersRoute;
