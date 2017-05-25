import expect from 'expect';
import * as loginActions from '../../actions/loginActions';
import * as types from '../../actions/types';


describe('Login Actions', () => {
  describe('user login actions', () => {
    it('login a user and returns SET_CURRENT_USER', () => {
      const user = {
        name: '',
        email: '',
      };
      const expectedAction = {
        type: types.SET_CURRENT_USER,
      };
      const action = loginActions.setCurrentUser(user);
      expect(action.type).toEqual(expectedAction.type);
    });
  });
});
