import db from '../models'
import ControllerHelper from '../helpers/ControllerHelper'
const Role = db.Role;
const Document = db.Document;

/**
 * DocumentsController class to create and manage documents
 */
class DocumentsController {
  /**
   * Create a new Document
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static createDocument(req, res) {
    Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        type: req.body.type,
        OwnerId: req.body.OwnerId,
      })
      .then(document => res.status(201).send(document))
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!'
      }));
  }   

  /**
   * List all Documents
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static listDocuments(req, res) {
    Role.findById(20)
      .then((role) => {
        let query = {};
        query.limit = (req.query.limit > 0) ? req.query.limit : 10;
        query.offset = (req.query.offset > 0) ? req.query.offset : 0;

        if (role.title === 'admin') {
          Document
            .findAndCountAll(query)
            .then((documents) => {
              const pagination = ControllerHelper.pagination(
                query.limit, query.offset, documents.count
              );
              res.status(200).send({
                pagination, documents: documents.rows
              });
            });
        } else {
          query = {
            where: {
              $or: { 
                access: { $eq: 'public' },
                OwnerId: { $eq: 2 }
              }
            }
          };
          Document
            .findAndCountAll(query)
            .then((documents) => {
              const pagination = ControllerHelper.pagination(
                query.limit, query.offset, documents.count
              );
              res.status(200).send({
                pagination, documents: documents.rows
              });
            });
        }
      });
  } 
  /**
   * Retrieve a specific document based on the id
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static retrieveDocument(req, res) {
    Role.findById(20)
      .then((role) => {
        Document
          .findById(req.params.id)
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document Does Not Exist',
              });
            }

            if (!(role.title === 'admin') && document.access === 'private' &&
            !(document.OwnerId === 2)) {
              return res.status(403)
                .send({ message: 'You are not authorized to view this document' });
            }
            
            res.status(200).send({
              document: document
            });
          })
          .catch(() => res.status(400).send({
            message: 'An error occured. Invalid parameters, try again!'
          }));
      });
  }
}

export default DocumentsController;