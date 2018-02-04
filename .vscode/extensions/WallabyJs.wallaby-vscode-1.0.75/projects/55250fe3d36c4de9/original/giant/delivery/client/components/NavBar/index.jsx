import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'found';
import { withStyles } from 'material-ui';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Actions from './Actions';

const styles = {
  toolbar: {
    justifyContent: 'space-between',
  },

  child: {
    flexBasis: '33%',
  },

  title: {
    color: 'white',
    textAlign: 'center',
  },

  actions: {
    textAlign: 'right',
  },
};

const propTypes = {
  title: PropTypes.string,
  router: PropTypes.object,
  classes: PropTypes.object,
};

function NavBar ({ title, router, classes }) {
  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <div className={classes.child}/>
        <Typography
          type="headline"
          className={classNames(classes.child, classes.title)}
        >
          {title}
        </Typography>
        <Actions
          onClick={path => router.push(path)}
          className={classNames(classes.child, classes.actions)}
        />
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = propTypes;
export default withRouter(withStyles(styles)(NavBar));
