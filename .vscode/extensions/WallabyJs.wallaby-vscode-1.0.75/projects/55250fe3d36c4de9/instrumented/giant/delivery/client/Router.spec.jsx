$_$wp(20);
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Router, { routeConfig } from './Router';
import People from './scenes/People';
import AddPerson from './scenes/AddPerson';
import ContactPerson from './scenes/ContactPerson';
$_$w(20, 0), describe('delivery/client/Router', () => {
    $_$wf(20);
    $_$w(20, 1), it('defaults to People', () => {
        $_$wf(20);
        const actual = ($_$w(20, 2), shallow(<Router/>).name());
        const expected = ($_$w(20, 3), 'FarceRouter');
        $_$w(20, 4), expect(actual).to.eql(expected);
    });
    $_$w(20, 5), describe('routeConfig', () => {
        $_$wf(20);
        const root = ($_$w(20, 6), routeConfig.find(r => {
            $_$wf(20);
            return $_$w(20, 7), r.path === '/';
        }));
        $_$w(20, 8), it('routes / to People', () => {
            $_$wf(20);
            const route = ($_$w(20, 9), root);
            $_$w(20, 10), expect(route.path).to.eql('/');
            $_$w(20, 11), expect(route.children[0].Component).to.eql(People);
        });
        $_$w(20, 12), it('routes /add-person to AddPerson', () => {
            $_$wf(20);
            const route = ($_$w(20, 13), root.children.find(c => {
                $_$wf(20);
                return $_$w(20, 14), c.path === 'add-person';
            }));
            $_$w(20, 15), expect(route.Component).to.eql(AddPerson);
        });
        $_$w(20, 16), it('routes /contact-person/id to ContactPerson', () => {
            $_$wf(20);
            const route = ($_$w(20, 17), root.children.find(c => {
                $_$wf(20);
                return $_$w(20, 18), c.path === 'contact-person/:id';
            }));
            $_$w(20, 19), expect(route.Component).to.eql(ContactPerson);
        });
    });
});
$_$wpe(20);