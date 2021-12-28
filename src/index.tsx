import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';
import {HashRouter} from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
      {/* Using hash router to avoid complex SSR configurations. */}
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
    ,
    document.getElementById('root'),
    () => {
      console.log('App finished loading.');
    },
);
