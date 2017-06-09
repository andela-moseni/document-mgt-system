import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as documentActions from '../../actions/documentsActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Document Actions:', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Fetch all documents', () => {
    it('retrieves documents and dispatches DISPLAY_ALL_DOCUMENTS', () => {
      moxios.stubRequest('/api/documents?offset=0&limit=10', {
        status: 200,
        response: { title: 'YOYOL', content: 'Self learning' }
      });
      const expectedActions =
        [
          { type: types.DISPLAY_ALL_DOCUMENTS,
            allDocs: [{ title: 'YOYOL', body: 'Self learning' }],
            offset: 0 },
        ];
      const store = mockStore();
      store.dispatch(documentActions.fetchDocuments())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Create Document', () => {
    it('creates a new document and dispatches CREATE_DOCUMENT_SUCCESS', () => {
      moxios.stubRequest('/api/documents', {
        status: 201,
        response: { document: { title: 'Hello', content: 'Mercy is good' } }
      });

      const expectedActions = [
        { type: types.CREATE_DOCUMENT_SUCCESS,
          newDoc: {
            title: 'Hello',
            content: 'Mercy is good'
          }
        }
      ];
      const store = mockStore({ loggedIn: false, user: {} });

      return store.dispatch(documentActions.createDocument({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Edit Document', () => {
    it('updates a document and dispatches UPDATE_DOCUMENT_SUCCESS', () => {
      moxios.stubRequest('/api/documents/1', {
        status: 200,
        response: {
          updatedDocument: {
            title: 'Hello Mercy',
            content: 'Mercy is cool'
          }
        }
      });

      const expectedActions = [
        { type: types.UPDATE_DOCUMENT_SUCCESS,
          updatedDocument: {
            title: 'Hello Mercy',
            content: 'Mercy is cool'
          }
        }
      ];
      const store = mockStore({});
      store.dispatch(documentActions.updateDocument({
        id: 1,
        title: 'Hello Mercy',
        content: 'Mercy is cool'
      }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Delete Document', () => {
    it('deletes a document and dispatches DELETE_DOCUMENT_SUCCESS', () => {
      moxios.stubRequest('/api/documents/1', {
        status: 200
      });
      const expectedActions = [{
        type: types.DELETE_DOCUMENT_SUCCESS,
        documentId: 1
      }];
      const store = mockStore();
      return store.dispatch(documentActions.deleteDocument(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Search Document', () => {
    it('searches for document(s) and dispatches DISPLAY_ALL_DOCUMENTS',
    () => {
      moxios
      .stubRequest('/api/search/documents?search=hello&offset=0&limit=10', {
        status: 200,
        response: {
          documents: [{ title: 'hello', content: 'Self learning' }],
          metaData: {},
          pagination: {
            totalCount: 1,
            pageCount: 1,
            pageSize: 1
          }
        }
      });

      const expectedActions = [{
        type: types.DISPLAY_ALL_DOCUMENTS,
        allDocs: [{ title: 'hello', content: 'Self learning' }],
        pagination: {
          totalCount: 1,
          pageCount: 1,
          pageSize: 1
        }
      }];

      const store = mockStore();
      return store.dispatch(documentActions.searchDocuments('hello'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Fetch User documents', () => {
    it('retrieves a user\'s documents and dispatches DISPLAY_MY_DOCUMENTS',
    () => {
      moxios
      .stubRequest('/api/users/5/documents?offset=0&limit=10', {
        status: 200,
        response: {
          documents: [{ title: 'hello', content: 'Self learning' }],
          metaData: {},
          pagination: {
            totalCount: 1,
            pageCount: 1,
            pageSize: 1
          }
        }
      });

      const expectedActions = [{
        type: types.DISPLAY_MY_DOCUMENTS,
        myDocs: [{ title: 'hello', content: 'Self learning' }],
        pagination: {
          totalCount: 1,
          pageCount: 1,
          pageSize: 1
        }
      }];

      const store = mockStore();
      return store.dispatch(documentActions.fetchMyDocuments(5))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
