import jwt from 'jsonwebtoken';
import db from '../models';
import ControllerHelper from '../helpers/ControllerHelper';

const User = db.User;
const Role = db.Role;
const Document = db.Document;
const secret = process.env.SECRET || 'mySecret';

/**
 * UsersController class to create and manage users
 *
 * @class UsersController
 */
class UsersController {
  /**
   * Login a user
   *
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @memberOf UsersController
   */
  static login(req, res) {
    const query = {
      where: { email: req.body.email },
    };
    User.findOne(query)
      .then((user) => {
        if (!req.body.password) {
          return res.status(200)
            .send({ message: 'Invalid login credentials. Try again!' });
        }
        if (user && user.validatePassword(req.body.password)) {
          const token = jwt
          .sign({
            userId: user.id,
            roleId: user.roleId,
            user: user.name,
            email: user.email,
            roleTitle: user.roleTitle,
          },
          secret, { expiresIn: '12 hours' });
          return res.status(200).send({
            token,
            userId: user.id,
            roleId: user.roleId,
            roleTitle: user.roleTitle,
          });
        }
        res.status(200)
          .send({ message: 'Invalid login credentials. Try again!' });
      });
  }

  /**
   * Logout a user
   *
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @memberOf UsersController
   */
  static logout(req, res) {
    res.status(200)
      .send({ message: 'Successfully logged out!' });
  }


