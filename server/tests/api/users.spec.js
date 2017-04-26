/* eslint-disable no-unused-expressions */
import supertest from 'supertest';
import chai from 'chai';

import SpecHelper from '../helpers/SpecHelper';
import app from '../../../server';

const expect = chai.expect;
const request = supertest.agent(app);
const adminUser = SpecHelper.testUser1;
const regularUser = SpecHelper.testUser2;
const invalidUser = SpecHelper.invalidUser;
const regularUser2 = SpecHelper.testUser3;

describe('User API:', () => {
  let adminUserToken;
  let regularUserToken;
  let user = {};

  // Test users http requests
  describe('Users REQUESTS:', () => {
    // POST requests - Create Users
    describe('POST: (/api/users) - ', () => {
      it('should not create a user when required fields are invalid',
      (done) => {
        request.post('/api/users')
          .send(invalidUser)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            done();
          });
      });

      it('should create a user if user does not exists', (done) => {
        request.post('/api/users')
          .send(regularUser2)
          .end((error, response) => {
            user = response.body.user;
            user.token = response.body.token;
            expect(response.status).to.equal(201);
            done();
          });
      });

      it('should not create a user if user already exists', (done) => {
        request.post('/api/users')
          .send(regularUser2)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            done();
          });
      });
    });
  });
});
