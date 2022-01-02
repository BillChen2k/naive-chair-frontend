import {createTheme} from '@mui/material';
import {blue, blueGrey, brown} from '@mui/material/colors';

const config = {
  appearance: {
    drawerWidth: '18rem',
  },
  snackBarAutoHideDuration: 5000, // in ms
  // MuiThemeProvider options
  theme: createTheme({
    palette: {
      mode: 'light',
      primary: blueGrey,
      secondary: brown,
    },
    typography: {
      fontFamily: 'Roboto, Helvetica, -apple-system, Segoe UI, Helvetica Neue, Arial',
    },
  }),
  API: process.env.API, // Will be injected by DefinePlugin
};

export default config;

