import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import NavigationBar from '../../components/NavigationBar';

let props;
let wrapper;

const mockStore = configureMockStore();

describe('NavigationBar Component', () => {
  beforeEach(() => {
    const initialState = {
      auth: {
        isAuthenticated: false,
        user: {},
      },
    };

    props = {
      logout: () => {},
      searchDocuments: () => {},
      searchUserDocuments: () => {},
      searchUsers: () => {},
      searchRoles: () => {},
    };

    const store = mockStore(initialState);

    wrapper = mount(<Provider store={store}>
      <NavigationBar {...props} />
    </Provider>,
  { context: { router: { push: () => {} } } });
  });
  it('renders the navigation bar', () => {
    expect(wrapper.find('nav').length).toEqual(1);
  });

  it('renders all navbar links', () => {
    expect(wrapper.find('Link').length).toEqual(3);
  });

  it('renders the div element', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('renders the ul element', () => {
    expect(wrapper.find('ul').length).toEqual(1);
  });

  it('renders the li element', () => {
    expect(wrapper.find('li').length).toEqual(2);
  });
});
