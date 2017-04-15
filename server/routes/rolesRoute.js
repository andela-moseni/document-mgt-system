import RolesController from '../controllers/RolesController';

const rolesRoute = (router) => {
  // Create a new role or get all roles
  router.route('/roles')
   .post(RolesController.create)
   .get(RolesController.list);
};

export default rolesRoute;