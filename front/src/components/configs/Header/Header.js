import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import youcooklogo from './youcooklogo.png'
import { Divider } from '@material-ui/core';

function Header() {
    
    return (
        <AppBar position="static" style={{backgroundColor:'white',
                                          boxShadow: 'none'}}>
            <Toolbar style={{display:'flex', justifyContent:'center'}}>
                    <Link style={{textDecoration:'none',
                                  color:'inherit',
                                  justifyContent: 'center',
                                  display: 'flex'}} to="/">
                        <img src={youcooklogo} 
                             style={{width:"25%",
                                     height:"15%"}}></img>
                    </Link>
            </Toolbar>
            <Divider/>
        </AppBar>
    )
}

export default Header
