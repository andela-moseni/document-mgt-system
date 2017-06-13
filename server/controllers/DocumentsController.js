import db from '../models';
import ControllerHelper from '../helpers/ControllerHelper';

const Role = db.Role;
const Document = db.Document;
const User = db.User;

/**
 *
 * DocumentsController class to create and manage documents
 * @class DocumentsController
 */
class DocumentsController {
  /**
   * Create a new Document
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @memberOf DocumentsController
   */
  static createDocument(req, res) {
    if (req.body.title &&
        req.body.content &&
        req.body.access &&
        req.body.type) {
      Document
        .create({
          title: req.body.title,
          content: req.body.content,
          access: req.body.access,
          type: req.body.type,
          OwnerId: req.decoded.userId,
        })
        .then(document => res.status(201).send(document))
        .catch(() => res.status(400).send({
          message: 'An error occured. Invalid parameters, try again!',
        }));
    } else {
      return res.status(400).send({
        message: 'All fields are required.'
      });
    }
  }

  /**
   * List all Documents
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @memberOf DocumentsController
   */
  static listDocuments(req, res) {
    Role.findById(req.decoded.roleId)
      .then((role) => {
        let query = {};
        query.limit = (req.query.limit > 0) ? req.query.limit : 10;
        query.offset = (req.query.offset > 0) ? req.query.offset : 0;
        // query.attributes = { exclude: ['OwnerId'] };

        if (role.title === 'admin') {
          Document
            .findAndCountAll(query)
            .then((documents) => {
              const pagination = ControllerHelper.pagination(
                query.limit, query.offset, documents.count,
              );
              return res.status(200).send({
                pagination, documents: documents.rows,
              });
            });
        } else {
          query = {
            where: {
              $or: {
                $or: {
                  access: { $eq: 'public' },
                  $and: {
                    access: { $eq: 'role' },
                    OwnerId: { $eq: req.decoded.userId },
                  },
                  $and: {
                    access: { $eq: 'role' },
                    '$User.roleId$': { $eq: req.decoded.roleId },
                  },
                },
                OwnerId: { $eq: req.decoded.userId },
              },
            },
            include: [
              {
                model: User,
              },
            ],
          };

          query.limit = (req.query.limit > 0) ? req.query.limit : 10;
          query.offset = (req.query.offset > 0) ? req.query.offset : 0;

          Document
            .findAndCountAll(query)
            .then((documents) => {
              const filteredDocuments = documents.rows
              .map(document => Object.assign({}, {
                id: document.id,
                title: document.title,
                content: document.content,
                access: document.access,
                type: document.type,
                OwnerId: document.OwnerId,
                createdAt: document.createdAt,
                updatedAt: document.updatedAt,
              }));
              const pagination = ControllerHelper.pagination(
                query.limit, query.offset, documents.count,
              );
              res.status(200).send({
                pagination, documents: filteredDocuments,
              });
            });
        }
      });
  }

  /**
   *
   * Retrieve a specific document based on the id
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @memberOf DocumentsController
   */
  static retrieveDocument(req, res) {
    Role.findById(req.decoded.roleId)
      .then((role) => {
        Document
          .findById(req.params.id)
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document does not exist',
              });
            }

            if ((role.title !== 'admin') && (document.access === 'private') &&
              (document.OwnerId !== req.decoded.userId)) {
              return res.status(403)
                .send({
                  message: 'You are not allowed to view this document',
                });
            }

