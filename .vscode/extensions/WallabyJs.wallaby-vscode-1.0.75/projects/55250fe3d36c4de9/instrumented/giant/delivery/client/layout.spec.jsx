$_$wp(23);
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Paper from 'material-ui/Paper';
import NavBar from './components/NavBar';
import layout from './layout';
$_$w(23, 0), describe('delivery/client/layout', () => {
    $_$wf(23);
    const $_$wvd2 = $_$w(23, 1), Component = () => {
            $_$wf(23);
            return $_$w(23, 2), <div/>;
        };
    const ComponentWithLayout = ($_$w(23, 3), layout(Component, 'test title'));
    const wrapper = ($_$w(23, 4), shallow(<ComponentWithLayout test='whoa'/>));
    $_$w(23, 5), it('renders the component with Props', () => {
        $_$wf(23);
        $_$w(23, 6), expect(wrapper.find(Component).prop('test')).to.eql('whoa');
    });
    $_$w(23, 7), it('wraps the component Paper', () => {
        $_$wf(23);
        $_$w(23, 8), expect(wrapper.find(NavBar).exists()).to.eql(true);
        $_$w(23, 9), expect(wrapper.find(Paper).exists()).to.eql(true);
    });
    $_$w(23, 10), it('adds NavBar to component with title', () => {
        $_$wf(23);
        $_$w(23, 11), expect(wrapper.find(NavBar).prop('title')).to.eql('test title');
    });
});
$_$wpe(23);