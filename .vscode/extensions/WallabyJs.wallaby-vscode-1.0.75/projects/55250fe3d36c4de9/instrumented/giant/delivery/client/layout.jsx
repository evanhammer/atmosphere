$_$wp(22);
import React from 'react';
import Paper from 'material-ui/Paper';
import style from '~/style';
import NavBar from './components/NavBar';
const layoutStyle = ($_$w(22, 0), { ...style.app });
function layout(InnerComponent, title) {
    $_$wf(22);
    const $_$wvd2 = $_$w(22, 1), ComponentWithLayout = props => {
            $_$wf(22);
            return $_$w(22, 2), (
                <div>
      <NavBar title={title}/>
      <Paper square elevation={0}>
        <div style={layoutStyle}>
          <InnerComponent {...props}/>
        </div>
      </Paper>
    </div>
            );
        };
    return $_$w(22, 3), ComponentWithLayout;
}
export default layout;
$_$wpe(22);