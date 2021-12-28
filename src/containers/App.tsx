import * as React from 'react';
import {Component} from 'react';
import Dashboard from '@/components/dashboard';
import {responsiveFontSizes, ThemeProvider} from '@mui/material/styles';

import AuthService from '@/services/auth.service';
import IUser from '@/types/user.type';

import Login from '@/containers/Login';
import Register from '@/containers/Register';
import Home from '@/containers/Home';
import BoardUser from '@/components/board-user.component';
import BoardModerator from '@/components/board-moderator.component';
import BoardAdmin from '@/components/board-admin.component';

import EventBus from '@/common/EventBus';
import config from '@/config';
import {Route, Routes} from 'react-router-dom';

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
