import React from 'react';
import {ThemeProvider} from '@mui/material';
import config from '@/config';

// Include all stylesheets.
import '@/styles/index.scss';
import Dashboard from '@/components/dashboard';

function App() {
  return (
    <ThemeProvider theme={config.theme}>
      <Dashboard></Dashboard>
    </ThemeProvider>
  );
}

export default App;
