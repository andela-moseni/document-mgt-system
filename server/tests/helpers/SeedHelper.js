import bcrypt from 'bcrypt-nodejs';
import logger from 'fm-log';

import model from '../../../server/models';
import SpecHelper from './SpecHelper';

const adminUser = SpecHelper.specUser1;
const regularUser1 = SpecHelper.specUser2;
const regularUser2 = SpecHelper.specUser4;
const authorUser1 = SpecHelper.specUser7;
const authorUser2 = SpecHelper.specUser8;

/**
 * SeedData class to populate database with default data
 */
class SeedHelper {

  /**
   * Perform the sequential population of the model
   * in order of associations
   * @return {Void} - Returns Void
   */
  static init() {
    logger.notice('Populating the Database....');
    model.sequelize.sync({
      force: true
    })
      .then(() => {
        SeedHelper.populateRoleTable()
          .then(() => {
            SeedHelper.populateUserTable()
              .then(() => {
                SeedHelper.populateDocumentTable()
                  .catch((err) => {
                    logger.error(err);
                  });
              })
              .catch((err) => {
                logger.error(err);
              });
          })
          .catch((err) => {
            logger.error(err);
          });
      })
      .catch((err) => {
        logger.error(err);
      });
  }

  /**
   * Populates model with default roles
   * @returns {object} - A Promise object
   */
  static populateRoleTable() {
    const roles = [SpecHelper.adminRole, SpecHelper.regularRole,
    SpecHelper.authorRole, SpecHelper.contributorRole];
    return model.Role.bulkCreate(roles);
  }

  /**
   * Define bycript to hash password
   * @param {String} password - User password
   * @returns {String} - Hashed password
   */
  static hashPass(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
  }

  /**
   * Populates model with default users
   * @returns {object} - A Promise object
   */
  static populateUserTable() {
    adminUser.password = SeedHelper.hashPass(adminUser.password);
    regularUser1.password = SeedHelper.hashPass(regularUser1.password);
    regularUser2.password = SeedHelper.hashPass(regularUser2.password);
    // authorUser.password = SpecHelper.hashPass(authorUser.password);
    const users = [adminUser, regularUser1, regularUser2, authorUser1, authorUser2];
    return model.User.bulkCreate(users);
  }

  /**
   * Populates model with default documents
   * @returns {object} - A Promise object
   */
  static populateDocumentTable() {
    const documents = [
      SpecHelper.specDocument1,
      SpecHelper.specDocument2,
      SpecHelper.specDocument3,
      SpecHelper.specDocument4,
      SpecHelper.specDocument5,
      SpecHelper.specDocument6,
      SpecHelper.specDocument7,
    ];
    return model.Document.bulkCreate(documents);
  }
}

export default SeedHelper.init();