import {ThemeProvider} from '@mui/material';
import * as React from 'react';
import Dashboard from '@/components/dashboard';
import config from '@/config';


export default function App() {
  return (
    <ThemeProvider theme={config.theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

