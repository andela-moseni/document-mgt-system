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
const invalidUser2 = SpecHelper.invalidUser2;
const regularUser2 = SpecHelper.testUser3;
const regularUser3 = SpecHelper.testUser5;
const authorUser = SpecHelper.testUser6;

describe('User API:', () => {
  let adminUserToken, regularUserToken, authorUserToken;
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

      it('should create a user if user does not exists', (done) => {
        request.post('/api/users')
          .send(authorUser)
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

      it('should not create a user if user already exists', (done) => {
        request.post('/api/users')
          .send(authorUser)
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
        request.post('/api/users/login')
          .send(invalidUser2)
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
              request.post('/api/users/login')
              .send(authorUser)
              .end((err, res) => {
                authorUserToken = res.body.token;
                expect(res.status).to.equal(200);
                done();
              });
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
            expect(response.body.users.length).to.equal(6);
            done();
          });
      });

      // it should not return all users if user is not an admin
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
      
      it('should not return all users if user is an author', (done) => {
        request.get('/api/users')
          .set({ Authorization: authorUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(Array.isArray(response.body.users)).to.be.false;
            expect(response.body.message).to.equal('Access Restricted. You are not an admin!');
            done();
          });
      });
    });

    // GET requests - Retrieve a user details
    describe('GET: (/api/users/:id) - ', () => {
      it('should not return the user if user is not an admin and user is not the current user', (done) => {
        request.get(`/api/users/${user.id}`)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to.equal('You are not authorized to access this user');
            done();
          });
      });

      it('should return the user when user is current user', (done) => {
        request.get(`/api/users/${user.id}`)
          .set({ Authorization: user.token })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });

      it('should return the user if the id provided is valid and user is admin', (done) => {
        request.get(`/api/users/${user.id}`)
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });

      it('should not return the user if id is non-integer', (done) => {
        request.get('/api/users/1q')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('An error occured. Invalid parameters, try again!');
            done();
          });
      });

      it('should not return the user if id is invalid', (done) => {
        request.get('/api/users/40000000')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('User Does Not Exist');
            done();
          });
      });

    });

    //  PUT Requests - Edit specific user
    describe('PUT: (/api/users/:id) - ', () => {
      it('should not edit user if id is invalid', (done) => {
        const fieldsToUpdate = 
        { 
          title: 'LadiesInTech',
          content: 'We love coding.' 
        };
        request.put('/api/users/45000032')
          .set({ Authorization: regularUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('User Does Not Exist');
            done();
          });
      });

      it('should not edit userId property of the user', (done) => {
        const fieldsToUpdate = { id: 2 };
        request.put(`/api/users/${user.id}`)
          .set({ Authorization: regularUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to.equal('Unauthorised access. You cannot update userId property');
            done();
          });
      });

      it('should not edit roleId property of the user', (done) => {
        const fieldsToUpdate = { roleId: 2 };
        request.put(`/api/users/${user.id}`)
          .set({ Authorization: regularUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to.equal('Unauthorised access. You cannot update roleId property');
            done();
          });
      });

      it('should not edit the user if id is non-integer', (done) => {
        request.put('/api/users/1q')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('An error occured. Invalid parameters, try again!');
            done();
          });
      });

      // it(`should not edit the user\'s property if user is admin and fields
      // to be updated are invalid`, (done) => {
      //   const fieldsToUpdate = { Nname: 'Mercy Ade', email: 'mercy.oseni@test.com' };
      //   request.get(`/api/users/${user.id}`)
      //     .set({ Authorization: adminUserToken })
      //     .send(fieldsToUpdate)
      //     .end((error, response) => {
      //     expect(response.status).to.equal(400);
      //     expect(response.body.message).to.equal('An error occured. Invalid parameters, try again!')
      //     done();
      //     });
      // });

      it(`should edit the user's property if user is admin
      and id is valid`, (done) => {
        const fieldsToUpdate = { name: 'Mercy Ade', email: 'mercy.oseni@test.com' };
        request.put(`/api/users/${user.id}`)
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            const updatedFields = response.body.user;
            expect(response.status).to.equal(200);
            expect(updatedFields.name).to.equal(fieldsToUpdate.name);
            expect(updatedFields.email).to.equal(fieldsToUpdate.email);
            done();
          });
      });

      it('should not edit the user\'s property if user is not the current user', (done) => {
        const fieldsToUpdate = { name: 'Mercy Ade', email: 'mercy.oseni@test.com' };
        request.put(`/api/users/${user.id}`)
          .set({ Authorization: regularUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            // expect(response.body.message).to.equal('Unauthorised access. You cannot update this user\'s property');
            done();
          });
      });

      it('should edit the user\'s property if user is the current user', (done) => {
        const fieldsToUpdate = { name: 'Mercy Ade', email: 'mercy.oseni@test.com' };
        request.put(`/api/users/${user.id}`)
          .set({ Authorization: user.token })
          .send(fieldsToUpdate)
          .end((error, response) => {
            const updatedUser = response.body.user;
            expect(response.status).to.equal(200);
            expect(updatedUser.name).to.equal(fieldsToUpdate.name);
            expect(updatedUser.email).to.equal(fieldsToUpdate.email);
            done();
          });
      });

      
    });
    
});