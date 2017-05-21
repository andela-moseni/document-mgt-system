import RolesController from '../controllers/RolesController';
import UsersAuthentication from '../middlewares/UsersAuthentication';

const rolesRoute = (router) => {
  // Create a new role or get all roles
  router.route('/roles')
   .post(UsersAuthentication.verifyToken, UsersAuthentication.verifyAdmin,
   RolesController.createRole)
   .get(UsersAuthentication.verifyToken, UsersAuthentication.verifyAdmin,
   RolesController.listRoles);

  // Get a particular role, update a role and delete a role
  router.route('/roles/:id')
  .get(UsersAuthentication.verifyToken, UsersAuthentication.verifyAdmin,
  RolesController.retrieveRole)
  .put(UsersAuthentication.verifyToken, UsersAuthentication.verifyAdmin,
  RolesController.updateRole)
  .delete(UsersAuthentication.verifyToken, UsersAuthentication.verifyAdmin,
  RolesController.deleteRole);

  // Search roles
  router.route('/search/roles')
    .get(UsersAuthentication.verifyToken, UsersAuthentication.verifyAdmin,
    RolesController.searchRoles);
};

export default rolesRoute;
