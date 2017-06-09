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

  describe('Get user profile', () => {
    it('fetches a user\'s profile and dispatches DISPLAY_USER_PROFILE', () => {
      moxios.stubRequest('/api/users/1', {
        status: 200,
        response: {
          name: 'Mercy Oseni',
          email: 'mercy@test.coms'
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
});
