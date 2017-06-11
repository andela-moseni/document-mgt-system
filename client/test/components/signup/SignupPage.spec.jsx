import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import SignupPage from '../../../components/signup/SignupPage';

const mockStore = configureMockStore();
const store = mockStore();

const wrapper = mount(<Provider store={store}>
  <SignupPage />
</Provider>,
  { context: { router: { push: () => {} } } });

describe('SignUpPage', () => {
  it('renders the signup input fields', () => {
    expect(wrapper.find('input').length).toBe(4);
  });

  it('controls the signup input fields', () => {
    wrapper.find('input[name="email"]')
      .simulate('change', { target:
        { name: 'email', value: 'mercy@test.com' } });

    expect(wrapper.find('input[name="email"]').prop('value'))
    .toEqual('mercy@test.com');
  });

  it('renders the div', () => {
    expect(wrapper.find('div').length).toBe(8);
  });

  it('renders the row', () => {
    expect(wrapper.find('.row').length).toBe(3);
  });

  it('renders the SignupForm component', () => {
    expect(wrapper.find('SignupForm').length).toBe(1);
  });
});
