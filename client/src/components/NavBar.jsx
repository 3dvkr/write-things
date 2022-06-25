import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import NotionConnection from "./NotionConnection";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar({isLoggedIn, setIsLoggedIn}) {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" color="default">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          > */}
            {/* <MenuIcon /> */}
          {/* </IconButton> */}
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            Write Things!
          </Typography>
          <NotionConnection isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
