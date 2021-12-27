import * as React from 'react';
import {Component} from 'react';

import AppBar from '@/components/dashboard/AppBar';
import Drawer from '@/components/dashboard/Drawer';

import {mainPageItems, secondaryPageItems} from '@/components/dashboard/PageItems';
import {responsiveFontSizes, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import AuthService from '@/services/auth.service';
import IUser from '@/types/user.type';

import Login from '@/components/login.component';
import Register from '@/components/register.component';
import Home from '@/components/home.component';
import BoardUser from '@/components/board-user.component';
import BoardModerator from '@/components/board-moderator.component';
import BoardAdmin from '@/components/board-admin.component';

import EventBus from '@/common/EventBus';
import config from '@/config';
import {Routes, Route} from 'react-router-dom';

type Props = {};

type State = {
  showAdminBoard: boolean,
  currentUser: IUser | undefined
}

let theme = config.theme;
theme = responsiveFontSizes(theme);

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({});
    }
    EventBus.on('logout', this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove('logout', this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  dashboardContent() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{display: 'flex'}}>
          <CssBaseline/>
          <AppBar position="absolute" open={open}>
            <Toolbar sx={{pr: '24px'}}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && {display: 'none'}),
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
                Naive Chair
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon/>
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>

          <Drawer variant="permanent" open={open}>
            <Toolbar sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon/>
              </IconButton>
            </Toolbar>
            <Divider/>
            {<List>{mainPageItems}</List>}
            <Divider/>
            {<List>{secondaryPageItems}</List>}
          </Drawer>

          <Box component="main"
            sx={{
              backgroundColor: (theme) =>
                   theme.palette.mode === 'light' ?
                     theme.palette.grey[100] :
                     theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}>
            <Toolbar /> { /* Placeholder */}
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
              123
              <Routes>
                <Route path="/" element={Home}/>
                <Route path="/login" element={Login}/>
                <Route path="/register" element={Register}/>
                <Route path="/user" element={BoardUser}/>
                <Route path="/moderator" element={BoardModerator}/>
                <Route path="/admin" element={BoardAdmin}/>
              </Routes>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }


  render() {
    return (
      <this.dashboardContent/>
    );
  }
}

export default App;
