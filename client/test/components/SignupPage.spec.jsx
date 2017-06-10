import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import SignupPage from '../../components/signup/SignupPage';

const userSignupRequest = sinon.spy(() => Promise.resolve());
const mockStore = configureMockStore();
const store = mockStore();

const props = {
  userSignupRequest,
  user: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
};

describe('SignUpPage', () => {
  it('renders the signup input fields', () => {
    const wrapper = mount(<Provider store={store}>
      <SignupPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('input').length).toBe(4);
  });

  it('controls the signup input fields', () => {
    const wrapper = mount(<Provider store={store}>
      <SignupPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });

    wrapper.find('input[name="email"]')
      .simulate('change', { target:
        { name: 'email', value: 'mercy@test.com' } });

    expect(wrapper.find('input[name="email"]').prop('value'))
    .toEqual('mercy@test.com');
  });

  it('submits the form when fields are valid', () => {
    const wrapper = mount(<Provider store={store}>
      <SignupPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });

    wrapper.setState({
      name: 'Mercy Test',
      email: 'mercy@test.com',
      password: 'test',
      confirmPassword: 'test',
    });
    wrapper.find('form').simulate('submit');

    expect(userSignupRequest.callCount).toEqual(1);
  });

  it('does not submit the form if a required field is invalid', () => {
    const wrapper = mount(<Provider store={store}>
      <SignupPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });

    wrapper.setState({
      name: 'Mercy Test',
      password: 'test',
      confirmPassword: 'test',
    });
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('.error').text())
    .toEqual('Invalid login credentials. Try again!');
  });
});
