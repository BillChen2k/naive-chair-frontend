import React from 'react';
import {AppBar, Box, Grid, ThemeProvider, Toolbar} from '@mui/material';
import config from '@/config';

// Include all stylesheets.
import '@/styles/index.scss';

function App() {
  return (
    <ThemeProvider theme={config.theme}>
      <Box>
        Naive Chair.
      </Box>
    </ThemeProvider>
  );
}

export default App;
