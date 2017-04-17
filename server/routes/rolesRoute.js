import RolesController from '../controllers/RolesController';

const rolesRoute = (router) => {
  // Create a new role or get all roles
  router.route('/roles')
   .post(RolesController.create)
   .get(RolesController.list);

  // Get a particular role
  router.route('/roles/:id')
  .get(RolesController.retrieve);
};

export default rolesRoute;