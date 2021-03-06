import supertest from 'supertest';
import chai from 'chai';

import SpecHelper from '../helpers/SpecHelper';
import app from '../../../server';

const expect = chai.expect;
const request = supertest.agent(app);

const adminUser = SpecHelper.specUser1;
const regularUser = SpecHelper.specUser2;
const invalidUser = SpecHelper.invalidUser;
const invalidUser2 = SpecHelper.invalidUser2;
const invalidUser3 = SpecHelper.invalidUser3;
const invalidUser4 = SpecHelper.invalidUser4;
const regularUser2 = SpecHelper.specUser3;
const regularUser3 = SpecHelper.specUser5;
const authorUser = SpecHelper.specUser6;

// error messages
const invalidParameters = 'An error occured. Invalid parameters, try again!';
const userExist = 'User already exist!';
const invalidCredentials = 'Invalid login credentials. Try again!';
const userNotFound = 'User does not exist';
const notAllowed =
'Unauthorised access. You cannot update this user\'s property';
const noDocumentFound = 'No document match the request.';

describe('User API:', () => {
  let adminUserToken;
  let regularUserToken;
  let regularUser2Token;
  let authorUserToken;
  let user = {};

  // Test users http requests
  describe('Users REQUESTS:', () => {
    // POST requests - Create Users
    describe('POST: (/api/users) - ', () => {
      it(`should not create a user when name,
      email and/or password fields are invalid`,
      (done) => {
        request.post('/api/users')
          .send(invalidUser)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal('All fields are required.');
            done();
          });
      });

      it(`should not create a user when name,
      email and/or password fields are invalid`,
      (done) => {
        request.post('/api/users')
          .send(invalidUser4)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal(invalidParameters);
            done();
          });
      });

      it(`should create a user when name, email and password fields are valid
      and user does not exists`, (done) => {
        request.post('/api/users')
          .send(regularUser2)
          .end((error, response) => {
            user = response.body.user;
            user.token = response.body.token;
            expect(response.status).to.equal(201);
            done();
          });
      });

      it(`should create a user when name, email and password fields are valid
      and user does not exists`, (done) => {
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
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal(userExist);
            done();
          });
      });

      it('should not create a user if user already exists', (done) => {
        request.post('/api/users')
          .send(authorUser)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal(userExist);
            done();
          });
      });
    });
  });

  // POST requests - Login User
  describe('POST: (/api/users/login) - ', () => {
    it(`should not login a user if email and/or
    password fields are invalid`, (done) => {
      request.post('/api/users/login')
          .send(invalidUser2)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal(invalidCredentials);
            done();
          });
    });

    it('should not login a user if user details does not exist', (done) => {
      request.post('/api/users/login')
          .send(regularUser3)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal(invalidCredentials);
            done();
          });
    });

    it('should not login a user if user enters invalid credentials',
      (done) => {
        request.post('/api/users/login')
          .send(invalidUser3)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal(invalidCredentials);
            done();
          });
      });

    it(`should login a user if user details exists and
    email and password fields are valid`, (done) => {
      request.post('/api/users/login')
          .send(adminUser)
          .end((error, response) => {
            adminUserToken = response.body.token;
            expect(response.status).to.equal(200);
            request.post('/api/users/login')
              .send(regularUser)
              .end((err, res) => {
                regularUserToken = res.body.token;
                regularUser.id = res.body.userId;
                expect(res.status).to.equal(200);
                request.post('/api/users/login')
                  .send(authorUser)
                  .end((err, res) => {
                    authorUserToken = res.body.token;
                    authorUser.id = res.body.userId;
                    expect(res.status).to.equal(200);
                    request.post('/api/users/login')
                      .send(regularUser2)
                      .end((err3, res3) => {
                        regularUser2Token = res3.body.token;
                        regularUser2.id = res3.body.userId;
                        expect(res.status).to.equal(200);
                        done();
                      });
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
            expect(Array.isArray(response.body.users));
            expect(response.body.users.length).to.equal(7);
            done();
          });
    });

      // it should return all users if user is not an admin
    it('should return all users if user is a regular user', (done) => {
      request.get('/api/users')
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.users));
            expect(response.body.users.length).to.equal(7);
            done();
          });
    });

    it('should return all users if user is an author', (done) => {
      request.get('/api/users')
          .set({ Authorization: authorUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.users));
            expect(response.body.users.length).to.equal(7);
            done();
          });
    });
  });

    // GET requests - Retrieve a user details
  describe('GET: (/api/users/:id) - ', () => {
    it(`should return the user if user is not an admin
      and user is not the current user`, (done) => {
      request.get(`/api/users/${user.id}`)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
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

    it(`should return the user if the id provided is valid
      and user is admin`, (done) => {
      request.get(`/api/users/${user.id}`)
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
    });

    it('should not return the user if id is not an integer', (done) => {
      request.get('/api/users/1q')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal(invalidParameters);
            done();
          });
    });

    it('should not return the user if id is invalid', (done) => {
      request.get('/api/users/40000000')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal(userNotFound);
            done();
          });
    });
  });

    //  PUT requests - Edit specific user
  describe('PUT: (/api/users/:id) - ', () => {
    it('should not edit user if id is invalid', (done) => {
      const fieldsToUpdate = { name: 'ade' };
      request.put('/api/users/45000032')
          .set({ Authorization: regularUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal(userNotFound);
            done();
          });
    });

    it(`should not edit user if name, email and/or
    password field is invalid`, (done) => {
      const fieldsToUpdate = { name: 'ade1' };
      request.put('/api/users/1')
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message)
            .to.equal('Invalid parameters, try again!');
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
            expect(response.body.message).to
            .equal('Unauthorised access. You cannot update userId property');
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
            expect(response.body.message).to
            .equal('Unauthorised access. You cannot update roleId property');
            done();
          });
    });

    it('should not edit roleTitle property of the user', (done) => {
      const fieldsToUpdate = { roleTitle: 'author' };
      request.put(`/api/users/${user.id}`)
          .set({ Authorization: regularUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
            .equal('Unauthorised access. You cannot update roleTitle property');
            done();
          });
    });

    it('should not edit the user if id is not an integer', (done) => {
      request.put('/api/users/1q')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal(invalidParameters);
            done();
          });
    });

    it(`should edit the user's property if user is admin
      and id is valid`, (done) => {
      const fieldsToUpdate =
        {
          name: 'Mercy Ade',
          email: 'mercy.oseni@test.com',
        };
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

    it(`should not edit the user's property if user is not
      the current user`, (done) => {
      const fieldsToUpdate =
        {
          name: 'Mercy Ade',
          email: 'mercy.oseni@test.com',
        };
      request.put(`/api/users/${user.id}`)
          .set({ Authorization: regularUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to.equal(notAllowed);
            done();
          });
    });

    it(`should edit the user's property if user is the
      current user`, (done) => {
      const fieldsToUpdate =
        { name: 'Mercy Ade',
          email: 'mercy.oseni@test.com',
        };
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

    // DELETE requests - Delete specific user
  describe('DELETE: (/api/users/:id) - ', () => {
    it('should not delete user if id is not an integer', (done) => {
      request.delete('/api/users/2ab')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal(invalidParameters);
            done();
          });
    });

    it('should not delete user if id is invalid', (done) => {
      request.delete('/api/users/2758903')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal(userNotFound);
            done();
          });
    });

    it(`should not delete user when id is valid and user is not
      the current user`, (done) => {
      request.delete(`/api/users/${user.id}`)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
              .equal('You are not authorized to delete this user');
            done();
          });
    });

    it('should not delete default admin user account', (done) => {
      request.delete('/api/users/1')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
              .equal('You cannot delete default admin user account');
            done();
          });
    });

    it('should delete user when id is valid and user is admin', (done) => {
      request.delete(`/api/users/${user.id}`)
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
              .equal('User deleted successfully.');
            done();
          });
    });
  });

    // GET requests - Retrieve specific user's documents
  describe('GET: (/api/users/:id/documents) - ', () => {
    const invalidId = '2q';
    it('should not return user\'s documents if id is invalid',
      (done) => {
        request.get('/api/users/324785/documents')
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal(noDocumentFound);
            done();
          });
      });

    it('should not return user\'s documents if id is not an integer',
      (done) => {
        request.get(`/api/users/${invalidId}/documents`)
          .set({
            Authorization: regularUserToken,
          })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal(invalidParameters);
            done();
          });
      });

    it('should return user\'s documents if user is admin', (done) => {
      request.get(`/api/users/${regularUser.id}/documents`)
          .set({
            Authorization: adminUserToken,
          })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents));
            expect(response.body.documents.length).to.equal(4);
            done();
          });
    });

    it('should not return user\'s documents if user is not owner', (done) => {
      request.get(`/api/users/${authorUser.id}/documents`)
          .set({
            Authorization: regularUserToken,
          })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
              .equal(noDocumentFound);
            done();
          });
    });

    it(`should return user's documents if user is not owner
      but has the same role as user`, (done) => {
      request.get(`/api/users/${regularUser.id}/documents`)
          .set({ Authorization: regularUser2Token })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents));
            expect(response.body.documents.length).to.equal(2);
            done();
          });
    });

    it(`should not return user's documents if user is not owner
      and doesn't have the same role as user`, (done) => {
      request.get(`/api/users/${authorUser.id}/documents`)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal(noDocumentFound);
            done();
          });
    });
  });

    // GET requests - Search user(s): Gets all users relevant to search query
  describe('GET: (/api/search/users?search) - ', () => {
    const validQuery = 'mercy';
    const invalidQuery = 'abc';
    it('should return all user(s) if search term is empty', (done) => {
      request.get('/api/search/users?search=')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.users));
            expect(response.body.users.length).to.equal(6);
            done();
          });
    });

    it('should not return user(s) if search term doesn\'t match', (done) => {
      request.get(`/api/search/users?search=${invalidQuery}`)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal('Search does not match any user!');
            done();
          });
    });

    it('should return matching users if search term match',
      (done) => {
        request.get(`/api/search/users?search=${validQuery}`)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.users));
            expect(response.body.users.length).to.equal(1);
            done();
          });
      });
  });
});
