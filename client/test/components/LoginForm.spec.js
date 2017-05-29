import expect from 'expect';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import LoginForm from '../../components/login/LoginForm';

let props;
let wrapper;

const mockStore = configureMockStore();

describe('LoginForm', () => {
  beforeEach(() => {
    const initialState = {
      auth: {
        isAuthenticated: false,
        user: {},
      },
    };

    props = {
      login: () => {},
    };

    const store = mockStore(initialState);

    wrapper = mount(<Provider store={store}><LoginForm /></Provider>);
  });

  it('renders a form ', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders the submit button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('renders text input for all fields', () => {
    expect(wrapper.find('TextFieldGroup').length).toEqual(2);
  });
});
