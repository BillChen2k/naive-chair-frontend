import * as React from 'react';
import {Link} from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';
import MemoryIcon from '@mui/icons-material/Memory';

export const mainPageItems = (() => {
  const items = [
    {
      icon: <DashboardIcon />,
      text: 'Dashboard',
    },
    {
      icon: <MemoryIcon />,
      text: 'FMOD',
    },
    {
      icon: <MemoryIcon />,
      text: 'EMU',
    },
    {
      icon: <MemoryIcon />,
      text: 'RTL',
    },
  ];
  const listItems = items.map((item, index) => (
    <ListItem button key={index}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.text} />
    </ListItem>
  ));
  return (
    <div>
      {listItems}
    </div>
  );
})();

export const secondaryPageItems = (() => {
  const items = [
    {
      icon: <LoginIcon />,
      text: 'Login',
      linkPath: '/login',
    },
    {
      icon: <LockIcon />,
      text: 'Register',
      linkPath: '/register',
    },
    {
      icon: <LogoutIcon />,
      text: 'Logout',
      linkPath: '/logout',
    }
  ];
  const listItems = items.map((item, index) => (
    <ListItem button key={index} component={Link} to={item.linkPath}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.text} />
    </ListItem>
  ));
  return (
    <div>
      <ListSubheader inset>User</ListSubheader>
      {listItems}
    </div>
  );
})();
