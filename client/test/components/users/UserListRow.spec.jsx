import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { UserListRow }
  from '../../../components/users/UserListRow';

const props = {
  users: { users:
  [{ name: 'Mercy', email: 'mercy@test.com' },
    { name: 'Faith', email: 'faith@test.com' }],
    pagination: {} },
  user: { name: 'Mercy', email: 'mercy@test.com' },
  deleteUser: () => {},
  updateUsers: () => {},
  fetchUserProfile: () => {},
  serial: 1,
};
const wrapper = shallow(<UserListRow {...props} />);

describe('UserListRow', () => {
  it('renders the div element', () => {
    expect(wrapper.find('div').length).toEqual(3);
  });

  it('renders the tr element', () => {
    expect(wrapper.find('tr').length).toEqual(1);
  });

  it('renders the td element', () => {
    expect(wrapper.find('td').length).toEqual(6);
  });

  it('renders the form for editing user profile', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders the TextFieldGroup element', () => {
    expect(wrapper.find('TextFieldGroup').length).toEqual(2);
  });

  it('renders the Input element', () => {
    expect(wrapper.find('Input').length).toEqual(1);
  });

  it('renders the Modal component', () => {
    expect(wrapper.find('Modal').length).toEqual(1);
  });

  it('renders the button element', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('renders the prompt component', () => {
    expect(wrapper.find('Prompt').length).toEqual(1);
  });
});
