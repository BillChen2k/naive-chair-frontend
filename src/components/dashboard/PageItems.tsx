import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import WorkIcon from '@mui/icons-material/WorkOutline';
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
      icon: <BugReportIcon />,
      text: 'Bug',
    },
    {
      icon: <WorkIcon />,
      text: 'System',
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
      <ListSubheader inset>Track</ListSubheader>
      {listItems}
    </div>
  );
})();
