import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import NavigationBar from '../../components/NavigationBar';

const logout = sinon.spy(() => Promise.resolve());
const searchDocuments = sinon.spy(() => Promise.resolve());
const searchUserDocuments = sinon.spy(() => Promise.resolve());
const searchUsers = sinon.spy(() => Promise.resolve());
const searchRoles = sinon.spy(() => Promise.resolve());

const props = {
  logout,
  searchDocuments,
  searchUserDocuments,
  searchUsers,
  searchRoles,
  isAuthenticated: { loggedIn: true, user: { email: 'mercy@test.com', id: 1 } }
};

const mockStore = configureMockStore();
const store = mockStore();

describe('NavigationBar Component', () => {
  it('renders the navigation bar', () => {
    const wrapper = shallow(<Provider store={store}>
      <NavigationBar {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('nav').length).toEqual(1);
  });

  it('renders all navbar links', () => {
    const wrapper = shallow(<Provider store={store}>
      <NavigationBar {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('Link').length).toEqual(10);
  });
});
