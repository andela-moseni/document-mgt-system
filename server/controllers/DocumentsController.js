import db from '../models'
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
  static create(req, res) {
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
}

export default DocumentsController;