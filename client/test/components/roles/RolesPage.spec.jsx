import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { RolesPage }
  from '../../../components/roles/RolesPage';

const props = {
  roles: { roles:
    [{ title: 'admin' }, { title: 'regular' }],
    pagination: {} },
  fetchRoles: () => {},
  createRole: () => {}
};
const wrapper = shallow(<RolesPage {...props} />);

describe('RolesPage', () => {
  it('renders the top container', () => {
    expect(wrapper.find('.container').length).toEqual(1);
  });

  it('renders the role\'s table', () => {
    expect(wrapper.find('table').length).toEqual(1);
  });

  it('renders the forms for creating roles', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders the pagination component', () => {
    expect(wrapper.find('Pagination').length).toEqual(1);
  });
});
