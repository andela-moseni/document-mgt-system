import expect from 'expect';
import reducers from '../../reducers/auth';
import * as types from '../../actions/types';

describe('User authReducer', () => {
  it('should handle SET_CURRENT_USER action', () => {
    const state = reducers({
      login: {
        isAuthenticated: false,
        user: {},
      },
    }, {
      type: types.SET_CURRENT_USER,
      user: {
        id: 1,
        name: 'Raphael Akpan',
        roleId: 1,
        email: 'raphael.akpan@andela.com',
        iat: 1496047679,
        exp: 1496090879,
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
          iat: 1496047679,
          exp: 1496090879,
        },
      });
  });
});
