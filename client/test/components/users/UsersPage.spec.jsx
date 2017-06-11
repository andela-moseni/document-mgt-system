
import expect from 'expect';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import UsersPage
  from '../../../components/users/UsersPage';

let props;
let wrapper;
const mockStore = configureMockStore();

describe('UsersPage', () => {
  beforeEach(() => {
    const initialState = {
      user: {
        users: [],
        user: {
          email: 'mercy@test.com'
        },
      },
    };
    props = {
      users: [{ name: 'Mercy Test' }, { name: 'Admin Test' }],
      user: {},
      onChange: () => {},
      onSubmit: () => {},
      deleteUser: () => {},
    };
    const store = mockStore(initialState);
    wrapper = shallow(<Provider store={store}>
      <UsersPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
  });

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
