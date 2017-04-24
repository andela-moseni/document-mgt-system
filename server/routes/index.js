import rolesRoute from './rolesRoute';
import documentsRoute from './documentsRoute';

const routes = (router) => {
  rolesRoute(router);
  documentsRoute(router);
};

export default routes;