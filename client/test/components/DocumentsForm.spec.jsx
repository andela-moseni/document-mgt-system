import expect from 'expect';
import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CreateDocumentsForm
from '../../components/documents/CreateDocumentsForm';

let wrapper;

const mockStore = configureMockStore();

describe('DocumentsForm', () => {
  beforeEach(() => {
    const initialState = {
      document: {
        documents: [],
      },
    };

    const store = mockStore(initialState);
    wrapper = render(
      <Provider store={store}>
        <CreateDocumentsForm {...initialState} />
      </Provider>);
  });

  it('renders a form ', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders the submit button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });

  // it('renders text input for all fields', () => {
  //   expect(wrapper.find('TextFieldGroup').length).toEqual(2);
  // });
});
