import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ThemeProvider} from '@mui/material';
import {createTheme, responsiveFontSizes} from '@mui/material/styles';

import Login from '@/components/login.component';
import Register from '@/components/register.component';


let theme = createTheme();
theme = responsiveFontSizes(theme);

ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
    ,
    document.getElementById('root'),
    () => {
      console.log('App finished loading.');
    },
);
