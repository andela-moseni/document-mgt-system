/* eslint-disable no-unused-expressions */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../../server';
import SpecHelper from '../helpers/SpecHelper';

const expect = chai.expect;
const request = supertest.agent(app);

const adminUser = SpecHelper.specUser1;
const regularUser = SpecHelper.specUser2;
const regularUser2 = SpecHelper.specUser3;
const authorUser = SpecHelper.specUser4;
const invalidDocument = SpecHelper.invalidDocument;
const roleDocument2 = SpecHelper.specDocument2;
const roleDocument = SpecHelper.specDocument3;
const privateDocument = SpecHelper.specDocument4;
const publicDocument = SpecHelper.specDocument5;

describe('Document API:', () => {
  let adminUserToken, regularUserToken, authorUserToken, regularUser2Token;
  let roleDoc = {}, roleDoc2 = {}, privateDoc = {}, publicDoc = {};

  // Login users to access this endpoint
  before((done) => {
    request.post('/api/users/login')
      .send(adminUser)
      .end((error, response) => {
        adminUserToken = response.body.token;
        done();
      });
  });
  before((done) => {
    request.post('/api/users/login')
    .send(authorUser)
    .end((err, res) => {
      authorUserToken = res.body.token;
      authorUser.id = res.body.userId;
      done();
    });
  });
  before((done) => {
    request.post('/api/users/login')
    .send(regularUser2)
    .end((err, res) => {
      regularUser2Token = res.body.token;
      regularUser2.id = res.body.userId;
      done();
    });
  });
  before((done) => {
    request.post('/api/users/login')
    .send(regularUser)
    .end((err, res) => {
      regularUserToken = res.body.token;
      regularUser.id = res.body.userId;
      done();
    });
  });

  // Test documents http requests
  describe('Documents REQUESTS:', () => {
    // POST requests - Create Documents
    describe('POST: (/api/documents) - ', () => {
      it('should not create a document when required fields are invalid',
      (done) => {
        request.post('/api/documents')
          .send(invalidDocument)
          .set({ Authorization: authorUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured. Invalid parameters, try again!');
            done();
          });
      });

      it(`should create a document with role access when required fields
      are valid`, (done) => {
        request.post('/api/documents')
          .send(roleDocument)
          .set({ Authorization: authorUserToken })
          .end((error, response) => {
            roleDoc = response.body;
            expect(roleDoc.title).to.equal(roleDocument.title);
            expect(response.status).to.equal(201);
            done();
          });
      });

      it(`should create a document with role access when required fields
      are valid`, (done) => {
        request.post('/api/documents')
          .send(roleDocument2)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            roleDoc2 = response.body;
            expect(roleDoc2.title).to.equal(roleDocument2.title);
            expect(response.status).to.equal(201);
            done();
          });
      });

      it(`should create a document with private access when required fields
      are valid`, (done) => {
        request.post('/api/documents')
          .send(privateDocument)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            privateDoc = response.body;
            expect(privateDoc.title).to.equal(privateDocument.title);
            expect(response.status).to.equal(201);
            done();
          });
      });

      it(`should create a document with public access when required fields
      are valid`, (done) => {
        request.post('/api/documents')
          .send(publicDocument)
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            publicDoc = response.body;
            expect(publicDoc.title).to.equal(publicDocument.title);
            expect(response.status).to.equal(201);
            done();
          });
      });

      it(`should create a document with same title and/or content`, (done) => {
        request.post('/api/documents')
          .send(roleDocument)
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            roleDoc = response.body;
            expect(roleDoc.title).to.equal(roleDocument.title);
            expect(response.status).to.equal(201);
            done();
          });
      });
    });

    // GET requests - Retrieve all documents
    describe('GET: (/api/documents)', () => {
      it(`should return all documents if user is admin`, (done) => {
        request.get('/api/documents')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents)).to.be.true;
            expect(response.body.documents.length).to.equal(10);
            done();
          });
      });

      it(`should return public documents if user is not admin`, (done) => {
        request.get('/api/documents')
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents)).to.be.true;
            expect(response.body.documents.length).to.be.greaterThan(0);
            done();
          });
      });
    });

    // GET requests - Retrieve a specific document based on the id
    describe('GET: (/api/documents/:id)', () => {
      it('should not return the document if id is invalid', (done) => {
        request.get('/api/documents/22234')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Document Does Not Exist');
            done();
          });
      });

      it('should not return the document if id is non-integer', (done) => {
        request.get('/api/documents/aa')
          .set({ Authorization: authorUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured. Invalid parameters, try again!');
            done();
          });
      });

      it(`should not return the document if document is private and
      user is not the owner`, (done) => {
        request.get(`/api/documents/${privateDoc.id}`)
          .set({ Authorization: authorUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
            .equal('You are not authorized to view this document');
            done();
          });
      });

      it(`should return the document if document is private and
      user is the owner`, (done) => {
        request.get(`/api/documents/${privateDoc.id}`)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });

      it(`should not return the document if document has role access and
      user is not the owner`, (done) => {
        request.get(`/api/documents/${roleDoc.id}`)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
            .equal('You are not authorized to view this document');
            done();
          });
      });

      it(`should return the document if document has role access and
      user has same role as the owner`, (done) => {
        request.get(`/api/documents/${roleDoc2.id}`)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
    });

    //  PUT Requests - Edit specific document
    describe('PUT: (/api/documents/:id)', () => {
      const fieldsToUpdate = {
        title: 'YOYOL - You Own Your Own Learning',
        content: 'Its mostly about self-learning'
      };

      it('should not edit document if id is invalid', (done) => {
        request.put('/api/documents/76589')
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Document Does Not Exist');
            done();
          });
      });

      it('should not edit document if id is non-integer', (done) => {
        request.put('/api/documents/id')
          .set({ Authorization: adminUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured. Invalid parameters, try again!');
            done();
          });
      });

      it('should not edit document if user is not the owner', (done) => {
        request.put('/api/documents/1')
          .set({ Authorization: regularUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
              .equal('You are not authorized to update this document');
            done();
          });
      });

      it('should edit document if user is the owner',
      (done) => {
        request.put('/api/documents/2')
          .set({ Authorization: regularUserToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            const updatedDocument = response.body.updatedDocument;
            expect(response.status).to.equal(200);
            expect(updatedDocument.title).to.equal(fieldsToUpdate.title);
            expect(updatedDocument.content).to.equal(fieldsToUpdate.content);
            done();
          });
      });

      it('should not edit OwnerId property of document',
      (done) => {
        const fieldToUpdate = { OwnerId: 7 };
        request.put('/api/documents/3')
          .set({ Authorization: authorUserToken })
          .send(fieldToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
            .equal('You cannot edit document OwnerId property');
            done();
          });
      });
    });

    // DELETE Requests - Delete specific document
    describe('DELETE: (/api/documents/:id)', () => {
      it('should not delete document if id is invalid', (done) => {
        request.delete('/api/documents/3773')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Document Does Not Exist');
            done();
          });
      });

      it('should not delete document if id is non-integer', (done) => {
        request.delete('/api/documents/id')
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured. Invalid parameters, try again!');
            done();
          });
      });

      it('should not delete document if user is not the owner', (done) => {
        request.delete(`/api/documents/${publicDoc.id}`)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
              .equal('You are not authorized to delete this document');
            done();
          });
      });

      it('should delete document if user is the owner', (done) => {
        request.delete(`/api/documents/${privateDoc.id}`)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
              .equal('Document deleted successfully');
            done();
          });
      });

      it('should delete document if user is the owner', (done) => {
        request.delete(`/api/documents/${publicDoc.id}`)
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
              .equal('Document deleted successfully');
            done();
          });
      });
    });

    // GET requests - Search document(s): Gets all documents relevant to search query
    describe('GET: (/api/search/documents?search) - ', () => {
      const search = 'computer', term = 'abc';
      it('should not return document(s) if search term is empty', (done) => {
        request.get('/api/search/documents?search=')
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('Invalid Search Parameter!');
            done();
          });
      });

      it('should not return document(s) if search term doesn\'t match',
      (done) => {
        request.get(`/api/search/documents?search=${term}`)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to
            .equal('Search Does Not Match Any Document!');
            done();
          });
      });

      it('should return matching documents if search term match',
      (done) => {
        request.get(`/api/search/documents?search=${search}`)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents)).to.be.true;
            expect(response.body.documents.length).to.be.greaterThan(0);
            done();
          });
      });

      it(`should search through all documents if user is admin
      and return matching documents if search term match`,
      (done) => {
        request.get(`/api/search/documents?search=${search}`)
          .set({ Authorization: adminUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents)).to.be.true;
            expect(response.body.documents.length).to.be.greaterThan(0);
            done();
          });
      });

      it(`should search through documents with role access if user is owner
      or user have the same role as owner and return matching
      documents if search term match`,
      (done) => {
        const newSearch = 'YOYOL';
        request.get(`/api/search/documents?search=${search}`)
          .set({ Authorization: regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents)).to.be.true;
            expect(response.body.documents.length).to.be.greaterThan(0);
            done();
          });
      });
    });
  });
});