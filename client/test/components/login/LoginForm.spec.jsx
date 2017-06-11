import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { LoginForm } from '../../../components/login/LoginForm';

let props;
let wrapper;
const login = sinon.spy(() => Promise.resolve());

const mockStore = configureMockStore();

describe('LoginForm', () => {
  beforeEach(() => {
    const initialState = {
      auth: {
        isAuthenticated: false,
        user: {},
      },
    };

    props = {
      login,
    };

    const store = mockStore(initialState);

    wrapper = mount(<Provider store={store}>
      <LoginForm {...props} />
    </Provider>);
  });

  it('renders a form ', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders the submit button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('renders text input for all fields', () => {
    expect(wrapper.find('TextFieldGroup').length).toEqual(2);
  });

  it('renders the login input fields', () => {
    expect(wrapper.find('input').length).toBe(2);
  });

  it('controls the login input fields', () => {
    wrapper.find('input[name="email"]')
      .simulate('change', { target:
        { name: 'email', value: 'mercy@test.com' }
      });
    expect(wrapper.find('input[name="email"]')
    .prop('value')).toEqual('mercy@test.com');
  });

  it('submits the form and log the user in', () => {
    wrapper.find('input[name="email"]')
      .simulate('change', { target:
        { name: 'email', value: 'mercy@test.com' }
      });
    wrapper.find('input[name="password"]')
      .simulate('change', { target: { name: 'password', value: 'password' } });
    wrapper.find('form').simulate('submit');
    expect(login.callCount).toEqual(1);
  });
});
