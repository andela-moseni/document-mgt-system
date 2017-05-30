import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from '../../components/signup/SignupForm';

let props;
let wrapper;

describe('SignUpForm', () => {
  beforeEach(() => {
    props = {
      userSignupRequest: () => {},
    };
    wrapper = shallow(<SignUpForm />);
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
});
