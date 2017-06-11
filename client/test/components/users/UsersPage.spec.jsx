import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { UsersPage }
  from '../../../components/users/UsersPage';

const props = {
  users: { users:
    [{ name: 'Mercy Test' }, { name: 'Admin Test' }],
    pagination: {} },
  fetchUsers: () => {},
  createUser: () => {}
};
const wrapper = shallow(<UsersPage {...props} />);

describe('UsersPage', () => {
  it('renders the top container', () => {
    expect(wrapper.find('.container').length).toEqual(1);
  });

  it('renders the user\'s table', () => {
    expect(wrapper.find('table').length).toEqual(1);
  });

  it('renders the forms for creating users', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders the pagination component', () => {
    expect(wrapper.find('Pagination').length).toEqual(1);
  });
});
