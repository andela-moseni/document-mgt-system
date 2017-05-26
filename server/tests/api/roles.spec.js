/* eslint-disable no-unused-expressions */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../../server';
import SpecHelper from '../helpers/SpecHelper';

const expect = chai.expect;
const request = supertest.agent(app);
const adminUser = SpecHelper.specUser1;

describe('Role API:', () => {
  let adminUserToken;
  const role = {};

  // Login users to access this endpoint
  before((done) => {
    request.post('/api/users/login')
      .send(adminUser)
      .end((error, response) => {
        adminUserToken = response.body.token;
        done();
      });
  });

  // Test roles http requests
  describe('ROLES REQUESTS:', () => {
    // POST requests - Create Roles
    describe('POST: (/api/roles)', () => {
      it('should not create a role when required field is invalid', (done) => {
        const newRole = { newTitle: 'basic' };
        request.post('/api/roles')
          .set({ Authorization: adminUserToken })
          .send(newRole)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            done();
          });
      });

      it('should create a role if required field is valid', (done) => {
        const newRole = { title: 'basic' };
        request.post('/api/roles')
          .set({ Authorization: adminUserToken })
          .send(newRole)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            role.id = response.body.id;
            role.title = response.body.title;
            done();
          });
      });

      it('should not create a role if role already exist', (done) => {
        const newRole = { title: 'basic' };
        request.post('/api/roles')
          .set({ Authorization: adminUserToken })
          .send(newRole)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('Validation error. Please enter unique parameters only!');
            done();
          });
      });
    });

    // GET requests - Retrieve all Roles
    describe('GET: (/api/roles)', () => {
      it('should return all roles', (done) => {
        request.get('/api/roles')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.roles)).to.be.true;
            done();
          });
      });
    });

    // GET requests - Retrieve specific role
    describe('GET: (/api/roles/:id)', () => {
      it('should not return the role when id is invalid', (done) => {
        request.get('/api/roles/2890')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Role Does Not Exist');
            done();
          });
      });

      it('should not return the role when id is non-integer', (done) => {
        request.get('/api/roles/abc')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured. Invalid parameters, try again!');
            done();
          });
      });

      it('should return the role when id is valid', (done) => {
        request.get(`/api/roles/${role.id}`)
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
    });

    //  PUT Requests - Edit specific role
    describe('PUT: (/api/roles/:id)', () => {
      it('should not edit role if id is invalid', (done) => {
        const fieldsToUpdate = { title: 'intermediate' };
        request.put('/api/roles/3382')
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Role Does Not Exist');
            done();
          });
      });

      it('should not edit role if id is non-integer', (done) => {
        const fieldsToUpdate = { title: 'intermediate' };
        request.put('/api/roles/1m')
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured. Invalid parameters, try again!');
            done();
          });
      });

      // it should not edit default roles
      it('should not edit default admin role', (done) => {
        const fieldsToUpdate = { title: 'superAdmin' };
        request.put('/api/roles/1')
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured. You cannot update default roles');
            done();
          });
      });

      it('should not edit default regular role', (done) => {
        const fieldsToUpdate = { title: 'casual' };
        request.put('/api/roles/2')
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured. You cannot update default roles');
            done();
          });
      });

      it('should not edit roles if role already exist', (done) => {
        const fieldsToUpdate = { title: 'basic' };
        request.put(`/api/roles/${role.id}`)
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('Validation error. Please enter unique parameters only!');
            done();
          });
      });

      it('should edit roles when id and title is valid', (done) => {
        const fieldsToUpdate = { title: 'casual' };
        request.put(`/api/roles/${role.id}`)
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            // expect(response.body.title).to.equal(fieldsToUpdate.title);
            done();
          });
      });
    });

    // DELETE Requests - Delete specific role
    describe('DELETE: (/api/roles/:id)', () => {
      it('should not delete role if id is invalid', (done) => {
        request.delete('/api/roles/8728')
          .set({
            Authorization: adminUserToken,
          })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Role Does Not Exist');
            done();
          });
      });

      it('should not delete role if id is non-integer', (done) => {
        request.delete('/api/roles/5r')
          .set({
            Authorization: adminUserToken,
          })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured. Invalid parameters, try again!');
            done();
          });
      });

      it('should not delete default admin role', (done) => {
        request.delete('/api/roles/1')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured. You cannot delete default roles');
            done();
          });
      });

      it('should not delete default regular role', (done) => {
        request.delete('/api/roles/2')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured. You cannot delete default roles');
            done();
          });
      });

      it('should delete role when id is valid', (done) => {
        request.delete(`/api/roles/${role.id}`)
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal('Role deleted successfully');
            done();
          });
      });
    });
      // GET requests - Search role(s): Gets all roles relevant to search query
    describe('GET: (/api/search/roles?search) - ', () => {
      const search = 'admin';
      const term = 'xyz';
      it('should not return role(s) if search term is empty', (done) => {
        request.get('/api/search/roles?search=')
            .set({ Authorization: adminUserToken })
            .end((error, response) => {
              expect(response.status).to.equal(400);
              expect(response.body.message).to
              .equal('Invalid Search Parameter!');
              done();
            });
      });

      it('should not return role(s) if search term doesn\'t match', (done) => {
        request.get(`/api/search/roles?search=${term}`)
            .set({ Authorization: adminUserToken })
            .end((error, response) => {
              expect(response.status).to.equal(404);
              expect(response.body.message).to
              .equal('Search Does Not Match Any Role!');
              done();
            });
      });

      it('should return matching roles if search term match',
        (done) => {
          request.get(`/api/search/roles?search=${search}`)
            .set({ Authorization: adminUserToken })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              expect(Array.isArray(response.body.roles)).to.be.true;
              done();
            });
        });
    });
  });
});
