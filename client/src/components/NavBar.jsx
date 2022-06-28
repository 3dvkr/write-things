import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import NotionConnection from "./NotionConnection";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar({isLoggedIn, setIsLoggedIn}) {
  return (
    <Box sx={{marginBottom: "min(1rem, 5vw)"}}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            Write Things!
          </Typography>
          <NotionConnection isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
