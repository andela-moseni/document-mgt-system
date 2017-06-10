
import expect from 'expect';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import UsersPage
  from '../../components/users/UsersPage';

const mockStore = configureMockStore();
const store = mockStore();
const props = {
  users: [{ name: 'Mercy Test' }, { name: 'Admin Test' }],
  user: {},
  onChange: () => {},
  onSubmit: () => {},
  deleteUser: () => {},
};

describe('UsersPage', () => {
  it('renders the top container', () => {
    const wrapper = shallow(<Provider store={store}>
      <UsersPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('.container').length).toEqual(1);
  });

  it('renders the user\'s table', () => {
    const wrapper = shallow(<Provider store={store}>
      <UsersPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('table').length).toEqual(1);
  });

  it('renders the forms for creating users', () => {
    const wrapper = shallow(<Provider store={store}>
      <UsersPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders the pagination component', () => {
    const wrapper = shallow(<Provider store={store}>
      <UsersPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('Pagination').length).toEqual(1);
  });
});
