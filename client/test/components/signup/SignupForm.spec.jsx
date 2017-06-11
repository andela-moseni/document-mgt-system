import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import SignUpForm from '../../../components/signup/SignupForm';

let props;
let wrapper;
const userSignupRequest = sinon.spy(() => Promise.resolve());

const mockStore = configureMockStore();

describe('SignUpForm', () => {
  beforeEach(() => {
    const initialState = {
      auth: {
        isAuthenticated: false,
        user: {},
      },
    };

    props = {
      userSignupRequest,
    };

    const store = mockStore(initialState);

    wrapper = mount(<Provider store={store}>
      <SignUpForm {...props} />
    </Provider>);

    wrapper.setState({ name: '',
      email: 'mercy@test.com',
      password: '',
      passwordConfirmation: '' });
  });

  it('renders a form ', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('populates a field with initial data', () => {
    expect(wrapper.state().email).toEqual('mercy@test.com');
  });

  it('populates a field with initial data', () => {
    expect(wrapper.state().name).toEqual('');
  });

  it('renders the submit button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('renders text input for all fields', () => {
    expect(wrapper.find('TextFieldGroup').length).toEqual(4);
  });

  it('submits the form when fields are valid', () => {
    wrapper.find('input[name="name"]')
      .simulate('change', { target:
        { name: 'name', value: 'Mercy Test' }
      });

    wrapper.find('input[name="email"]')
      .simulate('change', { target:
        { name: 'email', value: 'mercy@test.com' }
      });

    wrapper.find('input[name="password"]')
      .simulate('change', { target:
        { name: 'password', value: 'password' } });

    wrapper.find('input[name="passwordConfirmation"]')
      .simulate('change', { target:
        { name: 'passwordConfirmation', value: 'password' }
      });

    wrapper.find('form').simulate('submit');
    expect(userSignupRequest.callCount).toEqual(1);
  });
});
