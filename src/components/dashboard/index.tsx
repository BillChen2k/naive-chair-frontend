import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {AccountCircle} from '@mui/icons-material';
import Navigator from './Navigator';
import {Link, Outlet} from 'react-router-dom';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Copyright from './Copyright';
import SnackBar from '@/components/SnackBar';
import {Button} from '@mui/material';
import useAuth from '@/services/useAuth';
import {useAppSelector} from '@/store/hooks';

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const appTitle = useAppSelector((state) => state.ui.title);
  const auth = useAuth();

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            sx={{
              marginRight: open ? '0' : '36px',
              transition: 'all 0.3s ease-out',
              ...(open && {width: '0', opacity: 0}),
            }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{flexGrow: 1}}
          >
            {appTitle}
          </Typography>
          {auth.isAuthenticated && (
            <Button sx={{textTransform: 'none'}}
              component={Link} to={`/profile/${auth.userObj.username}`} variant={'text'} color={'inherit'}>
              {auth.userObj.role}: {auth.userObj.realname || auth.userObj.username}
              <AccountCircle sx={{ml: 1}}/>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={() => setOpen(!open)}>
            <ChevronLeftIcon/>
          </IconButton>
        </Toolbar>
        <Divider/>

        <Navigator />
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ?
              theme.palette.grey[100] :
              theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar/>
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
          {/* Child component */}
          <Outlet/>
          <Copyright sx={{mt: 12}}/>
        </Container>
      </Box>
    </Box>
  );
}


export default function Dashboard() {
  return (<div>
    <DashboardContent/>
  </div>);
}
