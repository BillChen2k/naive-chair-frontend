import React from 'react';
import ReactDOM from 'react-dom';
import '@/styles/index.scss';
import App from '@/containers/App';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <App />
    </React.StrictMode>,
    </BrowserRouter>,
    document.getElementById('root'),
    () => {
      console.log('App finished loading.');
    },
);
