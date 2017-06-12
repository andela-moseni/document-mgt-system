import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { SideNavBar } from '../../components/SideNavBar';

const props = {
  user: { name: 'Mercy', email: 'mercy@test.com' }
};
const wrapper = shallow(
  <SideNavBar {...props} />);

describe('SideNavBar Component', () => {
  it('renders the div element', () => {
    expect(wrapper.find('div').length).toEqual(7);
  });

  it('renders the li element', () => {
    expect(wrapper.find('li').length).toEqual(11);
  });

  it('renders the Link element ', () => {
    expect(wrapper.find('Link').length).toEqual(6);
  });

  it('renders the ul element', () => {
    expect(wrapper.find('ul').length).toEqual(1);
  });

  it('renders the span element', () => {
    expect(wrapper.find('span').length).toEqual(1);
  });

  it('renders the img element', () => {
    expect(wrapper.find('img').length).toEqual(2);
  });
});
