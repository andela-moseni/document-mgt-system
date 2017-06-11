import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { RoleListRow }
  from '../../../components/roles/RoleListRow';

const props = {
  roles: { roles:
    [{ id: 1, title: 'admin' }, { id: 2, title: 'regular' }],
    pagination: {} },
  role: { id: 1, title: 'admin' },
  fetchRoles: () => {},
  updateRole: () => {},
  deleteRole: () => {},
  serial: 1,
};
const wrapper = shallow(<RoleListRow {...props} />);

describe('RoleListRow', () => {
  it('renders the div element', () => {
    expect(wrapper.find('div').length).toEqual(2);
  });

  it('renders the tr element', () => {
    expect(wrapper.find('tr').length).toEqual(1);
  });

  it('renders the td element', () => {
    expect(wrapper.find('td').length).toEqual(6);
  });

  it('renders the form for editing role', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders the TextFieldGroup element', () => {
    expect(wrapper.find('TextFieldGroup').length).toEqual(1);
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
