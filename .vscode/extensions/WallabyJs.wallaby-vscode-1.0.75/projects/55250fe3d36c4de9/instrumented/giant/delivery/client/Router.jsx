$_$wp(21);
import React from 'react';
import {
    Route,
    createBrowserRouter,
    makeRouteConfig
} from 'found';
import People from './scenes/People';
import AddPerson from './scenes/AddPerson';
import AddEvent from './scenes/AddEvent';
import ContactPerson from './scenes/ContactPerson';
export const routeConfig = makeRouteConfig(
    <Route path='/'>
    <Route Component={People}/>
    <Route path='add-person' Component={AddPerson}/>
    <Route path='add-event' Component={AddEvent}/>
    <Route path='contact-person/:id' Component={ContactPerson}/>
  </Route>);
const Router = ($_$w(21, 0), createBrowserRouter({
    routeConfig,
    renderError: () => {
        $_$wf(21);
        {
            $_$w(21, 1);
            throw new Error('Render error in front-end routing.');
        }
    }
}));
export default Router;
$_$wpe(21);