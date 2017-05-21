import db from '../models';
import ControllerHelper from '../helpers/ControllerHelper';
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
  static createRole(req, res) {
    Role.findOne({ where: { title: req.body.title } })
    .then((existingRole) => {
      if (existingRole) {
        return res.status(400).send({
          message: 'Validation error. Please enter unique parameters only!',
        });
      }
      Role.create({
        title: req.body.title,
      })
      .then(role => res.status(201).send(role))
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!',
      }));
    });
  }

  /**
   * List all Roles
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static listRoles(req, res) {
    const query = {};
    query.limit = (req.query.limit > 0) ? req.query.limit : 10;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    Role
      .findAndCountAll(query)
      .then((roles) => {
        const pagination = ControllerHelper.pagination(
          query.limit, query.offset, roles.count,
        );
        res.status(200).send({
          pagination, roles: roles.rows,
        });
      });
  }

  /**
   * Retrive a Role based on id with all users on that role
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static retrieveRole(req, res) {
    Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Does Not Exist',
          });
        }
        res.status(200).send(role);
      })
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!',
      }));
  }

  /**
   * Update a Role based on id
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static updateRole(req, res) {
    Role.findOne({ where: { title: req.body.title } })
    .then((existingRole) => {
      if (existingRole) {
        return res.status(400).send({
          message: 'Validation error. Please enter unique parameters only!',
        });
      }
      Role.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Does Not Exist',
          });
        }
        if (role.title === 'regular' || role.title === 'admin') {
          return res.status(400).send({
            message: 'An error occured. You cannot update default roles',
          });
        }
        role
          .update(req.body, {
            fields: Object.keys(req.body),
          })
          .then(updatedRole => res.status(200).send({
            message: 'Update Successful', updatedRole,
          }));
      })
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!',
      }));
    });
  }

  /**
   * Delete a Role based on id
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static deleteRole(req, res) {
    Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Does Not Exist',
          });
        }
        if (role.title === 'regular' || role.title === 'admin') {
          return res.status(400).send({
            message: 'An error occured. You cannot delete default roles',
          });
        }
        role
          .destroy()
          .then(() => res.status(200).send({
            message: 'Role deleted successfully',
          }));
      })
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!',
      }));
  }

  /**
   * Get all roles relevant to search term
   * @static
   * @param {any} req
   * @param {any} res
   *
   * @memberOf RolesController
   */
  static searchRoles(req, res) {
    const search = req.query.search;

    if (search === '') {
      return res.status(400).send({
        message: 'Invalid Search Parameter!',
      });
    }
    const query = {
      where: {
        title: {
          $iLike: `%${search}%`,
        },
      },
    };

    query.limit = (req.query.limit > 0) ? req.query.limit : 10;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.order = '"createdAt" DESC';
    Role
      .findAndCountAll(query)
      .then((roles) => {
        const pagination = ControllerHelper.pagination(
          query.limit, query.offset, roles.count,
        );
        if (roles.rows.length === 0) {
          return res.status(404).send({
            message: 'Search Does Not Match Any Role!',
          });
        }
        res.status(200).send({
          pagination, roles: roles.rows,
        });
      });
  }
}

export default RolesController;