  /**
   * Create a user
   *
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @memberOf UsersController
   */
  static createUser(req, res) {
    User.findOne({ where: { email: req.body.email } })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(200).send({
            message: 'User already exist!',
          });
        }
        if (req.body.name &&
        req.body.email &&
        req.body.password) {
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            roleId: 2,
            roleTitle: 'regular',
          })
          .then((user) => {
            const token = jwt
            .sign({ userId: user.id,
              roleId: user.roleId,
              user: user.name,
              email: user.email,
              roleTitle: 'regular' },
            secret, { expiresIn: '12 hours' });
            res.status(201).send({ token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roleId: user.roleId,
                roleTitle: 'regular',
              },
            });
          })
          .catch(() => res.status(400).send({
            message: 'An error occured. Invalid parameters, try again!',
          }));
        } else {
          return res.status(200).send({
            message: 'All fields are required.'
          });
        }
      });
  }

  /**
   * List all users
   *
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @memberOf UsersController
   */
  static listUsers(req, res) {
    const query = {};
    query.limit = (req.query.limit > 0) ? req.query.limit : 10;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.attributes = { exclude: ['password'] };

    User
      .findAndCountAll(query)
      .then((users) => {
        const pagination = ControllerHelper.pagination(
          query.limit, query.offset, users.count,
        );
        res.status(200).send({
          pagination, users: users.rows,
        });
      });
  }

  /**
   * Retrive a user's details
   *
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @memberOf UsersController
   */
  static retrieveUser(req, res) {
    User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User does not exist',
          });
        }
        req.decoded.user = user;
        res.status(200).send(req.decoded.user);
      })
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!',
      }));
  }

  /**
   * Update a user
   *
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @memberOf UsersController
   */
  static updateUser(req, res) {
    Role.findById(req.decoded.roleId)
      .then((role) => {
        User
          .findById(req.params.id)
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'User does not exist',
              });
            }
            if (req.body.id) {
              return res.status(403).send({
                message:
                'Unauthorised access. You cannot update userId property',
              });
            }
            // roleId should not be updated by a regular user
            if ((role.title !== 'admin') && (req.body.roleId)) {
              return res.status(403).send({
                message:
                'Unauthorised access. You cannot update roleId property',
              });
            }
            // roleTitle should not be updated by a regular user
            if ((role.title !== 'admin') && (req.body.roleTitle)) {
              return res.status(403).send({
                message:
                'Unauthorised access. You cannot update roleTitle property',
              });
            }
            // a user should not update another user's property
            if ((role.title !== 'admin') && (req.decoded.userId !== user.id)) {
              return res.status(403).send({
                message:
                'Unauthorised access. You cannot update this user\'s property',
              });
            }
            user
              .update(req.body, { fields: Object.keys(req.body) })
              .then(() => res.status(200).send({
                message: 'Update Successful!',
                user,
              }))
              .catch(() => res.status(400).send({
                message: 'Invalid parameters, try again!',
              }));
          })
        .catch(() => res.status(400).send({
          message: 'An error occured. Invalid parameters, try again!',
        }));
      });
  }

  /**
   * Delete a particular Document
   *
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @memberOf UsersController
   */
  static deleteUser(req, res) {
    Role
      .findById(req.decoded.roleId)
      .then((role) => {
        User
          .findById(req.params.id)
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'User does not exist',
              });
            }
            if ((role.title !== 'admin') && (req.decoded.userId !== user.id)) {
              return res.status(403).send({
                message: 'You are not authorized to delete this user',
              });
            }
            if ((role.title === 'admin') &&
            ((Number(req.params.id) === 1) || user.id === 1)) {
              return res.status(200)
              .send({ message:
                'You cannot delete default admin user account',
              });
            }
            user
            .destroy()
            .then(() => res.status(200).send({
              message: 'User deleted successfully.',
            }));
          })
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!',
      }));
      });
  }

  /**
   * Retrieve all documents belonging to a user
   *
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @memberOf UsersController
   */
  static retrieveUserDocuments(req, res) {
    Role
      .findById(req.decoded.roleId)
      .then((role) => {
        let query = {};
        if (role.title === 'admin') {
          query = {
            where: {
              OwnerId: { $eq: req.params.id },
            },
          };
        } else {
          query = {
            where: {
              $and: {
                OwnerId: { $eq: req.params.id },
                $or: {
                  access: { $eq: 'public' },
                  $and: {
                    access: { $eq: 'private' },
                    OwnerId: { $eq: req.decoded.userId },
                  },
                  $or: {
                    $and: {
                      access: { $eq: 'role' },
                      '$User.roleId$': { $eq: req.decoded.roleId },
                    },
                  },
                },
              },
            },
            include: [
              {
                model: User,
              },
            ],
          };
        }

        query.limit = (req.query.limit > 0) ? req.query.limit : 10;
        query.offset = (req.query.offset > 0) ? req.query.offset : 0;
        Document
          .findAndCountAll(query)
          .then((documents) => {
            const filteredDocuments = documents.rows
              .map(document => ({
                id: document.id,
                title: document.title,
                content: document.content,
                access: document.access,
                type: document.type,
                OwnerId: document.OwnerId,
                createdAt: document.createdAt,
                updatedAt: document.updatedAt, }));

            const pagination = ControllerHelper.pagination(
              query.limit, query.offset, documents.count,
            );
            if (!documents.rows.length) {
              return res.status(200).send({
                message: 'No document match the request.',
              });
            }
            res.status(200).send({
              pagination, documents: filteredDocuments,
            });
          })
          .catch(() => res.status(400).send({
            message: 'An error occured. Invalid parameters, try again!',
          }));
      });
  }

  /**
   * Gets all users relevant to search query
   *
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {string} - Returns response object
   *
   * @memberOf UsersController
   */
  static searchUsers(req, res) {
    const search = req.query.search.trim();

    const query = {
      where: {
        $or: [{
          name: {
            $iLike: `%${search}%`,
          },
          email: {
            $iLike: `%${search}%`,
          },
        }],
      },
    };

    query.limit = (req.query.limit > 0) ? req.query.limit : 10;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.order = '"createdAt" DESC';
    query.attributes = { exclude: ['password'] };
    User
      .findAndCountAll(query)
      .then((users) => {
        const pagination = ControllerHelper.pagination(
          query.limit, query.offset, users.count,
        );
        if (!users.rows.length) {
          return res.status(200).send({
            message: 'Search does not match any user!',
          });
        }
        res.status(200).send({
          pagination, users: users.rows,
        });
      });
  }
}

export default UsersController;
