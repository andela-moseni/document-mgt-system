import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { CreateDocumentsForm }
from '../../../components/documents/CreateDocumentsForm';

const props = {
  document: { document: {
    id: 1,
    title: 'YOYOL',
    content: 'You Own Your Own Learning',
    access: 'public',
    type: 'note', }
  },
  createDocument: () => {},
  fetchDocument: () => {},
  updateDocument: () => {},
};
const wrapper = shallow(<CreateDocumentsForm {...props} />);

describe('CreateDocumentsForm', () => {
  it('renders a form ', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders the row element ', () => {
    expect(wrapper.find('.row').length).toEqual(2);
  });

  it('renders a form ', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders the submit button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('renders text input fields', () => {
    expect(wrapper.find('.input-field').length).toEqual(1);
  });

  it('renders TextFieldGroup component', () => {
    expect(wrapper.find('TextFieldGroup').length).toEqual(2);
  });

  it('renders react-materialize Input element', () => {
    expect(wrapper.find('Input').length).toEqual(1);
  });

  it('renders TinyMCE component', () => {
    expect(wrapper.find('TinyMCE').length).toEqual(1);
  });
});
