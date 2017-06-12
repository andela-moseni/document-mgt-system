import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { Document }
from '../../../components/documents/Document';

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
  deleteDocument: () => {},
  docFetched: () => {},
  params: {},
};
const wrapper = shallow(<Document {...props} />);

describe('Document', () => {
  it('renders a div ', () => {
    expect(wrapper.find('div').length).toEqual(5);
  });

  it('renders a h3 heading ', () => {
    expect(wrapper.find('h3').length).toEqual(1);
  });

  it('renders the Prompt component ', () => {
    expect(wrapper.find('Prompt').length).toEqual(1);
  });
});
