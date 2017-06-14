import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { UserProfile }
from '../../../components/users/UserProfile';

const props = {
  user: { name: 'Mercy', email: 'mercy@test.com' },
  loadUserProfile: () => {},
  updateUser: () => {},
  deleteUser: () => {},
};
const wrapper = shallow(<UserProfile {...props} />);

describe('UserProfile', () => {
  it('renders the top container', () => {
    expect(wrapper.find('.container').length).toEqual(1);
  });

  it('renders the div element', () => {
    expect(wrapper.find('div').length).toEqual(8);
  });

  it('renders a table', () => {
    expect(wrapper.find('table').length).toEqual(1);
  });

  it('renders the for editing user\'s profile', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders the TextFieldGroup component', () => {
    expect(wrapper.find('TextFieldGroup').length).toEqual(4);
  });

  it('renders the Modal component', () => {
    expect(wrapper.find('Modal').length).toEqual(1);
  });
});
