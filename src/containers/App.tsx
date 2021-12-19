import React from 'react';
import {AppBar, Box, Grid, ThemeProvider, Toolbar} from '@mui/material';
import config from '@/config';

// Include all stylesheets.
import '@/styles/index.scss';
import Dashboard from './Dashboard';

function App() {
  return (
    <ThemeProvider theme={config.theme}>
      <Dashboard></Dashboard>
    </ThemeProvider>
  );
}

export default App;
