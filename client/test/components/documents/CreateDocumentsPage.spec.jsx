import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { CreateDocumentsPage }
  from '../../../components/documents/CreateDocumentsPage';

const props = {
  document: { document: {
    id: 1,
    title: 'YOYOL',
    content: 'You Own Your Own Learning',
    access: 'public',
    type: 'note', }
  },
  documents: [{
    id: 1,
    title: 'YOYOL',
    content: 'You Own Your Own Learning',
    access: 'public',
    type: 'note', },
  {
    id: 2,
    title: 'YOYOL',
    content: 'You Own Your Own Learning',
    access: 'public',
    type: 'note',
  }],
  fetchDocument: () => {},
  updateDocument: () => {},
  docFetched: () => {},
  serial: 1,
  params: {}
};

const wrapper = shallow(<CreateDocumentsPage {...props} />);

describe('CreateDocumentsPage', () => {
  it('renders the div element', () => {
    expect(wrapper.find('div').length).toEqual(2);
  });

  it('renders the CreateDocumentsForm component', () => {
    expect(wrapper.find('CreateDocumentsForm').length).toEqual(1);
  });

  it('renders the row element', () => {
    expect(wrapper.find('.row').length).toEqual(1);
  });
});
