import expect from 'expect';
import reducers from '../../reducers/usersReducer';
import * as types from '../../actions/types';

describe('User Reducer', () => {
  it('should handle DISPLAY_USER_PROFILE action', () => {
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

  it('should handle DISPLAY_UPDATED_USER action', () => {
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
        name: 'Raphael Akpan',
        roleId: 1,
        email: 'raphael.akpan@andela.com',
      },
    });
    expect(state)
      .toEqual({
        isAuthenticated: true,
        user: {
          id: 1,
          name: 'Raphael Akpan',
          roleId: 1,
          email: 'raphael.akpan@andela.com',
        },
      });
  });
});
