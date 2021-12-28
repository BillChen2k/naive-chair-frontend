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
import ChairIcon from '@mui/icons-material/Chair';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import EventIcon from '@mui/icons-material/Event';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import SettingsIcon from '@mui/icons-material/Settings';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import RateReviewIcon from '@mui/icons-material/RateReview';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import {Divider, List} from '@mui/material';
import useAuth from '@/services/useAuth';

export interface INavigateItem {
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
  const items: INavigateItem[] = [
    {
      type: 'link',
      visible: true,
      icon: <DashboardIcon />,
      text: 'Home',
      linkPath: '/',
    },
    {
      type: 'link',
      visible: auth.isAuthenticated && auth.userObj.role === 'referee',
      icon: <RateReviewIcon />,
      text: 'Copy Editing',
      linkPath: '/copy-editing',
    },
    {
      type: 'link',
      visible: true,
      icon: <EventIcon />,
      text: 'Conferences',
      linkPath: '/conferences',
    },
    {
      type: 'link',
      visible: auth.isAuthenticated && auth.userObj.role === 'author',
      icon: <HistoryEduIcon />,
      text: 'Paper Submission',
      linkPath: '/paper-submission',
    },
    {
      type: 'link',
      visible: auth.isAuthenticated && auth.userObj.role === 'author',
      icon: <InsertCommentIcon />,
      text: 'Submission History',
      linkPath: '/submission-history',
    },
    {
      type: 'link',
      visible: auth.isAuthenticated && auth.userObj.role === 'author',
      icon: <SupervisedUserCircleIcon />,
      text: 'Author Management',
      linkPath: '/author-management',
    },
    {
      type: 'link',
      visible: auth.isAuthenticated && auth.userObj.role === 'referee',
      icon: <EventAvailableIcon />,
      text: 'Conference Management',
      linkPath: '/conference-management',
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
      icon: <SettingsIcon />,
      text: 'Settings',
      linkPath: '/settings',
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
