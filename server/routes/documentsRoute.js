import DocumentsController from '../controllers/DocumentsController';

const documentsRoute = (router) => {
  // Create a new document or get all documents
  router.route('/documents')
   .post(DocumentsController.createDocument)
   .get(DocumentsController.listDocuments);

  // Get, update and delete a particular document 
  router.route('/documents/:id')
    .get(DocumentsController.retrieveDocument)
    .put(DocumentsController.updateDocument)
    .delete(DocumentsController.deleteDocument);
};

export default documentsRoute;