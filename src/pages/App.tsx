import * as React from 'react';
import {Component} from 'react';
import {responsiveFontSizes, ThemeProvider} from '@mui/material/styles';

import AuthService from '@/services/authService';
import IUser from '@/types/user.type';
import EventBus from '@/common/EventBus';
import config from '@/config';
import {AuthProvider} from '@/services/useAuth';
import AppRoutes from '@/config/routes';

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
    const user = AuthService.getCurrentUserToken();
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
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    );
  }
}

export default App;
