import supertest from 'supertest';
import chai from 'chai';
import app from '../../../server';
import SpecHelper from '../helpers/SpecHelper';

const expect = chai.expect;
const request = supertest.agent(app);
const adminUser = SpecHelper.specUser1;

// error messages
const noRoleFound = 'Role does not exist';
const invalid =
'Validation error. Please enter unique parameters only!';
const invalidParameters = 'An error occured. Invalid parameters, try again!';
const notAllowed = 'An error occured. You cannot update default roles';
const notPermitted = 'An error occured. You cannot delete default roles';

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
      it('should not create a role when title field is invalid', (done) => {
        const newRole = { newTitle: 'basic' };
        request.post('/api/roles')
          .set({ Authorization: adminUserToken })
          .send(newRole)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            done();
          });
      });

      it(`should not create a role when title
      field contains non-alphabets`, (done) => {
        const newRole = { title: '12basic' };
        request.post('/api/roles')
          .set({ Authorization: adminUserToken })
          .send(newRole)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            done();
          });
      });

      it('should create a role if title field is valid', (done) => {
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
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal('Role already exist!');
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
            expect(Array.isArray(response.body.roles));
            expect(response.body.roles.length).to.equal(5);
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
            expect(response.body.message).to.equal(noRoleFound);
            done();
          });
      });

      it('should not return the role when id is not an integer', (done) => {
        request.get('/api/roles/abc')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal(invalidParameters);
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
            expect(response.body.message).to.equal(noRoleFound);
            done();
          });
      });

      it('should not edit role if id is not an integer', (done) => {
        const fieldsToUpdate = { title: 'intermediate' };
        request.put('/api/roles/1m')
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal(invalidParameters);
            done();
          });
      });

      it('should not edit role if title field is empty', (done) => {
        const fieldsToUpdate = { title: ' ' };
        request.put('/api/roles/3')
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('Invalid parameters');
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
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal(notAllowed);
            done();
          });
      });

      it('should not edit default regular role', (done) => {
        const fieldsToUpdate = { title: 'casual' };
        request.put('/api/roles/2')
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal(notAllowed);
            done();
          });
      });

      it('should not edit roles if role already exist', (done) => {
        const fieldsToUpdate = { title: 'basic' };
        request.put(`/api/roles/${role.id}`)
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal(invalid);
            done();
          });
      });

      it('should edit roles when id and title field is valid', (done) => {
        const fieldsToUpdate = { title: 'casual' };
        request.put(`/api/roles/${role.id}`)
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.updatedRole.title)
            .to.equal(fieldsToUpdate.title);
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
            expect(response.body.message).to.equal(noRoleFound);
            done();
          });
      });

      it('should not delete role if id is not an integer', (done) => {
        request.delete('/api/roles/5r')
          .set({
            Authorization: adminUserToken,
          })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal(invalidParameters);
            done();
          });
      });

      it('should not delete default admin role', (done) => {
        request.delete('/api/roles/1')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal(notPermitted);
            done();
          });
      });

      it('should not delete default regular role', (done) => {
        request.delete('/api/roles/2')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal(notPermitted);
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
      const validQuery = 'admin';
      const invalidQuery = 'xyz';
      it('should return all role(s) if search term is empty', (done) => {
        request.get('/api/search/roles?search=')
            .set({ Authorization: adminUserToken })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              expect(Array.isArray(response.body.roles));
              expect(response.body.roles.length).to.equal(4);
              done();
            });
      });

      it('should not return role(s) if search term doesn\'t match', (done) => {
        request.get(`/api/search/roles?search=${invalidQuery}`)
            .set({ Authorization: adminUserToken })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              expect(response.body.message).to
              .equal('Search does not match any role!');
              done();
            });
      });

      it('should return matching roles if search term match',
        (done) => {
          request.get(`/api/search/roles?search=${validQuery}`)
            .set({ Authorization: adminUserToken })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              expect(Array.isArray(response.body.roles));
              expect(response.body.roles.length).to.equal(1);
              done();
            });
        });
    });
  });
});
