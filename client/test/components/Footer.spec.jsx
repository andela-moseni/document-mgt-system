import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer';

describe('Footer', () => {
  it('renders the footer component', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('footer').length).toEqual(1);
  });

  it('renders the footer content', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('#foot').text())
      .toBe('What we did not imagine was a Web of people, but a Web of documents.');
  });
});
