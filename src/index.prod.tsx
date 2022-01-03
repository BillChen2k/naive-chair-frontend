import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/pages/App';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from '@/store';

ReactDOM.render(
    <React.StrictMode>
      {/* Using hash containers to avoid complex SSR configurations. */}
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
    ,
    document.getElementById('root'),
    () => {
      console.log('App finished loading.');
    },
);
