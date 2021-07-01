/* eslint-disable-next-line import/no-extraneous-dependencies */
const express = require('express');

const { handler } = require('../dist');

const app = express();
const port = 8888;

const parseData = (req, res, next) => {
  if (req.method === 'POST') {
    req.on('data', (data) => {
      req.body = data.toString('utf-8');
      next();
    });
  } else {
    next();
  }
};

app.post(/.*/, parseData, (req, res) => {
  const callback = (_, { statusCode, body, headers }) => {
    Object.entries(headers).forEach(([headerName, headerValue]) => {
      res.set(headerName, headerValue);
    });

    res.status(statusCode).send(body);
  };

  const request = {
    path: req.originalUrl,
    headers: req.headers,
    body: req.body,
    httpMethod: 'POST',
  };

  handler(request, {}, callback);
});

app.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Success! Your application is running on port ${port}.`);
});
