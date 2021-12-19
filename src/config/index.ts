import {createTheme} from '@mui/material';
import {blueGrey, cyan} from '@mui/material/colors';

const config = {
  apperance: {
    drawerWidth: '15rem',
  },
  // MuiThemeProvider options
  theme: createTheme({
    palette: {
      mode: 'light',
      primary: blueGrey,
      secondary: cyan,
    },
    typography: {
      fontFamily: 'Roboto, Helvetica, -apple-system, Segoe UI, Helvetica Neue, Arial',
    },
  }),
  API: 'https://412505r54f.imdo.co/naivechair/',
};

export default config;

