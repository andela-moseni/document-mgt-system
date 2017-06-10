import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import TextFieldGroup from '../../components/common/TextFieldGroup';

let props;
let wrapper;

describe('TextFieldGroup', () => {
  beforeEach(() => {
    props = {
      onChange: () => {},
      field: '',
      label: '',
      icon: '',
      value: 'component',
    };
    wrapper = shallow(<TextFieldGroup {...props} />);
  });

  it('renders an input field', () => {
    expect(wrapper.find('.input-field').length).toEqual(1);
  });

  it('renders the input component', () => {
    expect(wrapper.find('input').length).toEqual(1);
  });

  it('correctly initializes the input component', () => {
    expect(wrapper.find('input').prop('value')).toBe('component');
  });
});
