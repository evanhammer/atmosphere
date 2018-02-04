import React from 'react';
import Paper from 'material-ui/Paper';
import style from '~/style';
import NavBar from './components/NavBar';

const layoutStyle = { ...style.app };

function layout (InnerComponent, title) {
  const ComponentWithLayout = props => (
    <div>
      <NavBar title={title} />
      <Paper square elevation={0}>
        <div style={layoutStyle}>
          <InnerComponent {...props} />
        </div>
      </Paper>
    </div>
  );

  return ComponentWithLayout;
}

export default layout;
