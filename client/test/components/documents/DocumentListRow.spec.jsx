import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import DocumentListRow
  from '../../../components/documents/DocumentListRow';

const props = {
  document: {
    title: 'YOYOL',
    content: 'You Own Your Own Learning',
    access: 'public',
    type: 'note',
  },
  serial: 1,
};

const wrapper = shallow(<DocumentListRow {...props} />);

describe('UserListRow', () => {
  it('renders the tr element', () => {
    expect(wrapper.find('tr').length).toEqual(1);
  });

  it('renders the td element', () => {
    expect(wrapper.find('td').length).toEqual(6);
  });

  it('renders the Link element', () => {
    expect(wrapper.find('Link').length).toEqual(1);
  });
});
