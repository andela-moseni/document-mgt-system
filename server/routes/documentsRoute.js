import DocumentsController from '../controllers/DocumentsController';

const documentsRoute = (router) => {
  // Create a new document or get all documents
  router.route('/documents')
   .post(DocumentsController.createDocument)
   .get(DocumentsController.listDocuments);
};

export default documentsRoute;