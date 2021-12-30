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
  API: 'https://412505r54f.imdo.co/naivechair',
};

export default config;

