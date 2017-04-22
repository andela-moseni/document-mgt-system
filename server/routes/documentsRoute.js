import DocumentsController from '../controllers/DocumentsController';

const documentsRoute = (router) => {
  // Create a new document
  router.route('/documents')
   .post(DocumentsController.create);
};

export default documentsRoute;