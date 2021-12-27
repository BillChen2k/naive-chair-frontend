import * as React from 'react';
import {Component} from 'react';

import AppBar from '@/components/dashboard/AppBar';
import Drawer from '@/components/dashboard/Drawer';
import Dashboard from '@/components/dashboard';

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

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route index element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/user" element={<BoardUser />}/>
            <Route path="/moderator" element={<BoardModerator />}/>
            <Route path="/admin" element={<BoardAdmin />}/>
          </Route>
        </Routes>
      </ThemeProvider>
    );
  }
}

export default App;
