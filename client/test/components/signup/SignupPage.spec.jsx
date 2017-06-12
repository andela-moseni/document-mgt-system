import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { SignupPage } from '../../../components/signup/SignupPage';

const props = {
  userSignupRequest: () => {},
};
const wrapper = shallow(<SignupPage {...props} />);

describe('SignUpPage', () => {
  it('renders the div', () => {
    expect(wrapper.find('div').length).toBe(2);
  });

  it('renders the row', () => {
    expect(wrapper.find('.row').length).toBe(1);
  });

  it('renders the SignupForm component', () => {
    expect(wrapper.find('SignupForm').length).toBe(1);
  });
});
