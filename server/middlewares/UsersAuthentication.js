import jwt from 'jsonwebtoken';
import db from '../models';

const Role = db.Role;
const secret = process.env.SECRET || 'mySecret';

/**
 * UsersAuthentication class to authenticate users
 *
 * @class UsersAuthentication
 */
class UsersAuthentication {
  /**
   * verifyToken - Verifies if a token supplied is valid or not
   *
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
