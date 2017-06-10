import expect from 'expect';
import reducers from '../../reducers/usersReducer';
import * as types from '../../actions/types';

describe('User Reducer', () => {
  it('should set user profile when passed DISPLAY_USER_PROFILE', () => {
    const state = reducers({
      isAuthenticated: true,
      user: {
        id: 1,
        name: 'Raphael Akpan',
        roleId: 1,
        email: 'raphael.akpan@andela.com',
      },
    }, {
      type: types.DISPLAY_USER_PROFILE,
      userData: {
        id: 1,
        name: 'Raphael Akpan',
        roleId: 1,
        email: 'raphael.akpan@andela.com',
        password: '$2a$08$x08NdfJmZ8yS4.8zzY8gQ.…MxyslgaXK',
        createdAt: '2017-05-01T01:29:21.457Z',
        updatedAt: '2017-05-20T12:09:25.344Z',
      },
    });
    expect(state)
      .toEqual({
        isAuthenticated: true,
        user: {
          id: 1,
          name: 'Raphael Akpan',
          roleId: 1,
          password: '$2a$08$x08NdfJmZ8yS4.8zzY8gQ.…MxyslgaXK',
          email: 'raphael.akpan@andela.com',
          createdAt: '2017-05-01T01:29:21.457Z',
          updatedAt: '2017-05-20T12:09:25.344Z',
        },
      });
  });

  it('should set users when passed DISPLAY_ALL_USERS', () => {
    const initialState = { users: [] };
    const expectedState = {
      users: [{
        id: 1,
        name: 'Raphael Akpan',
        roleId: 1,
        email: 'raphael.akpan@andela.com',
      },
      {
        id: 2,
        name: 'Mercy Oseni',
        roleId: 2,
        email: 'mercy@test.com',
      }],
      pagination: {
        totalCount: 2,
        pageCount: 1,
        pageSize: 2
      }
    };
    const action = { type: types.DISPLAY_ALL_USERS,
      allUsers: [{
        id: 1,
        name: 'Raphael Akpan',
        roleId: 1,
        email: 'raphael.akpan@andela.com',
      },
      {
        id: 2,
        name: 'Mercy Oseni',
        roleId: 2,
        email: 'mercy@test.com',
      }],
      pagination: {
        totalCount: 2,
        pageCount: 1,
        pageSize: 2
      }
    };

    const newState = reducers(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should set user when passed DISPLAY_UPDATED_USER', () => {
    const state = reducers({
      isAuthenticated: true,
      user: {
        id: 1,
        name: 'Raphael Akpan',
        roleId: 1,
        email: 'raphael.akpan@andela.com',
      },
    }, {
      type: types.DISPLAY_UPDATED_USER,
      updatedUser: {
        id: 1,
        name: 'Raph Akpan',
        roleId: 1,
        email: 'raphael.akpan@andela.com',
      },
    });
    expect(state)
      .toEqual({
        isAuthenticated: true,
        user: {
          id: 1,
          name: 'Raph Akpan',
          roleId: 1,
          email: 'raphael.akpan@andela.com',
        },
      });
  });

  it('should delete user when passed DELETE_USER_SUCCESS', () => {
    const initialState = { users: [{
      id: 1,
      name: 'Raphael Akpan',
      roleId: 1,
      email: 'raphael.akpan@andela.com',
    },
    {
      id: 2,
      name: 'Mercy Oseni',
      roleId: 2,
      email: 'mercy@test.com',
    }] };
    const user = { id: 2,
      name: 'Mercy Oseni',
      roleId: 2,
      email: 'mercy@test.com' };
    const action = { type: types.DELETE_USER_SUCCESS, userId: user.id };

    const expectedState = { users: [
      { id: 1,
        name: 'Raphael Akpan',
        roleId: 1,
        email: 'raphael.akpan@andela.com' }
    ] };
    const newState = reducers(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should create new user when passed CREATE_USER_SUCCESS', () => {
    const initialState = { users: [{
      id: 1,
      name: 'Raphael Akpan',
      roleId: 1,
      email: 'raphael.akpan@andela.com',
    },
    {
      id: 2,
      name: 'Mercy Oseni',
      roleId: 2,
      email: 'mercy@test.com',
    }] };
    const action = { type: types.CREATE_USER_SUCCESS,
      newUser: { id: 5,
        name: 'Love Handle',
        roleId: 3,
        email: 'love.handle@test.com' } };

    const expectedState = { users: [{
      id: 1,
      name: 'Raphael Akpan',
      roleId: 1,
      email: 'raphael.akpan@andela.com',
    },
    {
      id: 2,
      name: 'Mercy Oseni',
      roleId: 2,
      email: 'mercy@test.com',
    },
    { id: 5,
      name: 'Love Handle',
      roleId: 3,
      email: 'love.handle@test.com'
    }] };
    const newState = reducers(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
