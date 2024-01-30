import { NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useAuth from '../context/AuthContext';

export default function Nav() {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Button component={NavLink} to="/" color="inherit">
          Home
        </Button>
          {authed && <Button component={NavLink} to="/game" color="inherit">Game</Button>}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
           {authed ? (
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        ) : (
          <Button component={NavLink} to="/login" color="inherit">
            Login
          </Button>
        )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
