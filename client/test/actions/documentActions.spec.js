import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as documentActions from '../../actions/documentsActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const document = {
  title: 'Mercy Oseni',
  content: 'mercy.oseni@test.com',
  access: 'public',
};

describe('Document actions', () => {
  after(() => {
    nock.cleanAll();
  });
  describe('document actions', () => {
    const response = {
      title: document.title,
      content: document.content,
      access: document.access,
    };
    after(() => {
      nock.cleanAll();
    });
    it('should create a document', () => {
      nock('/api')
        .post('/documents/', document)
        .reply(201, response);

      const expectedActions = [
        { type: types.CREATE_DOCUMENT_SUCCESS },
      ];
      const store = mockStore({
        document: {},
      });
      store.dispatch(documentActions.createDocument(document));
      expect(store.getActions()[0].type)
      .toEqual(expectedActions[0].type);
    });
  });
});
