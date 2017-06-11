import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import LoginPage from '../../../components/login/LoginPage';

const mockStore = configureMockStore();
const store = mockStore();

const wrapper = mount(<Provider store={store}>
  <LoginPage />
</Provider>,
  { context: { router: { push: () => {} } } });

describe('LoginPage Component', () => {
  it('renders the login input fields', () => {
    expect(wrapper.find('input').length).toBe(2);
  });

  it('controls the login input fields', () => {
    wrapper.find('input[name="email"]')
      .simulate('change', { target:
        { name: 'email', value: 'mercy@test.com' }
      });
    expect(wrapper.find('input[name="email"]')
    .prop('value')).toEqual('mercy@test.com');
  });

  it('renders the div', () => {
    expect(wrapper.find('div').length).toBe(6);
  });

  it('renders the row', () => {
    expect(wrapper.find('.row').length).toBe(3);
  });

  it('renders the LoginForm component', () => {
    expect(wrapper.find('LoginForm').length).toBe(1);
  });
});
