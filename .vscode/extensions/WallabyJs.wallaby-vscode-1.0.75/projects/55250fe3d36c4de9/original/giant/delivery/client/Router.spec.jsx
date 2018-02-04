import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Router, { routeConfig } from './Router';
import People from './scenes/People';
import AddPerson from './scenes/AddPerson';
import ContactPerson from './scenes/ContactPerson';

describe('delivery/client/Router', () => {
  it('defaults to People', () => {
    const actual = shallow(<Router />).name();
    const expected = 'FarceRouter';
    expect(actual).to.eql(expected);
  });

  describe('routeConfig', () => {
    const root = routeConfig.find(r => r.path === '/');

    it('routes / to People', () => {
      const route = root;
      expect(route.path).to.eql('/');
      expect(route.children[0].Component).to.eql(People);
    });

    it('routes /add-person to AddPerson', () => {
      const route = root.children.find(c => c.path === 'add-person');
      expect(route.Component).to.eql(AddPerson);
    });

    it('routes /contact-person/id to ContactPerson', () => {
      const route = root.children.find(c => c.path === 'contact-person/:id');
      expect(route.Component).to.eql(ContactPerson);
    });
  });
});
