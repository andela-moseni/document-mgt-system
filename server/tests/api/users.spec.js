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
const regularUser3 = SpecHelper.testUser5;

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
            expect(response.body.message).to.equal('An error occured. Invalid parameters, try again!');
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
            expect(response.body.message).to.equal('User Already Exist!');
            done();
          });
      });
    });
  });

  // POST requests - Login User
    describe('POST: (/api/users/login) - ', () => {
      it('should not login a user if required fields are invalid', (done) => {
        const newUser = {
          mEmail: regularUser.email,
          Ppassword: regularUser.password
        };
        request.post('/api/users/login')
          .send(newUser)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('Invalid Login Credentials. Try Again!');
            done();
          });
      });

      it('should not login a user if user details does not exist', (done) => {
        request.post('/api/users/login')
          .send(regularUser3)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('Invalid Login Credentials. Try Again!');
            done();
          });
      });

      it('should login a user if user details exists', (done) => {
        request.post('/api/users/login')
          .send(adminUser)
          .end((error, response) => {
            adminUserToken = response.body.token;
            expect(response.status).to.equal(200);
            request.post('/api/users/login')
              .send(regularUser)
              .end((err, res) => {
                regularUserToken = res.body.token;
                expect(res.status).to.equal(200);
                done();
              });
          });
      });
    });

    // POST requests - Logout User
    describe('POST: (/api/users/logout) - ', () => {
      it('should logout a user if valid token is provided', (done) => {
        request.post('/api/users/logout')
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Successfully logged out!');
            done();
          });
      });
    });

    // GET requests - Retrieve all Users
    describe('GET: (/api/users) - ', () => {
      it('should return all users if user is admin', (done) => {
        request.get('/api/users')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.users)).to.be.true;
            expect(response.body.users.length).to.equal(4);
            done();
          });
      });
      it('should not return all users if user is a regular user', (done) => {
        request.get('/api/users')
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(Array.isArray(response.body.users)).to.be.false;
            expect(response.body.message).to.equal('Access Restricted. You are not an admin!');
            done();
          });
      });
    });
});
