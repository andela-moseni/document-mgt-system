
import expect from 'expect';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import RolesPage
  from '../../components/roles/RolesPage';

const mockStore = configureMockStore();
const store = mockStore();
const props = {
  roles: [{ title: 'admin' }, { title: 'regular' }],
  role: {},
  onChange: () => {},
  onSubmit: () => {},
  createRole: () => {},
  fetchRoles: () => {},
};

describe('RolesPage', () => {
  it('renders the top container', () => {
    const wrapper = shallow(<Provider store={store}>
      <RolesPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('.container').length).toEqual(1);
  });

  it('renders the role\'s table', () => {
    const wrapper = shallow(<Provider store={store}>
      <RolesPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('table').length).toEqual(1);
  });

  it('renders the forms for creating roles', () => {
    const wrapper = shallow(<Provider store={store}>
      <RolesPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders the pagination component', () => {
    const wrapper = shallow(<Provider store={store}>
      <RolesPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('Pagination').length).toEqual(1);
  });
});
