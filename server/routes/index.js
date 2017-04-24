import rolesRoute from './rolesRoute';
import documentsRoute from './documentsRoute';
import usersRoute from './usersRoute';

const routes = (router) => {
  rolesRoute(router);
  documentsRoute(router);
  usersRoute(router);
};

export default routes;