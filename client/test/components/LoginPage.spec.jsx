import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import LoginPage from '../../components/login/LoginPage';

const login = sinon.spy(() => Promise.resolve());
const mockStore = configureMockStore();

const props = {
  login,
};
const store = mockStore();

describe('LoginPage Component', () => {
  it('renders the login input fields', () => {
    const wrapper = mount(<Provider store={store}>
      <LoginPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('input').length).toBe(2);
  });

  it('controls the login input fields', () => {
    const wrapper = mount(<Provider store={store}>
      <LoginPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
    wrapper.find('input[name="email"]')
      .simulate('change', { target:
        { name: 'email', value: 'mercy@test.com' }
      });
    expect(wrapper.find('input[name="email"]')
    .prop('value')).toEqual('mercy@test.com');
  });

  it('submits the form and log the user in', () => {
    const wrapper = mount(<Provider store={store}>
      <LoginPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });

    wrapper.find('input[name="email"]')
      .simulate('change', { target:
        { name: 'email', value: 'mercy@test.com' }
      });
    wrapper.find('input[name="password"]')
      .simulate('change', { target: { name: 'password', value: 'password' } });
    wrapper.find('form').simulate('submit');

    expect(login.callCount).toEqual(1);
  });

  it('does not submit the form if a required field is invalid', () => {
    const wrapper = mount(<Provider store={store}>
      <LoginPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });

    wrapper.find('input[name="email"]')
      .simulate('change', { target:
        { name: 'email', value: 'mercy@test.com' } });
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('.error').text())
    .toEqual('Invalid login credentials. Try again!');
  });
});
