import RolesController from '../controllers/RolesController';

const rolesRoute = (router) => {
  // Create a new role or get all roles
  router.route('/roles')
   .post(RolesController.createRole)
   .get(RolesController.listRoles);

  // Get a particular role, update a role and delete a role
  router.route('/roles/:id')
  .get(RolesController.retrieveRole)
  .put(RolesController.updateRole)
  .delete(RolesController.deleteRole);
};

export default rolesRoute;