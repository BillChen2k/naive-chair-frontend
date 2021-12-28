/**
 * Entry point for SSR. Not currently used.
 */
import * as React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from '@/containers/App';

ReactDOM.hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.documentElement,
);