            User.findById(document.OwnerId).then((user) => {
              if ((role.title !== 'admin') && (document.access === 'role') &&
                (user.roleId !== req.decoded.roleId)) {
                return res.status(403)
                  .send({
                    message: 'You are not allowed to view this document',
                  });
              }

              res.status(200).send({
                document,
              });
            });
          })
          .catch(() => res.status(400).send({
            message: 'An error occured. Invalid parameters, try again!',
          }));
      });
  }

  /**
   *
   * Update a document based on the id
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @memberOf DocumentsController
   */
  static updateDocument(req, res) {
    Role.findById(req.decoded.roleId)
      .then((role) => {
        Document
          .findById(req.params.id)
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document does not exist',
              });
            }
            if ((role.title !== 'admin') &&
            (document.OwnerId !== req.decoded.userId)) {
              return res.status(403)
                .send({
                  message: 'You are not allowed to update this document',
                });
            }
            if (req.body.OwnerId && !(role.title === 'admin')) {
              return res.status(403).send({
                message: 'You cannot edit document OwnerId property',
              });
            }
            document
              .update(req.body, { fields: Object.keys(req.body) })
              .then(updatedDocument => res.status(200).send({
                message: 'Update successful!',
                updatedDocument,
              })).catch(() => res.status(400).send({
                message: 'All fields are required',
              }));
          })
          .catch(() => res.status(400).send({
            message: 'An error occured. Invalid parameters, try again!',
          }));
      });
  }

  /**
   *
   * Delete a particular Document
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @memberOf DocumentsController
   */
  static deleteDocument(req, res) {
    Role
      .findById(req.decoded.roleId)
      .then((role) => {
        Document
          .findById(req.params.id)
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document does not exist',
              });
            }
            if ((role.title !== 'admin') &&
            (document.OwnerId !== req.decoded.userId)) {
              return res.status(403).send({
                message: 'You are not authorized to delete this document',
              });
            }
            document
              .destroy()
              .then(() => res.status(200).send({
                message: 'Document deleted successfully',
              }));
          })
          .catch(() => res.status(400).send({
            message: 'An error occured. Invalid parameters, try again!',
          }));
      });
  }

  /**


   * @return {Object} - Returns response object
   */

  /**
   * Gets all public documents relevant to search term
   * and documents with role access for priviledged users
   * @static
   * @param {Object} req Request object
   * @param {Object} res Response object
   *
   * @memberOf DocumentsController
   */
  static searchDocuments(req, res) {
    Role.findById(req.decoded.roleId)
      .then((role) => {
        const search = req.query.search.trim();

        let query = {
          where: {
            $and: [{
              $or: {
                title: {
                  $iLike: `%${search}%`,
                },
                content: {
                  $iLike: `%${search}%`,
                },
                access: {
                  $iLike: `%${search}%`,
                },
              },
            }, {
              $or: {
                access: { $ne: 'private' },
                OwnerId: { $eq: req.decoded.userId },
              },
            }],
            $or: {
              $or: {
                access: { $eq: 'public' },
                $and: {
                  access: { $eq: 'role' },
                  OwnerId: { $eq: req.decoded.userId },
                },
                $and: {
                  access: { $eq: 'role' },
                  '$User.roleId$': { $eq: req.decoded.roleId },
                },
              },
              OwnerId: { $eq: req.decoded.userId },
            },
          },
          include: [
            {
              model: User,
            },
          ],
        };

        if (role.title === 'admin') {
          query = {
            where: {
              $or: {
                title: {
                  $iLike: `%${search}%`,
                },
                content: {
                  $iLike: `%${search}%`,
                },
                access: {
                  $iLike: `%${search}%`,
                },
              },
            },
          };
        }

        query.limit = (req.query.limit > 0) ? req.query.limit : 10;
        query.offset = (req.query.offset > 0) ? req.query.offset : 0;
        Document
          .findAndCountAll(query)
          .then((documents) => {
            const filteredDocuments = documents.rows
            .map(document => Object.assign({}, {
              id: document.id,
              title: document.title,
              content: document.content,
              access: document.access,
              type: document.type,
              OwnerId: document.OwnerId,
              createdAt: document.createdAt,
              updatedAt: document.updatedAt,
            }));
            const pagination = ControllerHelper.pagination(
              query.limit, query.offset, documents.count,
            );
            if (!documents.rows.length) {
              return res.status(404).send({
                message: 'Search does not match any document!',
              });
            }
            res.status(200).send({
              pagination, documents: filteredDocuments,
            });
          });
      });
  }
}

export default DocumentsController;
