import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Header() {
    return (
        <AppBar position="static">
            <Toolbar style={{display:'flex', justifyContent:'center'}}>
                <Typography variant="h6"
                    style={{textAlign:'center'}}>
                    🤔YouCook
                </Typography>
            </Toolbar>
      </AppBar>
    )
}

export default Header
