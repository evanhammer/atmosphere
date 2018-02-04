$_$wp(33);
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'found';
import { withStyles } from 'material-ui';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Actions from './Actions';
const styles = ($_$w(33, 0), {
    toolbar: { justifyContent: 'space-between' },
    child: { flexBasis: '33%' },
    title: {
        color: 'white',
        textAlign: 'center'
    },
    actions: { textAlign: 'right' }
});
const propTypes = ($_$w(33, 1), {
    title: PropTypes.string,
    router: PropTypes.object,
    classes: PropTypes.object
});
function NavBar({title, router, classes}) {
    $_$wf(33);
    return $_$w(33, 2), (
        <AppBar>
      <Toolbar className={classes.toolbar}>
        <div className={classes.child}/>
        <Typography type='headline' className={classNames(classes.child, classes.title)}>
          {title}
        </Typography>
        <Actions
                    onClick={path => {
                        $_$wf(33);
                        return $_$w(33, 3), router.push(path);
                    }} className={classNames(classes.child, classes.actions)}/>
      </Toolbar>
    </AppBar>
    );
}
$_$w(33, 4), NavBar.propTypes = propTypes;
export default withRouter(withStyles(styles)(NavBar));
$_$wpe(33);