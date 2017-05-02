/* eslint-disable no-console*/

import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import routes from './server/routes';

const app = express();
const router = express.Router();
const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use router for our routes
routes(router);
app.use('/api', router);

// Setup a default catch-all route that sends back a welcome message in JSON format
app.get('*', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the Document Management System API'
  });
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`The server is running at localhost:${port}`);
});

export default app;
