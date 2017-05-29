import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as userActions from '../../actions/loginActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const user = {
  name: 'Mercy Oseni',
  email: 'mercy.oseni@test.com',
  password: 'mercy',
};
describe('Authentication actions', () => {
  after(() => {
    nock.cleanAll();
  });
  describe('login actions', () => {
    const response = {
      name: user.name,
      email: user.email,
    };
    after(() => {
      nock.cleanAll();
    });
    it('should login a user', () => {
      nock('/api')
        .post('/users/login', user)
        .reply(201, response);

      const expectedActions = [
        { type: types.SET_CURRENT_USER },
      ];
      const store = mockStore({
        user: {},
      });
      store.dispatch(userActions.setCurrentUser(user));
      expect(store.getActions()[0].type)
      .toEqual(expectedActions[0].type);
    });
  });
  describe('signup actions', () => {
    const response = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    after(() => {
      nock.cleanAll();
    });
    it('should signup a user', () => {
      nock('/api')
        .post('/users', user)
        .reply(201, response);

      const expectedActions = [
        { type: types.SET_CURRENT_USER },
      ];
      const store = mockStore({
        user: {},
      });
      store.dispatch(userActions.setCurrentUser(user));
      expect(store.getActions()[0].type)
      .toEqual(expectedActions[0].type);
    });
  });
});
