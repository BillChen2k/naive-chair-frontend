/**
 * Entry point for SSR. Not currently used.
 */
import * as React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom/server';
import App from '@/containers/App';

const app = express();

app.get('*', (req, res) => {
  const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>,
  );
  res.send('<!DOCTYPE html>' + html);
});

app.listen(3000);
