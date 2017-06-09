import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as userActions from '../../actions/usersActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Actions:', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Get all users', () => {
    it('fetches all user\'s and dispatches DISPLAY_ALL_USERS', () => {
      moxios.stubRequest('/api/users?offset=0&limit=10', {
        status: 200,
        response: {
          users: [{
            name: 'Mercy Oseni',
            email: 'mercy@test.com'
          }],
          pagination: {
            totalCount: 1,
            pageCount: 1,
            pageSize: 1
          }
        },
      });

      const expectedActions = [{
        type: 'DISPLAY_ALL_USERS',
        allUsers: [{ name: 'Mercy Oseni', email: 'mercy@test.com' }],
        pagination: {
          totalCount: 1,
          pageCount: 1,
          pageSize: 1
        }
      }];

      const store = mockStore();
      store.dispatch(userActions.fetchUsers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Get user profile', () => {
    it('fetches a user\'s profile and dispatches DISPLAY_USER_PROFILE', () => {
      moxios.stubRequest('/api/users/1', {
        status: 200,
        response: {
          name: 'Mercy Oseni',
          email: 'mercy@test.com'
        }
      });

      const expectedActions = [{
        type: 'DISPLAY_USER_PROFILE',
        userData: { name: 'Mercy Oseni', email: 'mercy@test.com' }
      }];

      const store = mockStore();
      store.dispatch(userActions.fetchUserProfile(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Update user profile', () => {
    it('updates a user\'s profile and dispatches DISPLAY_UPDATED_USER', () => {
      moxios.stubRequest('/api/users/1', {
        status: 200,
        response: {
          updatedUser: {
            name: 'Mercy O',
            email: 'mercy@test.com'
          }
        }
      });

      const expectedActions = [{
        type: 'DISPLAY_UPDATED_USER',
        updatedUser: { name: 'Mercy O', email: 'mercy@test.com' }
      }];

      const store = mockStore();
      store.dispatch(userActions.updateUser(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Delete User', () => {
    it('deletes a user and dispatches DELETE_USER_SUCCESS', () => {
      moxios.stubRequest('/api/users/1', {
        status: 200
      });
      const expectedActions = [{
        type: 'DELETE_USER_SUCCESS',
        userId: 1
      }];
      const store = mockStore();
      return store.dispatch(userActions.deleteUser(1, true))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Search User', () => {
    it('searches for a user and dispatches DISPLAY_ALL_USERS',
    () => {
      moxios
      .stubRequest('/api/search/users?search=mercy&offset=0&limit=10', {
        status: 200,
        response: {
          users: [{
            name: 'Mercy Oseni',
            email: 'mercy@test.com'
          }],
          metaData: {},
          pagination: {
            totalCount: 1,
            pageCount: 1,
            pageSize: 1
          }
        }
      });

      const expectedActions = [{
        type: 'DISPLAY_ALL_USERS',
        allUsers: [{
          name: 'Mercy Oseni',
          email: 'mercy@test.com'
        }],
        pagination: {
          totalCount: 1,
          pageCount: 1,
          pageSize: 1
        }
      }];

      const store = mockStore();
      return store.dispatch(userActions.searchUsers('mercy'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Create User', () => {
    it('creates a new user and dispatches CREATE_USER_SUCCESS', () => {
      moxios.stubRequest('/api/users', {
        status: 200,
        response: { user: {
          name: 'Love Handle',
          email: 'love@handle.com',
          password: 'love' }
        }
      });

      const expectedActions = [
        { type: 'CREATE_USER_SUCCESS',
          newUser: {
            name: 'Love Handle',
            email: 'love@handle.com',
            password: 'love'
          }
        }
      ];
      const store = mockStore({ loggedIn: false, user: {} });

      return store.dispatch(userActions.createUser({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
