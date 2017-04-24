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
    Role.findById(31)
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
                OwnerId: { $eq: 3 }
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
    Role.findById(33)
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
            !(document.OwnerId === 8)) {
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
  
  /**
   * Update a document based on the id
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Response object
   */
  static updateDocument(req, res) {
    Role.findById(33)
      .then((role) => {
        Document
          .findById(req.params.id)
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document Does Not Exist',
              });
            }
            if (!(role.title === 'admin') && !(document.OwnerId === 8)) {
              return res.status(403)
                .send({ message: 'You are not authorized to update this document' });
            }
            if (req.body.OwnerId && !(role.title === 'admin')) {
              return res.status(400).send({
                message: 'You cannot edit document ownerId property'
              });
            }
            document
              .update(req.body, { fields: Object.keys(req.body) })
              .then(updatedDocument => res.status(200).send({
                message: 'Update successful!',
                updatedDocument
            }));
        })
        .catch(() => res.status(400).send({
          message: 'An error occured. Invalid parameters, try again!'
        }));
    });
  }

  /**
   * Delete a particular Document
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static deleteDocument(req, res) {
    Role
      .findById(33)
      .then((role) => {
        Document
          .findById(req.params.id)
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document Does Not Exist',
              });
            }
            if ((role.title !== 'admin') && !(document.OwnerId === 8)) {
              return res.status(403).send({
                message: 'You are not authorized to delete this document',
              });
            }
          document
            .destroy()
            .then(() => res.status(200).send({
              message: 'Document deleted successfully.',
          }));
        })
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!'
      }));
    });
  }
  
  /**
   * Gets all public documents relevant to search term
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @return {Object} - Returns response object
   */
  static searchDocuments(req, res) {
    Role.findById(33)
      .then((role) => {
        const term = req.query.term;

        if (term === '') {
          return res.status(400).send({
            message: 'Invalid Search Parameter!'
          });
        }
        if (!term) {
          return res.status(404).send({
            message: 'Search Does Not Match Any Document!'
          });
        }
        let query = {
          where: {
            $and: [{
              $or: {
                title: {
                  $iLike: `%${term}%`
                },
                content: {
                  $iLike: `%${term}%`
                }
              }
            }, {
              $or: {
                access: { $ne: 'private' },
                OwnerId: { $eq: 8 }
              }
            }
            ]
          }
        };

        if (role.title === 'admin') {
          query = {
            where: {
              $or: {
                title: {
                  $iLike: `%${term}%`
                },
                content: {
                  $iLike: `%${term}%`
                }
              }
            }
          };
        }

        query.limit = (req.query.limit > 0) ? req.query.limit : 10;
        query.offset = (req.query.offset > 0) ? req.query.offset : 0;
        query.order = '"createdAt" DESC';
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
      })
      .catch(() => res.status(400).send({
        message: 'An error occured. Try again!'
      }));
  }
}

export default DocumentsController;