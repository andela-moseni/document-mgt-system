import db from '../models'
const Role = db.Role;

/**
 * RolesController class to create and manage roles
 */
class RolesController {
  /**
   * Create a new Role
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static create(req, res) {
    Role
      .create({
        title: req.body.title,
      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send({
        message: error.errors[0].message
      }));
  }
};

export default RolesController;