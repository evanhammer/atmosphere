import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Paper from 'material-ui/Paper';
import NavBar from './components/NavBar';
import layout from './layout';

describe('delivery/client/layout', () => {
  const Component = () => <div />;
  const ComponentWithLayout = layout(Component, 'test title');
  const wrapper = shallow(<ComponentWithLayout test='whoa' />);

  it('renders the component with Props', () => {
    expect(wrapper.find(Component).prop('test')).to.eql('whoa');
  });

  it('wraps the component Paper', () => {
    expect(wrapper.find(NavBar).exists()).to.eql(true);
    expect(wrapper.find(Paper).exists()).to.eql(true);
  });

  it('adds NavBar to component with title', () => {
    expect(wrapper.find(NavBar).prop('title')).to.eql('test title');
  });
});
