import jwt from 'jsonwebtoken';
import db from '../models';

const Role = db.Role;
const User = db.User;
const secret = process.env.SECRET || 'mySecret';

/**
 * UsersAuthentication class to authenticate users
 *
 * @class UsersAuthentication
 */
class UsersAuthentication {
  /**
   * verifyToken - Verifies if a token supplied is valid or not
   * restricts a deleted user access to endpoints
   * @static
   * @param  {Object} req  Request Object
   * @param  {Object} res  Response Object
   * @param  {Object} next Next action to be performed
   * @returns {Object} Response Status
   *
   * @memberOf UsersAuthentication
   */
  static verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({
        message: 'Authentication is required to access this route!',
      });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Authentication failed due to invalid token!',
        });
      }
      if (!req.decoded) {
        return User.findById(decoded.userId)
        .then((user) => {
          if (!user) {
            return res.status(403).send({
              message: 'You do not have permission to access this route.',
            });
          }
          req.decoded = decoded;
          next();
        });
      }
      req.decoded = decoded;
      next();
    });
  }

  /**
   * verifyAdmin - Verifies that the given user role is an admin
   * For strictly admin routes
   *
   * @static
   * @param  {Object} req  Request Object
   * @param  {Object} res  Response Object
   * @param  {Object} next Next action to be performed
   *
   * @memberOf UsersAuthentication
   */
  static verifyAdmin(req, res, next) {
    Role.findById(req.decoded.roleId)
      .then((role) => {
        if (role.title === 'admin') {
          next();
        } else {
          return res.status(403).send({
            message: 'Access Restricted. You are not an admin!',
          });
        }
      });
  }
}

export default UsersAuthentication;
