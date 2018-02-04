$_$wp(19);
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Router from './Router';
$_$w(19, 0), injectTapEventPlugin();
const $_$wvd2 = $_$w(19, 1), render = Component => {
        $_$wf(19);
        $_$w(19, 2), ReactDOM.render(
            <AppContainer>
      <Component/>
    </AppContainer>, document.getElementById('root'));
    };
$_$w(19, 3), render(Router);
if ($_$w(19, 4), module.hot) {
    $_$w(19, 5), module.hot.accept('./Router', () => {
        $_$wf(19);
        return $_$w(19, 6), render(Router);
    });
}
$_$wpe(19);