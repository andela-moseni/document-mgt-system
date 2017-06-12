import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../components/NotFound';

const wrapper = shallow(<NotFound />);

describe('NotFound Component', () => {
  it('renders a div', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('renders a h3 element', () => {
    expect(wrapper.find('h3').text())
      .toBe('Welcome to Meek - Document Management System');
  });

  it('renders a h4 element', () => {
    expect(wrapper.find('h4').text())
      .toBe('404! Seems you are in the wrong place, go<Link />');
  });

  it('renders the top container', () => {
    expect(wrapper.find('.container').length).toEqual(1);
  });
});
