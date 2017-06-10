import expect from 'expect';
import reducers from '../../reducers/documentsReducer';
import * as types from '../../actions/types';

describe('Document Reducer', () => {
  it('should set documents when passed DISPLAY_ALL_DOCUMENTS', () => {
    const initialState = { documents: [] };
    const expectedState = {
      documents: [{ title: 'YOYOL', content: 'Self learning' },
      { title: 'Learning', content: 'Programming is...' }],
      pagination: {
        totalCount: 2,
        pageCount: 1,
        pageSize: 2
      }
    };
    const action = { type: types.DISPLAY_ALL_DOCUMENTS,
      allDocs: [{ title: 'YOYOL', content: 'Self learning' },
      { title: 'Learning', content: 'Programming is...' }],
      pagination: {
        totalCount: 2,
        pageCount: 1,
        pageSize: 2
      },
    };

    const newState = reducers(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should create new document when passed CREATE_DOCUMENT_SUCCESS', () => {
    const initialState = { documents:
    [{ title: 'YOYOL', content: 'Self learning' },
      { title: 'Learning', content: 'Programming is...' }]
    };
    const action = { type: types.CREATE_DOCUMENT_SUCCESS,
      newDoc: { title: 'hello', content: 'dearest' } };

    const expectedState = { documents:
    [{ title: 'YOYOL', content: 'Self learning' },
      { title: 'Learning', content: 'Programming is...' }]
    };
    const newState = reducers(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should update document when passed UPDATE_DOCUMENT_SUCCESS', () => {
    const initialState = { documents:
    [{ id: 1, title: 'YOYOL', content: 'Self learning' },
      { id: 2, title: 'Learning', content: 'Programming is...' }],
    };
    const document = { id: 2,
      title: 'Learning',
      content: 'Programming is fun' };
    const action = { type: types.UPDATE_DOCUMENT_SUCCESS,
      updatedDocument: document };

    const expectedState = { documents:
    [{ id: 1, title: 'YOYOL', content: 'Self learning' },
      { id: 2, title: 'Learning', content: 'Programming is fun' }] };
    const newState = reducers(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should delete document when passed DELETE_DOCUMENT_SUCCESS', () => {
    const initialState = { documents:
    [{ id: 1, title: 'YOYOL', content: 'Self learning' },
      { id: 2, title: 'Learning', content: 'Programming is fun' }] };

    const document = { id: 2,
      title: 'Learning',
      content: 'Programming is fun' };
    const action = { type: types.DELETE_DOCUMENT_SUCCESS,
      documentId: document.id };

    const expectedState = { documents:
    [{ id: 1, title: 'YOYOL', content: 'Self learning' }] };

    const newState = reducers(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
