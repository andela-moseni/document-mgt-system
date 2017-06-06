import rolesRoute from './rolesRoute';
import documentsRoute from './documentsRoute';
import usersRoute from './usersRoute';

/**
 * Combine roles, documents and users routes
 * @param {function} router
 */
const routes = (router) => {
  rolesRoute(router);
  documentsRoute(router);
  usersRoute(router);
};

export default routes;
