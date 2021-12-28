import * as React from 'react';
import {Link, useLocation} from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';
import {Divider, List} from '@mui/material';
import useAuth from '@/services/useAuth';

interface IPageItems {
  type: 'link' | 'divider',
  visible?: boolean,
  icon?: JSX.Element,
  text?: string,
  linkPath?: string,
  dividerTitle?: string,
}

export default function Navigator() {
  const location = useLocation(); // React-router
  const auth = useAuth();
  const items: IPageItems[] = [
    {
      type: 'link',
      visible: true,
      icon: <DashboardIcon />,
      text: 'Home',
      linkPath: '/',
    },
    {
      type: 'divider',
      visible: true,
      dividerTitle: 'Account',
    },
    {
      type: 'link',
      visible: !auth.isAuthenticated,
      icon: <LoginIcon />,
      text: 'Login',
      linkPath: '/login',
    },
    {
      type: 'link',
      visible: !auth.isAuthenticated,
      icon: <LockIcon />,
      text: 'Register',
      linkPath: '/register',
    },
    {
      type: 'link',
      visible: auth.isAuthenticated,
      icon: <LogoutIcon />,
      text: 'Logout',
      linkPath: '/logout',
    },
  ];
  const elements = items.map((item, index) => {
    if (!item.visible) {
      return null;
    }
    switch (item.type) {
      case 'link':
        return (
          <ListItem selected={location.pathname === item.linkPath} color={'primary'} button key={index} component={Link}
            to={item.linkPath}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText sx={location.pathname === item.linkPath ? {
              fontWeight: 'bold',
            } : {}} primary={item.text}/>
          </ListItem>
        );
      case 'divider':
        return (
          <div key={index}>
            <Divider />
            { item.dividerTitle && <ListSubheader inset>{item.dividerTitle}</ListSubheader> }
          </div>
        );
      default:
        break;
    }
  },
  );
  return (
    <List>
      {elements}
    </List>
  );
}
