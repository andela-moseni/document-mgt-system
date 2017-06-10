import expect from 'expect';
import reducers from '../../reducers/rolesReducer';
import * as types from '../../actions/types';

describe('Role Reducer', () => {
  it('should set roles when passed DISPLAY_ALL_ROLES', () => {
    const initialState = { roles: [] };
    const expectedState = {
      roles: [{ title: 'admin' },
      { title: 'regular' }],
      pagination: {
        totalCount: 1,
        pageCount: 1,
        pageSize: 1
      }
    };
    const action = { type: types.DISPLAY_ALL_ROLES,
      allRoles: [{ title: 'admin' }, { title: 'regular' }],
      pagination: {
        totalCount: 1,
        pageCount: 1,
        pageSize: 1
      },
    };

    const newState = reducers(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should add new role when passed CREATE_ROLE_SUCCESS', () => {
    const initialState = { roles: [
      { title: 'admin' },
      { title: 'regular' }
    ] };
    const action = { type: types.CREATE_ROLE_SUCCESS,
      newRole: { title: 'contributor' } };

    const expectedState = { roles: [
      { title: 'admin' },
      { title: 'regular' },
      { title: 'contributor' }
    ] };
    const newState = reducers(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should update role when passed DISPLAY_UPDATED_ROLE', () => {
    const initialState = { roles: [
      { id: 1, title: 'admin' },
      { id: 2, title: 'regular' },
      { id: 3, title: 'new role' }
    ] };
    const role = { id: 3, title: 'updated role' };
    const action = { type: types.DISPLAY_UPDATED_ROLE, updatedRole: role };

    const expectedState = { roles: [
      { id: 1, title: 'admin' },
      { id: 2, title: 'regular' },
      { id: 3, title: 'updated role' }
    ] };
    const newState = reducers(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should delete role when passed DELETE_ROLE_SUCCESS', () => {
    const initialState = { roles: [
      { id: 1, title: 'admin' },
      { id: 2, title: 'regular' },
      { id: 3, title: 'new role' }
    ] };
    const role = { id: 3, title: 'new role' };
    const action = { type: types.DELETE_ROLE_SUCCESS, roleId: role.id };

    const expectedState = { roles: [
      { id: 1, title: 'admin' },
      { id: 2, title: 'regular' }
    ] };
    const newState = reducers(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
