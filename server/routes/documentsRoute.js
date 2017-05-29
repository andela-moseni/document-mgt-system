import DocumentsController from '../controllers/DocumentsController';
import UsersAuthentication from '../middlewares/UsersAuthentication';

const documentsRoute = (router) => {
  // Create a new document or get all documents
  router.route('/documents')
   .post(UsersAuthentication.verifyToken, DocumentsController.createDocument)
   .get(UsersAuthentication.verifyToken, DocumentsController.listDocuments);

  // Get, update and delete a particular document
  router.route('/documents/:id')
    .get(UsersAuthentication.verifyToken, DocumentsController.retrieveDocument)
    .put(UsersAuthentication.verifyToken, DocumentsController.updateDocument)
    .delete(UsersAuthentication.verifyToken,
      DocumentsController.deleteDocument);

  // Search documents
  router.route('/search/documents')
    .get(UsersAuthentication.verifyToken, DocumentsController.searchDocuments);
};

export default documentsRoute;
