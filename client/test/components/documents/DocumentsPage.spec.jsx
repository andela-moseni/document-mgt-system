import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { DocumentsPage }
from '../../../components/documents/DocumentsPage';

const props = {
  documents: { documents: [{
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
    pagination: {} },
  fetchDocuments: () => {},
};
const wrapper = shallow(<DocumentsPage {...props} />);

describe('DocumentsPage', () => {
  it('renders the top container', () => {
    expect(wrapper.find('.container').length).toEqual(1);
  });

  it('renders the div element', () => {
    expect(wrapper.find('div').length).toEqual(2);
  });

  it('renders a table', () => {
    expect(wrapper.find('table').length).toEqual(1);
  });

  it('renders the pagination component', () => {
    expect(wrapper.find('Pagination').length).toEqual(1);
  });
});
