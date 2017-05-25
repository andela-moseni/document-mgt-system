import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import LoginForm from '../../components/login/LoginForm';

let props;
let wrapper;

describe('SignUpForm', () => {
  beforeEach(() => {
    props = {
      login: () => {},
    };
    wrapper = mount(<LoginForm {...props} />);
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
});
