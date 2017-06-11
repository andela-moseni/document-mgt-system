
import expect from 'expect';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import RolesPage
  from '../../../components/roles/RolesPage';

let props;
let wrapper;
const mockStore = configureMockStore();

describe('RolesPage', () => {
  beforeEach(() => {
    const initialState = {
      auth: {
        isAuthenticated: true,
        // user: {},
      },
    };
    props = {
      roles: [{ title: 'admin' }, { title: 'regular' }],
      role: {},
      onChange: () => {},
      onSubmit: () => {},
      createRole: () => {},
      fetchRoles: () => {},
    };
    const store = mockStore(initialState);
    wrapper = shallow(<Provider store={store}>
      <RolesPage {...props} />
    </Provider>,
      { context: { router: { push: () => {} } } });
  });

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
