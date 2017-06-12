import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from '../../components/App';

let wrapper;

describe('App Component', () => {
  beforeEach(() => {
    const initialState = {
      auth: {
        isAuthenticated: false,
        user: {},
      },
    };
    const mockStore = configureMockStore();

    const store = mockStore(initialState);

    wrapper = mount(<Provider store={store}>
      <App />
    </Provider>);
  });
  it('renders the div', () => {
    expect(wrapper.find('div').length).toBe(7);
  });

  it('renders the NavigationBar components', () => {
    expect(wrapper.find('NavigationBar').length).toBe(1);
  });

  it('renders the Footer components', () => {
    expect(wrapper.find('Footer').length).toBe(1);
  });
});
