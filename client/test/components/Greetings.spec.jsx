import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Greetings from '../../components/Greetings';

const wrapper = shallow(<Greetings />);

describe('Greetings Component', () => {
  it('renders a div', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('renders a h3 element', () => {
    expect(wrapper.find('h3').text())
      .toBe('Welcome to Meek - Document Management System');
  });

  it('renders the top container', () => {
    expect(wrapper.find('.container').length).toEqual(1);
  });
});
