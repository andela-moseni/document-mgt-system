import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as roleActions from '../../actions/rolesActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Role Actions:', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Get all roles', () => {
    it('fetches all roles and dispatches DISPLAY_ALL_ROLES', () => {
      moxios.stubRequest('/api/roles?offset=0&limit=10', {
        status: 200,
        response: {
          roles: [{
            title: 'admin'
          }, { title: 'regular' }],
          pagination: {
            totalCount: 2,
            pageCount: 1,
            pageSize: 2
          }
        },
      });

      const expectedActions = [{
        type: types.DISPLAY_ALL_ROLES,
        allRoles: [{ title: 'admin' }, { title: 'regular' }],
        pagination: {
          totalCount: 2,
          pageCount: 1,
          pageSize: 2
        }
      }];

      const store = mockStore();
      store.dispatch(roleActions.fetchRoles())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Create Role', () => {
    it('creates a new role and dispatches CREATE_ROLE_SUCCESS', () => {
      moxios.stubRequest('/api/roles', {
        status: 201,
        response: { title: 'contributor' }
      });

      const expectedActions = [
        { type: types.CREATE_ROLE_SUCCESS,
          newRole: {
            title: 'contributor',
          }
        }
      ];
      const store = mockStore({ loggedIn: true,
        user: { email: 'admin@test.com', password: 'admin' } });

      return store.dispatch(roleActions.createRole({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Edit Role', () => {
    it('updates a role and dispatches DISPLAY_UPDATED_ROLE', () => {
      moxios.stubRequest('/api/roles/3', {
        status: 200,
        response: {
          updatedRole: {
            title: 'contributors'
          }
        }
      });

      const expectedActions = [
        { type: types.DISPLAY_UPDATED_ROLE,
          updatedRole: {
            title: 'contributors'
          }
        }
      ];
      const store = mockStore({});
      store.dispatch(roleActions.updateRole({
        id: 3,
        title: 'contributors'
      }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Delete Role', () => {
    it('deletes a role and dispatches DELETE_ROLE_SUCCESS', () => {
      moxios.stubRequest('/api/roles/3', {
        status: 200
      });
      const expectedActions = [{
        type: types.DELETE_ROLE_SUCCESS,
        roleId: 3
      }];
      const store = mockStore();
      return store.dispatch(roleActions.deleteRole(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Search Role', () => {
    it('searches for role(s) and dispatches DISPLAY_ALL_ROLES',
    () => {
      moxios
      .stubRequest('/api/search/roles?search=admin&offset=0&limit=10', {
        status: 200,
        response: {
          roles: [{ title: 'admin' }],
          metaData: {},
          pagination: {
            totalCount: 1,
            pageCount: 1,
            pageSize: 1
          }
        }
      });

      const expectedActions = [{
        type: types.DISPLAY_ALL_ROLES,
        allRoles: [{ title: 'admin' }],
        pagination: {
          totalCount: 1,
          pageCount: 1,
          pageSize: 1
        }
      }];

      const store = mockStore();
      return store.dispatch(roleActions.searchRoles('admin'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
